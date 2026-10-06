import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import path from "node:path";
import ts from "typescript";

const projectRoot = process.cwd();
const dataFile = path.join(projectRoot, "src", "data", "portfolio.ts");
const publicDirectory = path.join(projectRoot, "public");
const documentsDirectory = path.join(publicDirectory, "documents");
const source = readFileSync(dataFile, "utf8");

const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
  fileName: dataFile,
});

const compiledModule = { exports: {} };
const evaluateModule = new Function(
  "module",
  "exports",
  "require",
  outputText,
);

evaluateModule(compiledModule, compiledModule.exports, (specifier) => {
  throw new Error(`Unexpected runtime import in portfolio data: ${specifier}`);
});

const { portfolioData } = compiledModule.exports;

if (!portfolioData) {
  throw new Error("portfolioData could not be loaded from src/data/portfolio.ts.");
}

const references = [];

function collectDocumentReferences(value, codePath, inheritedLabel) {
  if (typeof value === "string") {
    if (value.startsWith("/documents/") || value.startsWith("/public/documents/")) {
      references.push({
        displayName: inheritedLabel,
        codePath,
        url: value,
      });
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      collectDocumentReferences(item, `${codePath}[${index}]`, inheritedLabel);
    });
    return;
  }

  if (!value || typeof value !== "object") return;

  const label =
    value.name ||
    value.title ||
    value.position ||
    value.label ||
    inheritedLabel;

  Object.entries(value).forEach(([key, child]) => {
    collectDocumentReferences(child, `${codePath}.${key}`, label);
  });
}

collectDocumentReferences(portfolioData, "portfolioData", "Portfolio document");

const checkedReferences = references.map((reference) => {
  const hasInvalidPublicPrefix = reference.url.startsWith("/public/");
  const hasUnsafeFilename = reference.url.includes(" ") || reference.url.includes("%20");
  const publicUrl = hasInvalidPublicPrefix
    ? reference.url.replace(/^\/public/, "")
    : reference.url;
  const filePath = path.join(publicDirectory, ...publicUrl.split("/").filter(Boolean));

  return {
    ...reference,
    filePath,
    exists: existsSync(filePath),
    validUrl: !hasInvalidPublicPrefix && !hasUnsafeFilename,
  };
});

function listFiles(directory) {
  if (!existsSync(directory)) return [];

  return readdirSync(directory).flatMap((entry) => {
    const entryPath = path.join(directory, entry);
    return statSync(entryPath).isDirectory() ? listFiles(entryPath) : [entryPath];
  });
}

const physicalDocuments = listFiles(documentsDirectory)
  .filter((filePath) => path.extname(filePath).toLowerCase() !== ".txt")
  .map((filePath) => `/${path.relative(publicDirectory, filePath).replaceAll("\\", "/")}`);

const referenceCounts = new Map();
checkedReferences.forEach(({ url }) => {
  referenceCounts.set(url, (referenceCounts.get(url) || 0) + 1);
});

const duplicateReferences = [...referenceCounts.entries()].filter(
  ([, count]) => count > 1,
);
const referencedUrls = new Set(checkedReferences.map(({ url }) => url));
const unreferencedFiles = physicalDocuments.filter(
  (fileUrl) => !referencedUrls.has(fileUrl),
);
const missingReferences = checkedReferences.filter(({ exists }) => !exists);
const invalidReferences = checkedReferences.filter(({ validUrl }) => !validUrl);

console.table(
  checkedReferences.map(({ displayName, codePath, url, exists, validUrl }) => ({
    "Display name": displayName,
    "Code path": codePath,
    URL: url,
    Status: exists && validUrl ? "WORKING" : exists ? "INVALID URL" : "MISSING",
  })),
);

console.log(`Document references checked: ${checkedReferences.length}`);
console.log(`Working references: ${checkedReferences.length - missingReferences.length - invalidReferences.length}`);
console.log(`Missing files: ${missingReferences.length}`);
console.log(`Invalid public URLs: ${invalidReferences.length}`);
console.log(`Duplicate references: ${duplicateReferences.length}`);
console.log(`Unreferenced physical files: ${unreferencedFiles.length}`);

if (duplicateReferences.length) {
  console.log("Duplicate references:", duplicateReferences);
}

if (unreferencedFiles.length) {
  console.log("Unreferenced files:", unreferencedFiles);
}

if (missingReferences.length || invalidReferences.length) {
  process.exitCode = 1;
}

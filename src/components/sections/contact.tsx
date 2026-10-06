import { CodeXml, Link2, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolioData } from "@/data/portfolio";
import { isUsableHref } from "@/lib/utils";

const socialIcons = {
  LinkedIn: Link2,
  GitHub: CodeXml,
  Email: Mail,
  Phone,
};

export function Contact() {
  return (
    <section id="contact" className="section-shell section-rule bg-accent-soft/35">
      <div className="site-container">
        <Reveal>
          <SectionHeading
            label="10 / Contact"
            title="Open to academic and professional conversations."
            description="For Master's programme discussions, internship opportunities, or relevant professional connections, please use the details or form below."
          />
        </Reveal>

        <div className="mt-14 grid overflow-hidden border border-line bg-paper-strong lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal className="h-full">
            <aside className="h-full bg-ink p-7 text-paper sm:p-9">
              <p className="eyebrow text-signal">Contact details</p>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">
                {portfolioData.profile.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-paper/60">
                {portfolioData.profile.availability}
              </p>

              <dl className="mt-9 space-y-5 border-t border-paper/15 pt-7">
                <ContactDetail
                  icon={<Mail className="size-4" />}
                  label="Email"
                  value={portfolioData.contact.email}
                  href={`mailto:${portfolioData.contact.email}`}
                />
                <ContactDetail
                  icon={<Phone className="size-4" />}
                  label="Phone"
                  value={portfolioData.contact.phone}
                  href={`tel:${portfolioData.contact.phone.replace(/\s+/g, "")}`}
                />
                <ContactDetail
                  icon={<MapPin className="size-4" />}
                  label="Location"
                  value={portfolioData.contact.location}
                />
              </dl>

              <div className="mt-9 flex flex-wrap gap-2 border-t border-paper/15 pt-7">
                {portfolioData.socialLinks
                  .filter(
                    (link) =>
                      ["LinkedIn", "GitHub"].includes(link.label) &&
                      isUsableHref(link.href),
                  )
                  .map((link) => {
                    const Icon = socialIcons[link.label];
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-sm border border-paper/20 px-3 py-2 text-xs font-semibold text-paper/70 transition hover:border-paper/50 hover:text-paper"
                      >
                        <Icon aria-hidden="true" className="size-4" />
                        {link.label}
                      </a>
                    );
                  })}
              </div>
            </aside>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="p-7 sm:p-9 lg:p-11">
              <div className="mb-8">
                <p className="eyebrow text-accent">Send a message</p>
                <p className="mt-3 text-sm leading-6 text-ink-muted">
                  Required fields are validated before submission. Your message
                  is sent securely to my email for contact purposes.
                </p>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactDetail({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <span className="flex items-start gap-3">
      <span aria-hidden="true" className="mt-0.5 text-signal">
        {icon}
      </span>
      <span>
        <dt className="metadata text-paper/45">{label}</dt>
        <dd className="mt-1 break-all text-sm text-paper/80">{value}</dd>
      </span>
    </span>
  );

  return (
    <div>
      {href && isUsableHref(href) ? (
        <a href={href} className="transition hover:opacity-80">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}

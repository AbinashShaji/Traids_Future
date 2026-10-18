/**
 * FILE: src/app/contact/contact-page-content.tsx
 *
 * Contact and consultation booking page with clean line borders and plain-English copy.
 * - Removed pill badges and bracket tags.
 * - Clean hairline dividers and high-contrast light layout.
 * - Simple, accessible language for business owners.
 */
"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Clock, Calendar, Check, ArrowRight } from "lucide-react";
import { GlobalLayout } from "../../components/global-layout";
import { Container } from "../../components/container";
import { FormInput } from "../../components/form-input";
import { FormTextarea } from "../../components/form-textarea";
import { FAQItem } from "../../components/faq-item";
import { Reveal } from "../../components/reveal";
import { WordReveal } from "../../components/word-reveal";
import { toast } from "sonner";
import { settings } from "../../mock/settings";
import { type FAQ } from "@/mock/faq";

export const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(6, { message: "Please enter a valid phone number." }),
  email: z.union([z.string().email({ message: "Please enter a valid email address." }), z.literal("")]).optional(),
  businessName: z.string().optional(),
  message: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactPageContentProps {
  faqs: FAQ[];
}

export function ContactPageContent({ faqs }: ContactPageContentProps) {
  const searchParams = useSearchParams();
  const interest = searchParams.get("interest");
  const [activeFaq, setActiveFaq] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      businessName: "",
      message: interest ? `Interested in: ${interest}. ` : "",
    },
  });

  React.useEffect(() => {
    if (interest) {
      setValue("message", `Interested in solution: ${interest}. `);
    }
  }, [interest, setValue]);

  const onSubmit = async (data: ContactFormValues) => {
    const subject = encodeURIComponent(`Discovery Call Request: ${data.name}${data.businessName ? ` (${data.businessName})` : ""}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\n` +
      `Phone: ${data.phone}\n` +
      `Email: ${data.email || "Not provided"}\n` +
      `Business: ${data.businessName || "Not provided"}\n` +
      `Message: ${data.message || "Discovery call request"}\n`
    );
    if (typeof window !== "undefined") {
      const mailtoLink = document.createElement("a");
      mailtoLink.href = `mailto:${settings.email}?subject=${subject}&body=${body}`;
      mailtoLink.click();
    }
    toast.info("Opening your email client to send your message directly to our senior team.", {
      duration: 6000,
    });
  };

  const toggleFaq = (id: string) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <GlobalLayout>
      {/* 1. CONSULTATION BOOKING HERO & FORM */}
      <section className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-16 sm:pb-20 md:pb-24 lg:pb-28 border-b border-[#e4e4e7] bg-white relative overflow-hidden">
        {/* Subtle Ambient Radial Glow Orb matching FinZave forensic spec */}
        <div 
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] md:w-[800px] h-[500px] sm:h-[700px] md:h-[800px] bg-gradient-to-tr from-[#f4f4f5] to-white rounded-full blur-[100px] -z-10 opacity-60 pointer-events-none" 
          aria-hidden="true" 
        />

        <Container className="relative z-10 px-4 sm:px-6 md:px-8">
          <Reveal variant="fadeUp" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Context & Direct Channels (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48]">
                  Discovery Call
                </p>
                <h1 className="text-[2.25rem] min-[380px]:text-[2.75rem] min-[440px]:text-[3.25rem] sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-[4.25rem] font-bold tracking-tighter text-[#0a0a0a] leading-[1.02]">
                  <WordReveal as="span" text="Let's talk " delayOffset={0} className="block sm:inline" />
                  <WordReveal as="span" text="about what your " delayOffset={160} className="block sm:inline" />
                  <WordReveal as="span" text="business needs." delayOffset={400} className="block" />
                </h1>
                <p className="text-[#52525b] text-sm sm:text-base md:text-lg leading-relaxed mt-2 font-normal">
                  Book a quick 30-minute discovery call. We will review your current systems, spot the bottlenecks costing you time, and give you straightforward advice with zero pressure.
                </p>
              </div>

              {/* Scope Checklist (Clean Lines) */}
              <div className="border-t border-b border-[#e4e4e7] py-6">
                <span className="text-xs text-[#0a0a0a] uppercase tracking-wider block font-bold mb-4">
                  What we will cover on the call:
                </span>
                <ul className="space-y-3.5">
                  {[
                    "Where your team is spending too much manual time.",
                    "Which repetitive tasks can be safely automated.",
                    "Estimated timeline, costs, and practical next steps.",
                  ].map((item, idx) => (
                    <li key={idx} className="text-sm text-[#71717a] flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#e11d48]/10 text-[#e11d48] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="leading-snug font-medium text-[#0a0a0a]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Channels */}
              <div className="flex flex-col gap-4">
                <span className="text-xs text-[#71717a] uppercase tracking-wider block font-semibold">
                  Or reach out directly:
                </span>
                <a
                  href={`mailto:${settings.email}`}
                  className="text-sm font-semibold text-[#0a0a0a] hover:text-[#e11d48] transition-colors flex items-center gap-3 group"
                >
                  <div className="w-9 h-9 rounded-full bg-white border border-[#e4e4e7] flex items-center justify-center text-[#e11d48] group-hover:border-[#e11d48] transition-colors">
                    <Mail className="w-4 h-4 stroke-[2]" />
                  </div>
                  <span>{settings.email}</span>
                </a>

                <div className="flex items-center gap-3 text-xs text-[#71717a] pt-1">
                  <Clock className="w-4 h-4 text-[#71717a] shrink-0 stroke-[2]" />
                  <span>{settings.businessHours}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Form (7 cols) */}
            <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-[#e4e4e7] lg:pl-12 pt-8 lg:pt-0">
              <div className="flex flex-col gap-2 mb-8">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-5 h-5 text-[#e11d48]" />
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0a0a0a]">
                    Send us your details
                  </h2>
                </div>
                <p className="text-sm text-[#71717a]">
                  We typically reply within one business day with available times.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <FormInput
                  label="Full name"
                  type="text"
                  placeholder="Your Name"
                  error={errors.name?.message}
                  {...register("name")}
                />

                <FormInput
                  label="Phone number"
                  type="text"
                  placeholder="+1 (555) 000-0000"
                  error={errors.phone?.message}
                  {...register("phone")}
                />

                <FormInput
                  label="Email address (optional)"
                  type="email"
                  placeholder="name@company.com"
                  error={errors.email?.message}
                  {...register("email")}
                />

                <FormInput
                  label="Company name (optional)"
                  type="text"
                  placeholder="Your Company"
                  {...register("businessName")}
                />

                <FormTextarea
                  label="What can we help you with? (optional)"
                  placeholder="Tell us briefly about your current operations, software challenges, or what you want to build..."
                  {...register("message")}
                />

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#0a0a0a] text-white font-medium hover:bg-[#e11d48] transition-all duration-300 disabled:opacity-50 text-base"
                  >
                    <span>{isSubmitting ? "Sending..." : "Request a Discovery Call"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-[#71717a] text-center pt-3">
                    We never share your information. No spam, ever.
                  </p>
                </div>
              </form>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 2. FAQ SECTION */}
      <section id="faq" className="py-20 md:py-32 bg-[#fafafa] scroll-mt-24">
        <Container>
          <Reveal variant="fadeUp" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 flex flex-col gap-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#e11d48]">
                Common Questions
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a]">
                Everything you need to know.
              </h2>
              <p className="text-[#71717a] text-base leading-relaxed">
                Clear answers about how we work, project timelines, code handover, and ongoing support.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {faqs.map((faq) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  isOpen={activeFaq === faq.id}
                  onToggle={() => toggleFaq(faq.id)}
                />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>
    </GlobalLayout>
  );
}

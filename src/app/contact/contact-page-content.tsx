/**
 * FILE: src/app/contact/contact-page-content.tsx
 *
 * WHAT THIS DOES:
 * Powers the interactive Strategy Consultation booking form and FAQ on the Contact page (/contact).
 *
 * WHERE IT IS USED:
 * - Loaded by `src/app/contact/page.tsx` inside a Suspense boundary.
 *
 * HOW IT WORKS:
 * 1. `contactSchema`: Uses Zod to define validation rules (name >= 2 characters, phone >= 6 digits, valid email).
 * 2. `useForm`: Uses React Hook Form with `zodResolver` to handle field typing, error messages, and submission state.
 * 3. On valid submit: Shows a toast popup and redirects to the `/thank-you` confirmation page.
 * 4. Slide #2: Displays self-service FAQs using the shared `<FAQItem>` accordion.
 *
 * BEGINNER TIP:
 * If you want to require extra form fields (like "Company Budget"), add them to `contactSchema` and the form JSX!
 */
"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone as PhoneIcon, MapPin, Clock, Calendar, Check } from "lucide-react";
import { GlobalLayout } from "../../components/global-layout";
import { Container } from "../../components/container";
import { SectionHeading } from "../../components/section-heading";
import { Button } from "../../components/button";
import { FormInput } from "../../components/form-input";
import { FormTextarea } from "../../components/form-textarea";
import { FAQItem } from "../../components/faq-item";
import { Reveal } from "../../components/reveal";
import { ScrollWorldContainer } from "../../components/scroll-world-container";
import { toast } from "sonner";

import { settings } from "../../mock/settings";
import { faqs } from "../../mock/faq";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(6, { message: "Please enter a valid phone number." }),
  email: z.union([z.string().email({ message: "Please enter a valid email address." }), z.literal("")]).optional(),
  businessName: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const contactSlides = [
  { id: "booking", label: "Consultation" },
  { id: "faq", label: "FAQ" },
];

function ContactPageContent() {
  const router = useRouter();
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

  /**
   * FUNCTION: onSubmit
   * ROLE: Form Submission Handler
   *
   * PURPOSE:
   * Handles the submission of the Strategy Call consultation form.
   *
   * USED BY:
   * React Hook Form's handleSubmit in the main <form> wrapper.
   *
   * INPUT:
   * Implicitly receives the validated form data (though unused in this mock).
   *
   * FLOW:
   * Triggers a mocked async delay (1200ms) to simulate a network request -> 
   * displays a toast notification -> redirects visitor to the `/thank-you` page.
   */
  const onSubmit = async () => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 1200));
    toast.promise(promise(), {
      loading: "Submitting details...",
      success: () => {
        router.push("/thank-you");
        return "Strategy call request received.";
      },
      error: "An error occurred. Please try again.",
    });
  };

  /**
   * FUNCTION: toggleFaq
   * ROLE: UI State Handler
   *
   * PURPOSE:
   * Toggles the open/closed state of an FAQ accordion item.
   *
   * INPUT:
   * `id` (string) - The unique identifier of the FAQ item being clicked.
   *
   * FLOW:
   * If the clicked FAQ is already open, it closes it (null). Otherwise, it opens the clicked FAQ.
   */
  const toggleFaq = (id: string) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <GlobalLayout>
      <ScrollWorldContainer slides={contactSlides}>
        {/* 1. BOOKING SLIDE (Split: Value Prop & Channels Left / Form Right — 100vh narrative) */}
        <section
          id="booking"
          className="slide-section min-h-[100dvh] flex items-center pt-24 pb-16 md:pt-28 md:pb-20 border-b border-hairline"
        >
          <Container>
            <Reveal variant="fadeUp" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Context & Direct Channels */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <SectionHeading
                    tag="h1"
                    subtitle="Initiate Consultation"
                    withTriadMark
                  >
                    Book a Strategy Call
                  </SectionHeading>
                  <p className="font-editorial text-graphite text-lg leading-relaxed">
                    Every partnership begins with a 30-minute diagnosis call. We will examine your current software bottlenecks, identify manual drag, and map out a practical architecture roadmap.
                  </p>
                </div>

                <div>
                  <span className="font-sans text-xs text-ink uppercase tracking-[0.1em] block font-semibold mb-3">
                    What we will cover:
                  </span>
                  <ul className="space-y-3">
                    {[
                      "Your primary commercial and technical friction points.",
                      "Processes and workflows that consume excessive team hours.",
                      "Timeline, stack selection, and fixed commercial deliverables.",
                    ].map((item, idx) => (
                      <li key={idx} className="font-editorial text-base text-graphite flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-ink mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-hairline pt-6 flex flex-col gap-4">
                  <span className="font-sans text-xs text-ink uppercase tracking-[0.1em] block font-semibold">
                    Direct Channels
                  </span>
                  <div className="flex flex-col gap-2.5">
                    <a
                      href={`mailto:${settings.email}`}
                      className="font-sans text-sm font-medium text-ink hover:text-graphite transition-colors flex items-center gap-3"
                    >
                      <Mail className="w-4 h-4 text-graphite stroke-[1.5]" />
                      <span>{settings.email}</span>
                    </a>
                    <a
                      href={`tel:${settings.phone}`}
                      className="font-sans text-sm font-medium text-ink hover:text-graphite transition-colors flex items-center gap-3"
                    >
                      <PhoneIcon className="w-4 h-4 text-graphite stroke-[1.5]" />
                      <span>{settings.phone}</span>
                    </a>
                  </div>
                </div>

                <div className="border-t border-hairline pt-6 flex flex-col gap-3">
                  <div className="flex items-start gap-3 font-sans text-xs text-graphite">
                    <MapPin className="w-4 h-4 text-graphite mt-0.5 shrink-0 stroke-[1.5]" />
                    <span>{settings.address}</span>
                  </div>
                  <div className="flex items-center gap-3 font-sans text-xs text-graphite">
                    <Clock className="w-4 h-4 text-graphite shrink-0 stroke-[1.5]" />
                    <span>{settings.businessHours}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Clean Form */}
              <div className="lg:col-span-7 bg-paper shadow-[0_8px_32px_rgba(20,20,15,0.03)] border border-hairline rounded-[2px] p-6 md:p-10">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="w-5 h-5 text-ink" />
                  <h3 className="font-heading text-xl font-medium text-ink">
                    Schedule 30-Minute Consultation
                  </h3>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <FormInput
                    label="Full name"
                    type="text"
                    placeholder="Jordan Ellis"
                    error={errors.name?.message}
                    {...register("name")}
                  />

                  <FormInput
                    label="Phone number"
                    type="text"
                    placeholder="+1 (555) 234-5678"
                    error={errors.phone?.message}
                    {...register("phone")}
                  />

                  <FormInput
                    label="Work email (optional)"
                    type="email"
                    placeholder="jordan@company.com"
                    error={errors.email?.message}
                    {...register("email")}
                  />

                  <FormInput
                    label="Business name (optional)"
                    type="text"
                    placeholder="Meridian Growth Corp"
                    {...register("businessName")}
                  />

                  <FormTextarea
                    label="Operations context or bottlenecks (optional)"
                    placeholder="Briefly describe your current workflows and goals..."
                    {...register("message")}
                  />

                  <div className="pt-3">
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Scheduling call..." : "Book a Strategy Call"}
                    </Button>
                  </div>
                </form>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* 2. FAQ SLIDE (Split: Header Left / Accordion Right) */}
        <section
          id="faq"
          className="slide-section py-20 md:py-28"
        >
          <Container>
            <Reveal variant="fadeUp" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-5 flex flex-col gap-4">
                <SectionHeading
                  tag="h2"
                  subtitle="Self-Service FAQ"
                  withTriadMark
                >
                  Frequently asked questions
                </SectionHeading>
                <p className="font-editorial text-graphite text-base md:text-lg leading-relaxed">
                  Clear answers about our engagement models, technical ownership, and sprint structure before you book.
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
      </ScrollWorldContainer>
    </GlobalLayout>
  );
}

export default function ContactPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <ContactPageContent />
    </React.Suspense>
  );
}

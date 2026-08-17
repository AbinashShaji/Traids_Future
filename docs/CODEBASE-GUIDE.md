# Triads Future — Complete Beginner Codebase Guide

Welcome to the **Triads Future** codebase!

This guide is written in very simple, plain English. Even if you are a **10th standard student with little or no programming experience**, you will be able to read this guide, understand how the website is built, find where files live, and know how everything connects together.

---

## 1. What is Triads Future?

**Triads Future** is a modern business growth and technology partner website. It introduces a consulting and engineering firm that helps growing companies build scalable digital software, automate manual workflows, and strengthen their commercial brands.

The website is designed to look **calm, editorial, architectural, and premium** — like a high-end publication or design studio rather than a loud corporate marketing template.

---

## 2. Technology Stack (The Tools We Use)

Think of the technology stack like the construction materials used to build a house:

1. **Next.js (Version 16 - App Router)**:
   - **What it is**: The main framework (the master blueprint and plumbing).
   - **What it does**: It handles routing (which page shows up when someone types a URL like `/about` or `/work`), makes pages load quickly, and organizes all our code into folders.

2. **React (Version 19)**:
   - **What it is**: The UI (User Interface) library.
   - **What it does**: It lets us break the website into small, reusable building blocks called **Components** (like buttons, navigation bars, and cards).

3. **TypeScript**:
   - **What it is**: JavaScript with safety checks and labels.
   - **What it does**: It prevents silly spelling mistakes and mistakes in data shapes before the website even runs.

4. **Tailwind CSS (Version 4)**:
   - **What it is**: The styling tool (the paint, spacing, and colors).
   - **What it does**: It lets us write visual styling rules (like `bg-[#F0F0EB]` for off-white background or `text-3xl` for big text) directly on elements.

5. **Framer Motion (Version 12)**:
   - **What it is**: The animation engine.
   - **What it does**: It makes sections smoothly fade in when you scroll to them, controls the custom mouse pointer, and animates the logo.

6. **Lucide React**:
   - **What it is**: The icon library.
   - **What it does**: Provides clean, lightweight icons (like arrows, phones, and email envelopes).

7. **React Hook Form & Zod**:
   - **What it is**: The form and validation tools.
   - **What it does**: They power the booking form on `/contact`, checking that visitors type a real name and valid phone number before submitting.

---

## 3. Repository Folder Structure

Here is how the project files are organized on disk:

```text
traids_future/
│
├── docs/                        → Documentation and guides for developers
│   └── CODEBASE-GUIDE.md        → This file! The master beginner guide
│
├── public/                      → Static files served directly to browsers
│   ├── brand/                   → Logo image files (header logo, triangle icon)
│   └── fonts/                   → Custom font folders (e.g. Canela font directory)
│
├── src/                         → Source code (where 99% of work happens)
│   │
│   ├── animations/              → Reusable animation recipes and easing timings
│   │   └── presets.ts           → Fade-up and hero animation rules
│   │
│   ├── app/                     → Website pages (routes) and global layout
│   │   ├── layout.tsx           → Master root layout (wraps every page on the site)
│   │   ├── globals.css          → Global CSS, colors, fonts, and scroll rules
│   │   ├── not-found.tsx        → The custom "404 Page Not Found" screen
│   │   ├── page.tsx             → Homepage (/)
│   │   ├── about/               → About & Leadership page (/about)
│   │   ├── solutions/           → Capabilities & Services page (/solutions)
│   │   ├── work/                → Portfolio & Case Studies index (/work)
│   │   │   └── [slug]/          → Individual Case Study article page (/work/...)
│   │   ├── insights/            → Articles & Blog index (/insights)
│   │   │   └── [slug]/          → Individual Article reading page (/insights/...)
│   │   ├── contact/             → Consultation booking form page (/contact)
│   │   ├── thank-you/           → Confirmation page after booking (/thank-you)
│   │   ├── privacy/             → Privacy Policy legal page (/privacy)
│   │   └── terms/               → Terms & Conditions legal page (/terms)
│   │
│   ├── components/              → Reusable UI building blocks (buttons, nav, cards)
│   │   ├── global-layout.tsx    → Shell with navigation header + footer
│   │   ├── navigation.tsx       → Top header, tablet side rail, and mobile bars
│   │   ├── footer.tsx           → Bottom footer with directory links & copyright
│   │   ├── scroll-world-container.tsx → Desktop 100vh slide-scroll manager
│   │   ├── slide-rail.tsx       → Right-hand dot/line slide indicator rail
│   │   ├── reveal.tsx           → Scroll-triggered fade-in component
│   │   ├── custom-cursor.tsx    → Custom smooth mouse dot and lagging ring
│   │   ├── team-showcase.tsx    → Dynamic team member presentation
│   │   ├── faq-item.tsx         → Single accordion question-and-answer row
│   │   ├── section-heading.tsx  → Canela title + Triad mark eyebrow lockup
│   │   ├── triad-mark.tsx       → Signature 3-bar brand mark (35%, 65%, 100%)
│   │   ├── button.tsx           → Primary, outline, and text-underline buttons
│   │   ├── card.tsx             → Paper and Bone background cards with hover lift
│   │   ├── container.tsx        → Centers page content and stops screen stretching
│   │   ├── image-wrapper.tsx    → Smooth fade-in wrapper for Next.js images
│   │   ├── form-input.tsx       → Form text input with red error labels
│   │   └── form-textarea.tsx    → Form multi-line message box
│   │
│   ├── mock/                    → Temporary local data (ready for future CMS)
│   │   ├── team.ts              → Team members, bios, roles, and LinkedIn links
│   │   ├── projects.ts          → Case studies, client names, metrics, and galleries
│   │   ├── articles.ts          → Blog articles, text content, and read times
│   │   ├── solutions.ts         → Service capabilities and business outcomes
│   │   ├── testimonials.ts      → Client quotes and review scores
│   │   ├── faq.ts               → Frequently asked questions and answers
│   │   ├── navigation.ts        → Menu links for desktop, tablet, and mobile
│   │   └── settings.ts          → Site name, email, phone, office address, socials
│   │
│   ├── providers/               → Background managers shared across the entire site
│   │   ├── root-providers.tsx   → Mounts all providers and notification toaster
│   │   └── device-experience-manager.tsx → Detects phone vs tablet vs desktop screen
│   │
│   └── utils/                   → Small helper utilities
│       └── cn.ts                → Combines Tailwind CSS classes without clashes
│
├── package.json                 → The list of installed tools and project scripts
└── tsconfig.json                → TypeScript configuration rules
```

---

## 4. How the Website Works (The Application Flow)

When someone visits **https://triadsfuture.com/about** in their web browser, what happens behind the scenes?

```text
Visitor types URL (/about)
       │
       ▼
1. Next.js Route Matching:
   Next.js looks into 'src/app/' and finds the folder 'src/app/about/page.tsx'.
       │
       ▼
2. Layout Assembly:
   Next.js wraps the page inside 'src/app/layout.tsx' (which loads Google Fonts
   and mounts the RootProviders & Custom Cursor) and 'src/components/global-layout.tsx'
   (which mounts the Navigation bar at top and Footer at bottom).
       │
       ▼
3. Component Assembly:
   'about-page-content.tsx' loads reusable components:
   - <ScrollWorldContainer> manages desktop full-screen slide snapping.
   - <SectionHeading> renders Canela titles.
   - <TeamShowcase> receives data from 'src/mock/team.ts' to draw people profiles.
   - <FAQItem> renders question accordions with click-to-expand.
       │
       ▼
4. Data Ingestion:
   Components read text and photos from files in 'src/mock/' (e.g. team members, FAQs).
       │
       ▼
5. React Draws the Screen:
   React translates all components and CSS classes into real HTML and CSS.
       │
       ▼
Visitor sees the beautifully styled page!
```

---

## 5. Route Guide (All Website Pages)

| Route URL | Purpose | File Location | Key Components Used | Data Source |
| :--- | :--- | :--- | :--- | :--- |
| `/` | **Homepage**: High-impact editorial introduction, philosophy, capabilities, selected work, and client voice. | `src/app/page.tsx` | `ScrollWorldContainer`, `SectionHeading`, `Card`, `CTA`, `TriadPanel` | `solutions.ts`, `projects.ts`, `testimonials.ts`, `articles.ts` |
| `/about` | **About Page**: Founding thesis, operating model, principles, team showcase, and common questions. | `src/app/about/page.tsx` | `ScrollWorldContainer`, `TeamShowcase`, `FAQItem`, `TriadPanel` | `team.ts`, `faq.ts` |
| `/solutions` | **Solutions / Services**: Detailed capability catalog, bottlenecks solved, and engagement phases. | `src/app/solutions/page.tsx` | `ScrollWorldContainer`, `Card`, `Button`, `SectionHeading` | `solutions.ts` |
| `/work` | **Work Portfolio**: Selected case study listings and production software proof. | `src/app/work/page.tsx` | `ScrollWorldContainer`, `Card`, `ImageWrapper`, `Badge` | `projects.ts` |
| `/work/[slug]` | **Case Study Detail**: Deep-dive article on a specific client project (e.g. `/work/meridian-financial-digital-platform`). | `src/app/work/[slug]/page.tsx` | `ScrollWorldContainer`, `Card`, `ImageWrapper`, `CTA` | `projects.ts`, `testimonials.ts` |
| `/insights` | **Insights / Blog**: Directory of thought leadership articles with search and category filtering. | `src/app/insights/page.tsx` | `Tag`, `Badge`, `Card`, `ImageWrapper` | `articles.ts` |
| `/insights/[slug]` | **Article Reading Page**: Long-form editorial article with reading time and related articles. | `src/app/insights/[slug]/page.tsx` | `ScrollWorldContainer`, `Card`, `ImageWrapper` | `articles.ts` |
| `/contact` | **Contact & Booking**: Interactive strategy consultation form with live input validation. | `src/app/contact/page.tsx` | `FormInput`, `FormTextarea`, `FAQItem`, `Button` | `settings.ts`, `faq.ts` |
| `/thank-you` | **Confirmation Screen**: Reassuring success page shown immediately after submitting a booking. | `src/app/thank-you/page.tsx` | `Card`, `Button`, `SectionHeading` | Static |
| `/privacy` | **Privacy Policy**: Data collection, client IP protection, and privacy governance. | `src/app/privacy/page.tsx` | `Container`, `SectionHeading`, `Button` | Static |
| `/terms` | **Terms & Conditions**: Commercial agreements and IP ownership rules. | `src/app/terms/page.tsx` | `Container`, `SectionHeading`, `Button` | Static |
| `404` | **Page Not Found**: Friendly error screen with quick navigation buttons. | `src/app/not-found.tsx` | `Container`, `SectionHeading`, `Button` | Static |

---

## 6. The Desktop "Scroll-World" Explained

One of the coolest features in Triads Future is the **Desktop Scroll-World**.

### The Rule:
```text
Screen Width >= 1024px (Laptops & Desktop Monitors)
  → CSS Scroll-Snap is TURNED ON (html.desktop-snap).
  → Each section takes up at least 100vh (full screen height).
  → As you scroll, the page magnetically snaps cleanly from slide to slide.
  → A sleek progress rail appears on the right side of the screen.

Screen Width < 1024px (Tablets & Mobile Phones)
  → CSS Scroll-Snap is TURNED OFF.
  → The page scrolls naturally and smoothly like a regular webpage.
  → The right-hand progress rail disappears to save space.

User has "Reduced Motion" enabled in Windows/Mac settings
  → Scroll snap is automatically turned off to prevent motion sickness!
```

### Where this code lives:
- **`src/app/globals.css`** (lines 98-124): Sets `.desktop-snap` and `@media (prefers-reduced-motion)`.
- **`src/components/scroll-world-container.tsx`**: Measures the window width, listens for resize events, and tracks which slide is currently in view using an `IntersectionObserver`.
- **`src/components/slide-rail.tsx`**: Renders the vertical line/dot navigation indicator on desktop.

---

## 7. The Design System (Colors & Typography)

### Color Palette (Design System v2 Tokens)

The website uses a warm, calm, monochrome palette:

| Token Name | Hex Code | Visual Appearance | What It Is Used For |
| :--- | :--- | :--- | :--- |
| `--paper` | `#F0F0EB` | Warm off-white | Main page background color |
| `--bone` | `#E4E3DB` | Slightly darker warm tone | Card backgrounds and visual panels |
| `--hairline` | `#DEDDD3` | Subtle border gray | All border lines, dividers, and card borders |
| `--ink` | `#14140F` | Deep dark charcoal/black | Primary headings, dark buttons, active text |
| `--graphite` | `#57564C` | Muted slate gray | Body copy, secondary text, metadata labels |
| `--signal` | `#B3261E` | Muted crimson red | Form validation error messages |

### Typography Rules

- **Canela** (with automatic fallback to *Newsreader* and *Georgia, serif*):
  - Used **ONLY** for major section titles and large display headlines (e.g. `<h1>`, `<h2>`).
  - **Do NOT** use Canela for body paragraphs, buttons, navigation, or form inputs!
- **Inter (Inter Tight)**:
  - Used for **EVERYTHING ELSE**: body text, buttons, navigation links, form labels, roles, and cards.

---

## 8. Data Architecture & Future CMS Roadmap

Currently, all the website's text and case studies live inside the **`src/mock/`** folder as clean TypeScript files.

### How it works right now:
```text
[ src/mock/team.ts ] ──► <TeamShowcase /> ──► /about page ──► Visitor sees team
[ src/mock/projects.ts ] ──► <WorkPage /> ──► /work page ──► Visitor sees case studies
```

### How it is designed for the future:
When the client connects a Headless CMS (like Sanity, Strapi, or Supabase) or an Admin panel:
```text
[ Client Edits CMS ] ──► [ Database / API ] ──► [ Same React Components ] ──► Website updates automatically!
```

Because all data in `src/mock/` has strict TypeScript types (`TeamMember`, `Project`, `Article`, `Solution`), a developer can swap the mock imports with an API call without changing any UI design!

---

## 9. Form Handling & Validation Explained

On the `/contact` page, visitors can book a strategy diagnosis call.

```text
Visitor types name & phone into <FormInput>
                       │
                       ▼
1. React Hook Form manages the live typing without re-rendering the whole page.
                       │
                       ▼
2. Zod Schema ('contactSchema') validates the rules:
   - Name must be at least 2 letters long.
   - Phone number must be at least 6 digits long.
   - Email must be a real email address format if provided.
                       │
                       ▼
3. If errors occur:
   <FormInput> automatically paints a red border ('border-[#B3261E]')
   and displays the helpful error text below the input.
                       │
                       ▼
4. If valid:
   Sonner shows a toast popup ("Strategy call request received"),
   and Next.js redirects the visitor to '/thank-you'.
```

---

## 10. Beginner Cheat Sheet: "Where Should I Edit?"

If you want to make a change, find your task in the list below:

| What do you want to change? | Which file should you open? |
| :--- | :--- |
| Change Homepage text or headlines | `src/app/page.tsx` |
| Change About page story or principles | `src/app/about/about-page-content.tsx` |
| Add or edit a Team Member | `src/mock/team.ts` |
| Add or edit a Case Study / Project | `src/mock/projects.ts` |
| Add or edit a Blog Article | `src/mock/articles.ts` |
| Add or edit a Service / Capability | `src/mock/solutions.ts` |
| Add or edit a Frequently Asked Question | `src/mock/faq.ts` |
| Change Company Phone, Email, or Address | `src/mock/settings.ts` |
| Change Navigation Menu links | `src/mock/navigation.ts` |
| Change the Header Navigation appearance | `src/components/navigation.tsx` |
| Change the Footer layout or copyright | `src/components/footer.tsx` |
| Change Button styling (pill, colors, hover) | `src/components/button.tsx` |
| Change Card styling (borders, hover lift) | `src/components/card.tsx` |
| Change Global Colors or Fonts | `src/app/globals.css` |
| Change Animation Speeds or Timings | `src/animations/presets.ts` |

---

*Guide maintained for Triads Future. Always test changes with `pnpm run build` to verify code correctness.*

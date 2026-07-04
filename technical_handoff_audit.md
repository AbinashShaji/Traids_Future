# TECHNICAL HANDOFF & PROJECT AUDIT

This document provides a comprehensive technical audit of the current state of the **Triads Future** project. It is structured to serve as an immediate handoff guide for developers or AI agents to understand the codebase, design system, component architecture, and transition it safely into backend integration and production.

---

## 1. Executive Summary

- **Project Purpose**: A high-conviction, professional marketing website and case study portfolio for **Triads Future**, a business growth and technology partner. The design is structured to convey trust, clarity, and authority through editorial styling and a warm monochrome visual layout.
- **Current Development Status**: Polished frontend prototype. All major public-facing routes are built, responsive, and functional using static mock data collections.
- **Overall Architecture**: Next.js 16 App Router (React 19) styled with Tailwind CSS v4 and animated using Framer Motion 12. Pages are rendered inside a global layout shell that handles responsive viewport navigation and page transitions.
- **Completion Estimate**: ~75% overall completion (Frontend: 95%, Design: 90%, Animations: 60%, Backend: 0%).
- **Major Strengths**:
  - Extremely refined, high-end warm monochrome layout.
  - Adaptive navigation system supporting three independent layout modes (Desktop, Tablet, Mobile) with layout offset padding.
  - Highly modular component library and centralized design/animation tokens.
  - Robust form validations on contact fields using Zod and React Hook Form.
- **Major Weaknesses**:
  - Lack of dynamic database or CMS integrations (reliant on mock static arrays).
  - Repetitive component layout rhythm on landing pages (heavy grid/card duplication).
  - Framer Motion page-level exit transitions do not coordinate cleanly due to Next.js 16 App Router navigation caching.
  - Unused UI components and animation variants in the source folders (technical debt).

---

## 2. Technology Stack

| Category | Technology | Version / Range | Notes |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `16.2.9` | React 19 compatibility |
| **Core Libraries** | React / React DOM | `19.2.4` | Stable release |
| **Language** | TypeScript | `^5` | High typing coverage |
| **Package Manager** | pnpm | *N/A* | Defined via lockfile `pnpm-lock.yaml` |
| **Styling (CSS)** | Tailwind CSS | `^4.0.0` | Custom PostCSS parsing integrated |
| **CSS Utilities** | `clsx`, `tailwind-merge` | `^2.1.1`, `^3.6.0` | Clustered in the custom `cn` helper |
| **Component Helper**| `class-variance-authority`| `^0.7.1` | Manages variant styling flags |
| **Animations** | Framer Motion | `^12.40.0` | Centralized config & viewport reveal hooks |
| **Carousel** | Embla Carousel React | `^8.6.0` | Installed in dependencies |
| **Icons** | Lucide React | `^1.21.0` | Stroke-based outline icons |
| **Form Libraries** | React Hook Form | `^7.80.0` | Used for contact forms |
| **Validation / API** | Zod + Hook Resolvers | `^4.4.3` / `^5.4.0` | Validates phone, name, email properties |
| **Notification** | Sonner | `^2.0.7` | Toast messages on form submission |
| **Utilities** | Nanoid | `^5.1.15` | Unique ID generator |
| **Unused package** | cmdk | `^1.1.1` | Installed but not imported |

---

## 3. Folder Structure

```text
traids_future/
├── .agent/                    # Workspace agent instructions and skills
├── docs/                      # General project specifications
├── public/
│   └── brand/
│       └── triads-future-logo.png # Master logo asset
├── src/
│   ├── animations/            # Motion configurations and hooks
│   │   ├── presets.ts         # Centralized Framer Motion presets
│   │   └── viewport.ts        # Viewport reveal hook for responsive triggers
│   ├── app/                   # App Router directory (Pages & Layouts)
│   │   ├── about/             # About page route & subcontent
│   │   ├── api/               # API route definitions (empty)
│   │   ├── contact/           # Contact form and FAQ route
│   │   ├── insights/          # Blog index and article slug layouts
│   │   ├── solutions/         # Capabilities catalog page
│   │   ├── thank-you/         # Form success page
│   │   ├── work/              # Portfolio list and project slug layouts
│   │   ├── globals.css        # Core Tailwind imports and theme overrides
│   │   ├── layout.tsx         # Master root layout (fonts, providers)
│   │   └── page.tsx           # Home landing page layout
│   ├── components/            # Reusable UI Primitives
│   │   ├── navigation.tsx     # Triple-viewport navigation header/rail
│   │   ├── footer.tsx         # Layout footer
│   │   └── [primitives].tsx   # Visual blocks (Card, Button, Badge, etc.)
│   ├── mock/                  # Static Data Fixtures
│   │   ├── projects.ts        # Case study articles and metrics
│   │   ├── articles.ts        # Editorial blog posts and topics
│   │   ├── faq.ts             # FAQ questions list
│   │   └── navigation.ts      # Menu layout configurations
│   ├── providers/             # Global Context Layers
│   │   ├── device-experience-manager.tsx # Dynamic viewport observer
│   │   ├── motion-provider.tsx           # Reduced-motion accessibility wrapper
│   │   └── root-providers.tsx            # Context aggregator
│   └── utils/
│       └── cn.ts              # Classname merger utility
```

### Folder Breakdown
- [src/animations](file:///c:/Users/abina/OneDrive/Desktop/traids_future/src/animations): Centralizes all transitions, custom viewport margins, and responsiveness rules.
- [src/app](file:///c:/Users/abina/OneDrive/Desktop/traids_future/src/app): Controls Next.js layout structure, stylesheet variables, and dynamic path setups.
- [src/components](file:///c:/Users/abina/OneDrive/Desktop/traids_future/src/components): Holds 21 UI layout files to ensure styles are consistently structured.
- [src/mock](file:///c:/Users/abina/OneDrive/Desktop/traids_future/src/mock): Acts as a mock database defining case studies, article paragraphs, and navigations.
- [src/providers](file:///c:/Users/abina/OneDrive/Desktop/traids_future/src/providers): Wraps the React tree with global capabilities like viewport width detection and Sonner notifications.
- [src/utils](file:///c:/Users/abina/OneDrive/Desktop/traids_future/src/utils): Holds quick developer tool functions (like classes merging).

---

## 4. Design System

- **Color Palette**: A curated, warm monochrome scheme optimized for high typographic contrast:
  - **Background**: `#FAF9F6` (`--background`) — Warm editorial off-white.
  - **Foreground/Ink**: `#111111` (`--foreground`) — Deep charcoal/black.
  - **Secondary**: `#5F5F5F` (`--secondary`) — Muted reading gray.
  - **Border / Skeleton**: `#E8E8E8` (`--border`) — Soft divider gray.
  - **Error State**: `#DC2626` (`--color-error`) — Alert red.
- **Typography**:
  - **Body font**: Inter (`var(--font-sans)`) — Loaded from Google Fonts; clean and legible.
  - **Headings font**: Outfit (`var(--font-heading)`) — Loaded from Google Fonts; geometric and elegant.
- **Font Hierarchy**:
  - `h1`: `text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-[1.1]`
  - `h2`: `text-3xl md:text-4xl font-semibold tracking-tight text-[#111111] leading-[1.2]`
  - `h3`: `text-xl md:text-2xl font-medium tracking-tight text-[#111111] leading-[1.3]`
  - `h4`: `text-lg font-medium text-[#111111] leading-[1.4]`
  - **Eyebrow Label**: `font-sans text-xs uppercase tracking-wider text-[#5F5F5F]`
- **Spacing System**: Managed via Tailwind standard padding/margins. Section padding is centralized in `SectionWrapper` (`py-16 md:py-24`). Page width containers are centralized in `Container` (`px-6 md:px-12 lg:px-16` with maximum width locked at `max-w-[1400px]`).
- **Border Radius**: Sharp, minimal aesthetics. Primitives default to `rounded-sm` (2px/4px). Navigation buttons use standard pills (`rounded-full`).
- **Shadows**: Heavy drop-shadows or gradients are avoided. The project uses subtle opacity masks like `shadow-[0_4px_20px_rgba(0,0,0,0.02)]` on key visual highlights (e.g. Hero images, form containers).
- **Layout Grid**: Primarily uses responsive grids (`grid-cols-1 lg:grid-cols-12` or `grid-cols-1 md:grid-cols-3`) with generous gap spacing (`gap-8` to `gap-16`) to maintain breathing room.
- **Theme Centralization**: All style tokens are bound to CSS Custom Variables inside [src/app/globals.css](file:///c:/Users/abina/OneDrive/Desktop/traids_future/src/app/globals.css) and exposed through the Tailwind v4 `@theme` directive.
- **Responsive Strategy**: Triple-viewport design managed by Tailwind classes and client viewport events:
  - **Desktop (>= 1024px)**: Top sticky navbar with backdrop blur.
  - **Tablet (768px – 1023px)**: Moves main navigation to a fixed 80px left rail sidebar (`TabletNavigationRail`), offsetting page layout using `md:pl-20`.
  - **Mobile (< 768px)**: Uses a top compact header with a toggleable dropdown menu and a dedicated icon bar (`MobileBottomNavigation`) at the screen bottom, offsetting layout using `pb-36` bottom padding.
  - *Note*: Viewport entrance scroll animations are completely disabled on mobile viewports for performance.

---

## 5. Component Inventory

The following table catalogs reusable components within [src/components/](file:///c:/Users/abina/OneDrive/Desktop/traids_future/src/components):

| Component | Purpose | Reusability | Key Dependencies | Primary Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Container** | Sets standard maximum responsive layout widths and lateral padding. | High | `cn` utility | Wraps all major page sections. |
| **SectionWrapper** | Standardizes semantic `<section>` padding and applies viewport scroll animations. | High | `useViewportReveal` hook, `cn` utility, `framer-motion` | Wraps all sections on landing pages. |
| **SectionHeading** | Unified heading format implementing Outfit typography scales and sentence casing. | High | `cn` utility | Titles for all segments. |
| **Button** | Renders primary (solid), outline (bordered), and text buttons. | High | `cn` utility | CTA actions, forms, navigation. |
| **Card** | Clean bordered containers with optional translation/hover scale transitions. | High | `cn` utility | Process steps, blogs, outcomes. |
| **Badge** | Small label for tags, industries, and categories. | High | `cn` utility | Project cards, cases, headers. |
| **Tag** | Interactive rounded pills for filtering lists. | High | `cn` utility | Insights index filter controls. |
| **CTA** | Editorial call-to-action blocks with centered text. | High | `cn` utility | Contact sections at foot of pages. |
| **Divider** | Thin divider line (`#E8E8E8`). | High | `cn` utility | Separates section blocks. |
| **ImageWrapper** | Custom Image wrapper with scale/opacity loading animations. | High | `Image` (Next), `imageSettleVariants`, `framer-motion` | Case studies, blog cards, heroes. |
| **BrandMark** | Client logo mark linking back to `/`. | High | `Image` (Next), `Link` (Next) | Navbars, mobile headers, footers. |
| **Navigation** | Universal wrapper serving desktop/tablet/mobile menus. | High | `DesktopNavigation`, `TabletNavigationRail`, `MobileBottomNavigation`, `mobileNav` mock configs | Mounts globally inside `GlobalLayout`. |
| **Footer** | Standard site map, address, and legal links footer. | High | `Container`, `Divider`, `footerNav` mock | Global layout file. |
| **FormInput** | Standard input field with error reporting label. | High | `cn` utility, React `useId` | Contact form, newsletter field. |
| **FormTextArea** | Standard textarea field with error reporting label. | High | `cn` utility, React `useId` | Contact form message field. |
| **PageTransition** | Animates page fade-ins on path update. | Medium | `usePathname`, `AnimatePresence` | Global layout wrapper. |
| **Skeleton** | Pulsating placeholder box mimicking loading states. | High | `cn` utility | Used in `LoadingState`. |
| **LoadingState** | Pre-built loading skeleton shapes (page, card, section). | High | `Skeleton` | Contact page loading fallback. |
| **EmptyState** | Clean feedback card for empty lists (technical debt). | High | `Button` | *Unused* |
| **ErrorState** | Displays safe error feedback cards (technical debt). | High | `Button` | *Unused* |

### Component Duplications & Observations
- **FAQ Accordions**: The FAQ list accordion item logic is duplicated. It is implemented once as the custom `FAQItem` element in the About page content, and written again inline inside the Contact page FAQ mapper.
- **Card Primitives**: The principles grid and mission cards in the About page do not use the `Card` component directly. Instead, they duplicate CSS borders, hover, and aspect ratios locally, creating styling drift.

---

## 6. Animation Audit

This table registers every animation in the system:

| Component/Page | Library | Trigger | Animation Type | Duration/Easing | Reusability |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SectionWrapper** | Framer Motion | Viewport Scroll (`whileInView`) | Rise Reveal (Fade up 20px) | `0.6s` / Custom `[0.22, 1, 0.36, 1]` | High (Global wrapper) |
| **ImageWrapper** | Framer Motion | Image Load (`onLoad` event) | Scale (102% to 100%) + Fade | `0.6s` / Custom `[0.22, 1, 0.36, 1]` | High (Enclosed) |
| **PageTransition** | Framer Motion | Path Change (`key={pathname}`) | Fade in / Fade out | `0.25s` / Entrance: `easeOut`, Exit: `easeIn` | Medium (Global) |
| **Button (Hover)** | CSS / Tailwind | Mouse Hover | Translate (`-translate-y-px`) | default Tailwind Transition (200ms) | Centralized |
| **Text Button (Hover)**| CSS / Tailwind | Mouse Hover | Underline scale-x transition | `300ms` / Ease-out | Centralized |
| **Card (Hover)** | CSS / Tailwind | Mouse Hover | Scale (1.015), Translate, Border | `300ms` / Ease-out | Centralized |
| **FAQ Accordion** | CSS / Tailwind | Mouse Click | Grid height transition (`0fr` → `1fr`) | `300ms` / Ease-in-out | Localized |
| **Desktop Nav** | CSS / Tailwind | Page Scroll > 20px | Background opacity change | `300ms` / Ease-in-out | Enclosed |
| **Mobile Menu** | CSS / Tailwind | Hamburger Click | Max-height expansion (`0` → `340px`) | `300ms` / Ease-in-out | Enclosed |

### Motion Presets & Dead Code
- Centralized presets live in [src/animations/presets.ts](file:///c:/Users/abina/OneDrive/Desktop/traids_future/src/animations/presets.ts) and viewport checks in [src/animations/viewport.ts](file:///c:/Users/abina/OneDrive/Desktop/traids_future/src/animations/viewport.ts).
- **Dead Animation Code**: The presets `fadeVariants`, `containerStagger`, `processSequenceVariants`, `processCardVariants`, and `processNumberVariants` are defined and exported but never consumed by any component.
- **Accessibility**: Application-wide motion conforms to OS preferences via `<MotionConfig reducedMotion="user">` in `MotionProvider`.

---

## 7. Static vs Dynamic

### Static Content
- **Marketing Copy**: Explanations of company philosophy, onboarding steps, capabilities overviews, and office info.
- **Grids & Layouts**: Static layouts like principles cards, team stats, and the layout dividers themselves.
- **UI Placeholders**: Skeleton blocks and unlinked buttons (e.g. legal links).

### Dynamic Operations
- **Sensing Systems**: Dynamic device context (`useDevice` hook) listening to client window resizing events.
- **Client Search & Filtering**: Client-side text queries and category pill selectors filtering the articles grid on the Insights index page.
- **Form State Tracking**: Fields capture, schema validation, and Sonner toast message promises on `/contact`.
- **Dynamic Route Mapping**: Dynamic slug layouts (`/work/[slug]` and `/insights/[slug]`) compile paths using dynamic data lookup.
- **Pathing Context**: `PageTransition` captures route parameters to trigger Framer Motion fades.

---

## 8. Page Audit

```text
/                      -> Home (page.tsx)
/about                 -> About Company (about/about-page-content.tsx)
/solutions             -> Capabilities Catalog (solutions/page.tsx)
/work                  -> Case Studies Listing (work/page.tsx)
/work/[slug]           -> Case Study Detail (work/[slug]/page.tsx)
/insights              -> Blog Articles Directory (insights/page.tsx)
/insights/[slug]       -> Article Detail Reader (insights/[slug]/page.tsx)
/contact               -> Booking & FAQs (contact/contact-page-content.tsx)
/thank-you             -> Submission Success (thank-you/page.tsx)
404                    -> Path Error Fallback (not-found.tsx)
```

| Page Route | Layout | Shared Components | Animations | Static/Dynamic | Status |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **Home** (`/`) | Global | `SectionWrapper`, `Container`, `SectionHeading`, `Button`, `Card`, `Badge`, `ImageWrapper`, `Divider`, `CTA` | Section reveals, image settle, hover effects | Dynamic (Context + Mock arrays) | 100% (Complete prototype) |
| **About** (`/about`) | Global | `SectionWrapper`, `Container`, `SectionHeading`, `Button`, `Card`, `Divider`, `ImageWrapper`, `CTA` | Custom index reveals, tab select, accordion height | Dynamic (Active states + Viewports) | 100% (Complete prototype) |
| **Solutions** (`/solutions`)| Global | `SectionWrapper`, `Container`, `SectionHeading`, `Button`, `Card`, `Divider`, `CTA`, `Badge`, `ImageWrapper` | Section reveals, image settle | Dynamic (Reads mock catalog) | 100% (Complete prototype) |
| **Work** (`/work`) | Global | `SectionWrapper`, `Container`, `SectionHeading`, `Button`, `Divider`, `ImageWrapper`, `CTA`, `Badge` | Section reveals, image scale on hover | Dynamic (Reads mock projects) | 100% (Complete prototype) |
| **Work Detail** (`/[slug]`)| Global | `SectionWrapper`, `Container`, `SectionHeading`, `Button`, `ImageWrapper`, `CTA` | Section reveals, image load settle | Dynamic (Dynamic parameters params) | 100% (Complete prototype) |
| **Insights** (`/insights`)| Global | `SectionWrapper`, `Container`, `SectionHeading`, `Button`, `Card`, `Divider`, `ImageWrapper`, `FormInput`, `Tag` | Section reveals, search/category filter | Dynamic (Search state + Form submission) | 100% (Complete prototype) |
| **Insights Detail** | Global | `SectionWrapper`, `Container`, `SectionHeading`, `Button`, `Card`, `Divider`, `ImageWrapper`, `CTA` | Section reveals, markdown parser helper | Dynamic (Dynamic parameters params) | 100% (Complete prototype) |
| **Contact** (`/contact`) | Global | `SectionWrapper`, `Container`, `SectionHeading`, `Button`, `FormInput`, `FormTextArea`, `Divider` | Accordion height transition, alert triggers | Dynamic (Form validation + URL params) | 100% (Complete prototype) |
| **Thank You** | Global | `SectionWrapper`, `Container`, `SectionHeading`, `Button`, `Card` | Entrance reveal | Dynamic (Layout properties) | 100% (Complete prototype) |
| **NotFound** (404) | Global | `SectionWrapper`, `Container`, `SectionHeading`, `Button` | Entrance reveal | Static content shell | 100% (Complete prototype) |

---

## 9. Navigation Flow

- **Routing Model**: Handled client-side via Next.js App Router using `<Link>` tags.
- **Layout Hierarchy**:
  ```text
  layout.tsx (Master Layout)
   └── RootProviders (Device, Motion, Toaster)
        └── [Page Shell]
             └── GlobalLayout (GlobalLayout.tsx)
                  ├── Navigation (Universal navbar header/sidebar)
                  ├── main -> PageTransition -> [Page Specific Routes]
                  └── Footer
  ```
- **Responsive Nav Bars**:
  - Desktop: Horizontal menu links + dynamic scroll background change.
  - Tablet: Fixed left sidebar rail (`md:pl-20` layout offset).
  - Mobile: Top toggle menu + fixed bottom icon deck (`pb-36` bottom padding offset).
- **Loading State Fallbacks**: A Suspense layout skeleton is loaded on `/contact` to cover hydration gaps. Standard route-level `loading.tsx` loaders do not exist for other pages.
- **Error Pages**: A fallback component is declared (`error-state.tsx`) but not bound to actual Next.js route boundaries (`error.tsx`).
- **NotFound Layout**: `/not-found.tsx` provides recovery pathways back to main sections.

---

## 10. Data Flow

```mermaid
graph TD
    StaticMockDB[(src/mock/*.ts)] -->|Direct Imports| ClientPageContext[Client Pages / Routes]
    StaticMockDB -->|Direct Imports| DynamicServerEntry[Server dynamic params lookup]
    
    DeviceManagerObserver[DeviceExperienceManager] -->|Context value| DeviceContext[DeviceContext]
    DeviceContext -->|useDevice Hook| ClientPageContext
    DeviceContext -->|Layout padding shifts| GlobalLayoutShell[GlobalLayout]
    
    ContactFormInputs[Form inputs] -->|Validation schema| ZodValidator[Zod Schema]
    ZodValidator -->|Success| SonnerAlerts[Sonner toast notification]
    ZodValidator -->|Redirect| ThankYouRedirect[router.push('/thank-you')]
```

- **Origin of Data**: Static TS declarations in [src/mock/](file:///c:/Users/abina/OneDrive/Desktop/traids_future/src/mock) defining articles, faqs, and projects.
- **Server/Client Boundary**: Detail pages are dynamically pre-compiled using `generateStaticParams()`. Interaction triggers (forms, inputs, accordion toggles, navigation scrolls) force client execution (`"use client"`).
- **Global Contexts**:
  - `DeviceContext`: Coordinates padding offsets across layout shifts.
  - `MotionContext`: Standardizes motion constraints.

---

## 11. Assets

- **Fonts**: Outfit (headings) and Inter (sans-serif) loaded via `next/font/google` inside `layout.tsx`.
- **Icons**: Outlined SVG tags from `lucide-react`. The navigation bar maps menu tags dynamically using `iconMap` keys:
  - `Home` ➔ `House`
  - `Solutions` ➔ `LayoutGrid`
  - `Work` ➔ `BriefcaseBusiness`
  - `About` / `Insights` ➔ `BookOpen`
  - `Book` ➔ `Calendar`
- **Images**: Remote photographs loaded from Unsplash (`images.unsplash.com`). Remote patterns are configured in `next.config.ts`.
- **Logos**: Master branding asset located at `/brand/triads-future-logo.png`.

---

## 12. Dependencies Audit

- **Unused Packages**: `cmdk` is declared in `package.json` but never imported in any typescript file.
- **Unused Files (Dead Code)**:
  - Components: `loading-state.tsx`, `error-state.tsx`, and `empty-state.tsx` are fully declared but never used.
  - Presets: `fadeVariants`, `containerStagger`, `processSequenceVariants`, `processCardVariants`, and `processNumberVariants` in `presets.ts` are exported but unused.
- **Large Packages**: `framer-motion` adds bundle size, but is required for scroll reveal animations.

---

## 13. Code Quality Evaluation

- **Folder Organization**: High. Primitives, routing layers, configurations, and mock datasets are isolated cleanly.
- **Naming Conventions**: Excellent. Consistent PascalCase for components, camelCase for variables/functions, and kebab-case for routes.
- **CSS Variable Mapping**: Excellent. Style declarations are bound directly to root variables.
- **Technical Debt Summary**:
  - Unused components (`empty-state.tsx`, `error-state.tsx`, `loading-state.tsx`).
  - Unused motion presets inside `presets.ts`.
  - Accordion toggle logic duplicated across About and Contact pages.
  - Loose types on dynamic icon arrays (uses `any` mapping).
  - Lack of route-level error boundary layouts (`error.tsx`).

---

## 14. Current Progress

| Dimension | Estimate (%) | Notes |
| :--- | :---: | :--- |
| **Frontend Layout** | 95% | All pages, layouts, and menus are fully operational. |
| **Design / Styles** | 90% | Highly cohesive warm-monochrome visual identity. |
| **Responsive layouts**| 85% | Responsive styling is stable, but tablet mode rail is slightly narrow. |
| **Animations** | 60% | Basic entrance reveals exist, but exit page transitions are incomplete. |
| **Backend Integration**| 0% | No actual API integrations or dynamic CMS databases configured. |
| **Production Readiness**| 70% | Needs dead code cleanup, form APIs, SEO tags, and legal routes. |

---

## 15. Problems & Incomplete Features

1. **Missing Legal Routes**: Footer links direct users to `/privacy` and `/terms`, but these routes are not built and currently throw a 404 error.
2. **Page Transitions**: `AnimatePresence` inside `PageTransition.tsx` does not reliably trigger exit transitions on route navigation due to Next.js App Router caching.
3. **Hardcoded Mock Details**: Placeholder phone (`+1 (555) 234-5678`), mock email (`partners@triadsfuture.com`), mock address (`123 Editorial Boulevard`), and mock Unsplash URLs.
4. **Suspense Hydration**: Only `/contact` contains loading boundary coverage. Other pages experience sudden jumps on first content rendering.
5. **No CMS Backend**: All content details must be updated manually in static TS mockup files.

---

## 16. Reconstruction Blueprint

To reconstruct the frontend without analyzing every individual file, implement the following roadmap:

### 1. Style Foundations
Import Tailwind CSS v4 and bind variables inside a root `globals.css` file:
```css
:root {
  --background: #FAF9F6;
  --foreground: #111111;
  --secondary: #5F5F5F;
  --border: #E8E8E8;
  --color-error: #DC2626;
}
```

### 2. Layout Structure
Every page requires wrapping inside `GlobalLayout`, which manages responsive padding:
- **Mobile (< 768px)**: Add bottom padding `pb-36` to make space for the bottom icon navigation bar.
- **Tablet (768px - 1023px)**: Add left padding `md:pl-20` to make space for the fixed left navigation rail.
- **Desktop (>= 1024px)**: Normal padding; top sticky navigation header sits on top of the hero section.

### 3. Core Components
- **SectionWrapper**: Serves as the primary semantic `<section>` element. Automatically applies viewport-triggered rise transition reveals (fade up 20px over 0.6s) on desktop using a custom cubic-bezier ease `[0.22, 1, 0.36, 1]`. Motion is disabled on mobile.
- **ImageWrapper**: A wrapper around the Next.js `Image` component. On image loading, it animates from 102% scale down to 100% while fading in from 0% opacity.
- **Button**: Supports three styles: `primary` (solid ink block), `outline` (ink border), and `text` (underlined on hover using a `scale-x` scale transition).

### 4. Route Navigation
- Navbar navigation changes links dynamically based on the active route pathname.
- Dynamic route slugs (`/work/[slug]` and `/insights/[slug]`) must use `generateStaticParams()` to fetch mock items and generate static page paths at build time.

---

## 17. Next Development Priorities

### Priority 1: Critical (API & Routing Fixes)
1. **API Integration**: Create Next.js API handlers or hook a headless CMS (e.g. Sanity, Contentful) to replace static arrays in `src/mock`.
2. **Setup Legal Routes**: Build static `/privacy` and `/terms` files to prevent the footer links from throwing 404 errors.
3. **Fix Page Transitions**: Re-implement `PageTransition.tsx` using Next.js App Router Templates (`template.tsx`) to ensure exit transitions run reliably.

### Priority 2: High (Polish & Performance)
1. **Clean Technical Debt**: Remove unused components (`loading-state`, `error-state`, `empty-state`) and unused variants in `presets.ts`.
2. **Add Global Loader Routes**: Implement `loading.tsx` loaders for the `/work` and `/insights` routes to improve page transition UX.
3. **Resolve Accordion Duplication**: Extract the FAQ accordion item logic into a single reusable component.

### Priority 3: Medium (Refining Responsive Views)
1. **Tablet Refinement**: Optimize margins on the solutions and work index pages in tablet view, as the left rail currently compresses content.
2. **Replace Mock Information**: Swap out mock office addresses, phone numbers, emails, and remote Unsplash URLs with production-ready assets.
3. **Add Error Boundaries**: Bind `error-state.tsx` as a standard Next.js error catcher.

### Priority 4: Low (Conversion Strategy)
1. **Integrate client logotypes**: Add client logos or testimonial metrics to the home page to strengthen credibility.
2. **Extend Analytics**: Integrate analytics script triggers on contact submit buttons.

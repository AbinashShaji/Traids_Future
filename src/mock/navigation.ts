/**
 * FILE: src/mock/navigation.ts
 *
 * WHAT THIS DOES:
 * Defines the navigation menu links for all screen sizes (Desktop, Tablet, Mobile) and the Footer.
 *
 * WHERE IT IS USED:
 * - Read by `src/components/navigation.tsx` (Top header, Tablet left rail, Mobile bottom bar).
 * - Read by `src/components/footer.tsx` (Footer directory links & legal policy links).
 *
 * HOW IT WORKS:
 * Exports arrays of `NavItem` objects containing a `label` (what the user reads)
 * and an `href` (the web address it navigates to).
 *
 * BEGINNER TIP:
 * If you add a new page to the website, add its link to `desktopNav`, `tabletNav`,
 * `mobileNav`, and `footerNav` so visitors can reach it from the menus!
 */

// NavItem defines the structure for a single menu item: a text label and the webpage link (href) it points to.
export interface NavItem {
  label: string;
  href: string;
}

// Menu items shown on desktop screens.
export const desktopNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];

// Menu items shown on tablet screens.
export const tabletNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Book", href: "/contact" },
];

// Menu items shown on mobile phone screens.
export const mobileNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Book", href: "/contact" },
];

// Menu items shown in the footer layout at the bottom of every page.
export const footerNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

// Legal agreement links shown at the very bottom copyright line.
export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

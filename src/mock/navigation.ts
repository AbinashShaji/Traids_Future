// This file lists the links and labels that show up in the menus at the top and bottom of the website.
// It structures links separately for computers (desktop), tablets, mobile phones, and the website's footer block.

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

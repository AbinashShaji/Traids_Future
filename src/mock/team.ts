/**
 * FILE: src/mock/team.ts
 *
 * WHAT THIS DOES:
 * Stores the list of team members and leaders working at Triads Future.
 *
 * WHERE IT IS USED:
 * - Read by the <TeamShowcase> component.
 * - Displayed on the About page (/about) under the "The People" section.
 *
 * HOW IT WORKS:
 * 1. Defines the shape (type) of what a team member is (name, role, bio, photo, LinkedIn).
 * 2. Provides the default list of real team members in the `teamMembers` array.
 * 3. The `getActiveTeamMembers` helper sorts and filters active people automatically.
 *
 * FUTURE CMS NOTE:
 * When an admin dashboard/CMS is connected in the future, this file will be
 * replaced with an API call to fetch team members from a database.
 *
 * BEGINNER TIP:
 * To add a new team member, simply add a new object to the `teamMembers` array!
 */

export interface TeamSocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
  email?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  label?: string;
  statement?: string;
  bio: string | string[];
  image?: string;
  socialLinks?: TeamSocialLinks;
  linkedin?: string; // Direct shortcut for backward compatibility
  order?: number;
  featured?: boolean;
  status?: "active" | "inactive";
  location?: string;
  department?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "abinash-shaji",
    name: "Abinash Shaji",
    role: "CEO & Founder",
    label: "CEO / Founder",
    statement: "Leading strategy, technical architecture, and compound business growth.",
    bio: [
      "Founded Triads Future to eliminate the gap between high-level business strategy and reliable technical execution.",
      "Works directly with growing companies to design resilient software architecture, streamline operational bottlenecks, and build digital systems that scale with enterprise demand.",
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/company/triadsfuture",
    },
    linkedin: "https://linkedin.com/company/triadsfuture",
    order: 1,
    featured: true,
    status: "active",
    location: "London · Global",
    department: "Executive Leadership",
  },
];

// Helper to retrieve active team members sorted by featured priority and custom display order
export function getActiveTeamMembers(data: TeamMember[] = teamMembers): TeamMember[] {
  return data
    .filter((member) => member.status !== "inactive")
    .sort((a, b) => {
      // Featured members first if orders match or default
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (a.order ?? 99) - (b.order ?? 99);
    });
}

// Backward-compatible export for existing references
export const leadershipTeam = teamMembers;

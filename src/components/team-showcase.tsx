/**
 * FILE: src/components/team-showcase.tsx
 *
 * WHAT THIS DOES:
 * Displays the team members, leadership profiles, and founders of Triads Future.
 *
 * WHERE IT IS USED:
 * - Mounted on the About page (`src/app/about/about-page-content.tsx`) inside the `#team` slide section.
 *
 * HOW IT WORKS:
 * 1. Reads team data from `src/mock/team.ts` (or accepts a custom `members` list).
 * 2. If a member is marked `featured: true` (e.g. CEO Abinash Shaji), they get a prominent,
 *    editorial asymmetric portrait card with bio narrative and location metadata.
 * 3. Secondary team members are rendered in a clean, responsive editorial grid below.
 * 4. If a member has no photo, it automatically generates an architectural monoline SVG placeholder!
 *
 * BEGINNER TIP:
 * If you want to change how team member cards look or add new profile fields, edit this file!
 */
"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "./container";
import { SectionHeading } from "./section-heading";
import { TriadMark } from "./triad-mark";
import { ImageWrapper } from "./image-wrapper";
import { Reveal } from "./reveal";
import { cn } from "../utils/cn";
import {
  type TeamMember,
  teamMembers as defaultTeamMembers,
  getActiveTeamMembers,
} from "../mock/team";

export interface TeamShowcaseProps {
  members?: TeamMember[];
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  className?: string;
  showSectionHeader?: boolean;
}

// Architectural Monoline Placeholder for team members without a photographic asset
function ArchitecturalMemberPlaceholder({
  member,
  aspectRatio = "aspect-[4/5]",
}: {
  member: TeamMember;
  aspectRatio?: string;
}) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");

  return (
    <div
      className={cn(
        "w-full relative rounded-[2px] overflow-hidden border border-[#DEDDD3] bg-[#F0F0EB] flex flex-col justify-between p-6 sm:p-8 transition-all duration-500 hover:shadow-[0_12px_32px_rgba(20,20,15,0.06)] group",
        aspectRatio
      )}
    >
      <div className="flex items-center justify-between">
        <TriadMark size="sm" />
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#57564C]">
          {member.location || "London · Global"}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center my-auto py-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[2px] border border-[#DEDDD3] bg-[#E4E3DB] flex items-center justify-center mb-3 transition-transform duration-500 group-hover:scale-105">
          <span className="font-heading text-xl sm:text-2xl font-medium text-[#14140F]">
            {initials}
          </span>
        </div>
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#14140F] text-center">
          {member.name}
        </span>
        <span className="font-sans text-[11px] text-[#57564C] mt-1 text-center">
          {member.department || member.role}
        </span>
      </div>

      <div className="pt-3 border-t border-[#DEDDD3] flex items-center justify-between font-sans text-[11px] text-[#57564C]">
        <span>Triads Future</span>
        <span>{member.label || member.role}</span>
      </div>
    </div>
  );
}

export const TeamShowcase: React.FC<TeamShowcaseProps> = ({
  members: rawMembers = defaultTeamMembers,
  eyebrow = "The People Behind Triads Future",
  heading = "The people turning strategy into something real.",
  subheading = "We operate as active practitioners and senior partners who design, code, and deploy directly with our clients.",
  className,
  showSectionHeader = true,
}) => {
  // Sort and filter active members (ready for dynamic CMS payload)
  const activeMembers = React.useMemo(
    () => getActiveTeamMembers(rawMembers),
    [rawMembers]
  );

  // Determine featured vs standard team members
  const featuredMember = React.useMemo(() => {
    return activeMembers.find((m) => m.featured) || activeMembers[0];
  }, [activeMembers]);

  const secondaryMembers = React.useMemo(() => {
    if (!featuredMember) return [];
    return activeMembers.filter((m) => m.id !== featuredMember.id);
  }, [activeMembers, featuredMember]);

  return (
    <div className={cn("w-full", className)}>
      <Container>
        {/* 1. Section Introduction */}
        {showSectionHeader && (
          <div className="max-w-3xl mb-12 sm:mb-16">
            <Reveal variant="fadeUp">
              <SectionHeading tag="h2" subtitle={eyebrow} withTriadMark>
                {heading}
              </SectionHeading>
              {subheading && (
                <p className="font-editorial text-[#57564C] text-base md:text-lg leading-relaxed mt-3">
                  {subheading}
                </p>
              )}
            </Reveal>
          </div>
        )}

        {/* 2. Empty State Handling (CMS-ready fallback) */}
        {activeMembers.length === 0 ? (
          <Reveal variant="fadeUp">
            <div className="border border-[#DEDDD3] rounded-[2px] bg-[#E4E3DB]/50 p-10 md:p-14 text-center max-w-2xl mx-auto flex flex-col items-center gap-4">
              <TriadMark size="md" />
              <h3 className="font-heading text-xl md:text-2xl text-[#14140F]">
                Meet the people behind the work.
              </h3>
              <p className="font-editorial text-[#57564C] text-base leading-relaxed max-w-md">
                Our multidisciplinary engineering and strategy team is currently being updated. Connect directly with our leadership to learn more.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#14140F] hover:text-[#57564C] transition-colors group"
                >
                  <span className="btn-text-underline">Initiate Conversation</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        ) : (
          <div className="space-y-12 sm:space-y-16">
            {/* 3. Featured Team Member Presentation */}
            {featuredMember && (
              <Reveal variant="fadeUp">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-[#E4E3DB] border border-[#DEDDD3] rounded-[2px] p-6 sm:p-10 lg:p-12">
                  {/* Left: Large Editorial Portrait or Architectural Monoline Placeholder */}
                  <div className="lg:col-span-5 w-full">
                    {featuredMember.image ? (
                      <div className="w-full aspect-[4/5] relative rounded-[2px] overflow-hidden border border-[#DEDDD3] bg-[#F0F0EB] group">
                        <ImageWrapper
                          src={featuredMember.image}
                          alt={featuredMember.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                          containerClassName="w-full h-full rounded-[2px] border-none"
                        />
                      </div>
                    ) : (
                      <ArchitecturalMemberPlaceholder
                        member={featuredMember}
                        aspectRatio="aspect-[4/5]"
                      />
                    )}
                  </div>

                  {/* Right: Detailed Metadata & Bio */}
                  <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#57564C]">
                        {featuredMember.label || featuredMember.role}
                      </span>
                      <h3 className="font-sans text-3xl sm:text-4xl font-bold text-[#14140F] tracking-tight">
                        {featuredMember.name}
                      </h3>
                      {featuredMember.statement && (
                        <p className="font-editorial italic text-lg sm:text-xl text-[#14140F] leading-snug mt-1">
                          &ldquo;{featuredMember.statement}&rdquo;
                        </p>
                      )}
                    </div>

                    {/* Biography Flow */}
                    <div className="space-y-4 font-sans text-sm sm:text-base text-[#57564C] leading-relaxed border-t border-[#DEDDD3] pt-5">
                      {Array.isArray(featuredMember.bio) ? (
                        featuredMember.bio.map((para, idx) => (
                          <p key={idx}>{para}</p>
                        ))
                      ) : (
                        <p>{featuredMember.bio}</p>
                      )}
                    </div>

                    {/* Social & Contact Connections */}
                    {(featuredMember.linkedin ||
                      featuredMember.socialLinks?.linkedin ||
                      featuredMember.socialLinks?.twitter ||
                      featuredMember.socialLinks?.website) && (
                      <div className="pt-2 flex flex-wrap items-center gap-6">
                        {(featuredMember.linkedin ||
                          featuredMember.socialLinks?.linkedin) && (
                          <a
                            href={
                              featuredMember.linkedin ||
                              featuredMember.socialLinks?.linkedin
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#14140F] hover:text-[#57564C] transition-colors group"
                          >
                            <span className="btn-text-underline">
                              Connect on LinkedIn
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </a>
                        )}

                        {featuredMember.socialLinks?.website && (
                          <a
                            href={featuredMember.socialLinks.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#57564C] hover:text-[#14140F] transition-colors group"
                          >
                            <span>Portfolio</span>
                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            )}

            {/* 4. Secondary Team Members Editorial Grid (When multiple members exist) */}
            {secondaryMembers.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
                {secondaryMembers.map((member, idx) => (
                  <Reveal key={member.id} variant="fadeUp" delay={idx + 1}>
                    <div className="bg-[#E4E3DB] border border-[#DEDDD3] rounded-[2px] p-6 flex flex-col justify-between h-full group hover:border-[#14140F]/30 transition-all duration-300">
                      <div>
                        {/* Member Image / Monoline Placeholder */}
                        <div className="mb-5 overflow-hidden rounded-[2px]">
                          {member.image ? (
                            <div className="w-full aspect-[4/5] relative rounded-[2px] overflow-hidden border border-[#DEDDD3] bg-[#F0F0EB]">
                              <ImageWrapper
                                src={member.image}
                                alt={member.name}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                containerClassName="w-full h-full rounded-[2px] border-none"
                              />
                            </div>
                          ) : (
                            <ArchitecturalMemberPlaceholder
                              member={member}
                              aspectRatio="aspect-[4/5]"
                            />
                          )}
                        </div>

                        {/* Member Header */}
                        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#57564C] block mb-1">
                          {member.label || member.role}
                        </span>
                        <h4 className="font-sans text-xl font-bold text-[#14140F] tracking-tight mb-3">
                          {member.name}
                        </h4>

                        {/* Bio snippet */}
                        <p className="font-sans text-sm text-[#57564C] leading-relaxed">
                          {Array.isArray(member.bio)
                            ? member.bio[0]
                            : member.bio}
                        </p>
                      </div>

                      {/* Social Link */}
                      {(member.linkedin ||
                        member.socialLinks?.linkedin) && (
                        <div className="pt-5 mt-5 border-t border-[#DEDDD3]">
                          <a
                            href={
                              member.linkedin ||
                              member.socialLinks?.linkedin
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#14140F] hover:text-[#57564C] transition-colors group/link"
                          >
                            <span className="btn-text-underline">
                              LinkedIn Profile
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                          </a>
                        </div>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

TeamShowcase.displayName = "TeamShowcase";

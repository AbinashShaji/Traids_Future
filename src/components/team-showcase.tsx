/**
 * FILE: src/components/team-showcase.tsx
 *
 * Displays team members and leadership profiles with clean line-border architecture.
 * Clean, lightweight, and free of heavy container boxes.
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
        "w-full relative overflow-hidden border border-[#e4e4e7] bg-[#fafafa] flex flex-col justify-between p-6 sm:p-8 transition-all duration-300 group",
        aspectRatio
      )}
    >
      <div className="flex items-center justify-between">
        <TriadMark size="sm" />
        <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-[#71717a]">
          {member.location || "London · Global"}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center my-auto py-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#e4e4e7] bg-white flex items-center justify-center mb-3">
          <span className="font-sans text-xl sm:text-2xl font-bold text-[#0a0a0a]">
            {initials}
          </span>
        </div>
        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#0a0a0a] text-center">
          {member.name}
        </span>
        <span className="font-sans text-[11px] text-[#71717a] mt-1 text-center">
          {member.department || member.role}
        </span>
      </div>

      <div className="pt-3 border-t border-[#e4e4e7] flex items-center justify-between font-sans text-[11px] text-[#71717a]">
        <span>Triads Future</span>
        <span>{member.label || member.role}</span>
      </div>
    </div>
  );
}

export const TeamShowcase: React.FC<TeamShowcaseProps> = ({
  members: rawMembers = defaultTeamMembers,
  eyebrow = "Leadership",
  heading = "The people turning strategy into something real.",
  subheading = "We operate as active practitioners and senior partners who design, code, and deploy directly with our clients.",
  className,
  showSectionHeader = true,
}) => {
  const activeMembers = React.useMemo(
    () => getActiveTeamMembers(rawMembers),
    [rawMembers]
  );

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
        {/* Section Heading */}
        {showSectionHeader && (
          <div className="max-w-3xl mb-12 sm:mb-16">
            <Reveal variant="fadeUp">
              <SectionHeading tag="h2" subtitle={eyebrow} withTriadMark>
                {heading}
              </SectionHeading>
              {subheading && (
                <p className="font-sans text-[#71717a] text-base md:text-lg leading-relaxed mt-4">
                  {subheading}
                </p>
              )}
            </Reveal>
          </div>
        )}

        {/* Empty State */}
        {activeMembers.length === 0 ? (
          <Reveal variant="fadeUp">
            <div className="border-t border-b border-[#e4e4e7] py-14 text-center max-w-2xl mx-auto flex flex-col items-center gap-4">
              <TriadMark size="md" />
              <h3 className="font-sans text-xl md:text-2xl font-bold text-[#0a0a0a]">
                Meet the people behind the work.
              </h3>
              <p className="font-sans text-[#71717a] text-base leading-relaxed max-w-md">
                Our team information is currently being updated. Connect directly with our leadership to learn more.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest text-[#0a0a0a] hover:text-[#e11d48] transition-colors"
                >
                  <span>Talk to us</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        ) : (
          <div className="space-y-16">
            {/* Featured Team Member (Clean Lined 2-Column Split) */}
            {featuredMember && (
              <Reveal variant="fadeUp">
                <div className="border-t border-b border-[#e4e4e7] py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  {/* Portrait */}
                  <div className="lg:col-span-5 w-full">
                    {featuredMember.image ? (
                      <div className="w-full aspect-[4/5] relative overflow-hidden border border-[#e4e4e7] bg-[#fafafa]">
                        <ImageWrapper
                          src={featuredMember.image}
                          alt={featuredMember.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover"
                          containerClassName="w-full h-full border-none rounded-none"
                        />
                      </div>
                    ) : (
                      <ArchitecturalMemberPlaceholder
                        member={featuredMember}
                        aspectRatio="aspect-[4/5]"
                      />
                    )}
                  </div>

                  {/* Bio & Details */}
                  <div className="lg:col-span-7 flex flex-col gap-5">
                    <div>
                      <span className="font-sans text-xs font-semibold uppercase tracking-widest text-[#e11d48] block mb-2">
                        {featuredMember.label || featuredMember.role}
                      </span>
                      <h3 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a0a0a] tracking-tight">
                        {featuredMember.name}
                      </h3>
                      {featuredMember.statement && (
                        <p className="font-sans italic text-base sm:text-lg text-[#52525b] leading-snug mt-2">
                          &ldquo;{featuredMember.statement}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="space-y-4 font-sans text-sm sm:text-base text-[#71717a] leading-relaxed border-t border-[#e4e4e7] pt-5">
                      {Array.isArray(featuredMember.bio) ? (
                        featuredMember.bio.map((para, idx) => (
                          <p key={idx}>{para}</p>
                        ))
                      ) : (
                        <p>{featuredMember.bio}</p>
                      )}
                    </div>

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
                            className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest text-[#0a0a0a] hover:text-[#e11d48] transition-colors"
                          >
                            <span>Connect on LinkedIn</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {featuredMember.socialLinks?.website && (
                          <a
                            href={featuredMember.socialLinks.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-widest text-[#71717a] hover:text-[#0a0a0a] transition-colors"
                          >
                            <span>Portfolio</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Secondary Team Members */}
            {secondaryMembers.length > 0 && (
              <div className="border-t border-b border-[#e4e4e7] divide-y md:divide-y-0 md:divide-x divide-[#e4e4e7] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {secondaryMembers.map((member, idx) => (
                  <Reveal key={member.id} variant="fadeUp" delay={idx + 1}>
                    <div className="py-8 md:py-12 px-6 sm:px-8 flex flex-col justify-between h-full bg-white">
                      <div>
                        <div className="mb-5 overflow-hidden">
                          {member.image ? (
                            <div className="w-full aspect-[4/5] relative overflow-hidden border border-[#e4e4e7] bg-[#fafafa]">
                              <ImageWrapper
                                src={member.image}
                                alt={member.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover"
                                containerClassName="w-full h-full border-none rounded-none"
                              />
                            </div>
                          ) : (
                            <ArchitecturalMemberPlaceholder
                              member={member}
                              aspectRatio="aspect-[4/5]"
                            />
                          )}
                        </div>

                        <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-[#e11d48] block mb-1">
                          {member.label || member.role}
                        </span>
                        <h4 className="font-sans text-xl font-bold text-[#0a0a0a] tracking-tight mb-3">
                          {member.name}
                        </h4>

                        <p className="font-sans text-sm text-[#71717a] leading-relaxed">
                          {Array.isArray(member.bio)
                            ? member.bio[0]
                            : member.bio}
                        </p>
                      </div>

                      {(member.linkedin ||
                        member.socialLinks?.linkedin) && (
                        <div className="pt-5 mt-5 border-t border-[#e4e4e7]">
                          <a
                            href={
                              member.linkedin ||
                              member.socialLinks?.linkedin
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest text-[#0a0a0a] hover:text-[#e11d48] transition-colors"
                          >
                            <span>LinkedIn Profile</span>
                            <ArrowRight className="w-3.5 h-3.5" />
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

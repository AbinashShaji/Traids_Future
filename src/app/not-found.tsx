// 404 page styled with Design System v2 tokens and typography.
import * as React from "react";
import Link from "next/link";
import { House, LayoutGrid, BriefcaseBusiness } from "lucide-react";
import { GlobalLayout } from "../components/global-layout";
import { Container } from "../components/container";
import { SectionHeading } from "../components/section-heading";
import { Button } from "../components/button";

export default function NotFound() {
  return (
    <GlobalLayout>
      <section className="min-h-[70vh] flex items-center justify-center pt-32 pb-20">
        <Container className="max-w-2xl text-center flex flex-col items-center gap-6">
          <SectionHeading
            tag="h1"
            subtitle="Error 404"
            withTriadMark
            className="text-center"
          >
            Page not found
          </SectionHeading>
          
          <p className="font-editorial text-[#57564C] text-lg md:text-xl leading-relaxed max-w-md">
            The page you are looking for does not exist, was relocated, or is no longer available. Return to one of our main sections below.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center">
            <Link href="/">
              <Button variant="primary" className="w-full sm:w-auto gap-2">
                <House className="w-4 h-4 stroke-[1.5]" />
                Return to Home
              </Button>
            </Link>
            <Link href="/solutions">
              <Button variant="outline" className="w-full sm:w-auto gap-2">
                <LayoutGrid className="w-4 h-4 stroke-[1.5]" />
                Explore Solutions
              </Button>
            </Link>
            <Link href="/work">
              <Button variant="outline" className="w-full sm:w-auto gap-2">
                <BriefcaseBusiness className="w-4 h-4 stroke-[1.5]" />
                View Success Stories
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </GlobalLayout>
  );
}

/**
 * FILE: src/mock/solutions.ts
 *
 * WHAT THIS DOES:
 * Stores the 5 core business solutions and technical services offered by Triads Future.
 *
 * WHERE IT IS USED:
 * - Rendered on the Homepage (/) in the Capabilities slide.
 * - Rendered on the Solutions page (/solutions) as the main service catalog.
 *
 * HOW IT WORKS:
 * Each solution includes its service name, business impact description,
 * list of specific engineering deliverables, target customer type, and icon name.
 *
 * BEGINNER TIP:
 * If the company launches a new service (like "AI Integration"),
 * you would define its details in this array!
 */

export interface Solution {
  id: string;
  title: string;
  description: string;
  businessValue: string;
  services: string[];
  idealFor: string;
  ctaText: string;
  icon: string;
}

export const solutions: Solution[] = [
  {
    id: "custom-web-applications",
    title: "Custom Web Applications",
    description:
      "Websites and applications engineered as business tools first, design objects second. We design and build bespoke tools that eliminate operational friction.",
    businessValue:
      "Custom software shaped around your exact workflows removes bottlenecks, saves team hours every week, and scales seamlessly with revenue growth.",
    services: [
      "Client & partner portals",
      "Internal operations tools",
      "Custom API integrations",
      "Web application engineering",
      "Technical architecture roadmapping",
    ],
    idealFor: "Businesses outgrowing off-the-shelf SaaS needing custom systems tailored to their workflows.",
    ctaText: "Start a conversation",
    icon: "Monitor",
  },
  {
    id: "process-automation",
    title: "Process Automation",
    description:
      "Systematize repetitive operations and data handoffs so your senior team spends time on high-leverage growth, not administrative friction.",
    businessValue:
      "Intelligent automation eliminates manual data entry errors, shortens delivery turnaround times, and lowers operating overhead across departments.",
    services: [
      "Workflow & CRM automation",
      "End-to-end process mapping",
      "Data ingestion pipelines",
      "Custom analytics dashboards",
      "Legacy software modernization",
    ],
    idealFor: "Teams bogged down by repetitive manual workflows that bottleneck scale.",
    ctaText: "Start a conversation",
    icon: "Zap",
  },
  {
    id: "brand-architecture",
    title: "Brand Architecture",
    description:
      "Positioning and visual identity systems that clarify your market position and communicate exactly why you are the obvious choice.",
    businessValue:
      "Clear positioning is a durable commercial moat. When target clients immediately understand your value proposition, pricing power increases and sales cycles shorten.",
    services: [
      "Strategic market positioning",
      "Visual & design system creation",
      "Executive messaging frameworks",
      "Editorial content direction",
      "Brand governance & guidelines",
    ],
    idealFor: "Growing businesses whose reputation has outpaced their current brand assets and visual presentation.",
    ctaText: "Start a conversation",
    icon: "Layers",
  },
  {
    id: "high-performance-websites",
    title: "High-Performance Websites",
    description:
      "Build visibility that compounds. We engineer fast, credible digital homes optimized for technical performance and search visibility that convert visitors into qualified pipeline.",
    businessValue:
      "A strong digital presence builds authority before anyone speaks to you. Clients see your depth, understand your commercial value, and arrive ready to engage.",
    services: [
      "Website design & engineering",
      "SEO & technical foundations",
      "Performance & speed optimization",
      "Mobile-first responsive architecture",
      "Headless CMS integration",
    ],
    idealFor: "Established businesses with outdated websites that fail to reflect their quality and market authority.",
    ctaText: "Start a conversation",
    icon: "Globe",
  },
  {
    id: "growth-infrastructure",
    title: "Growth Infrastructure",
    description:
      "Build resilient digital and operational infrastructure designed to support 10x customer volume without compromising quality or increasing team headcount proportionally.",
    businessValue:
      "Sustainable scale requires structured architecture. We install the systems, processes, and tech foundation that enable compound expansion.",
    services: [
      "Long-term growth architecture",
      "Technical infrastructure scaling",
      "Cross-team workflow optimization",
      "Commercial technology roadmaps",
      "Ongoing technical advisory",
    ],
    idealFor: "High-growth businesses scaling revenue rapidly that need robust systems to support client demand.",
    ctaText: "Start a conversation",
    icon: "TrendingUp",
  },
];

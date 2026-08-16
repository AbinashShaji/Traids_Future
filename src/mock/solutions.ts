// Solutions mock data reflecting outcome-focused services per Design System v2.

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
    id: "grow-your-presence",
    title: "Grow Your Presence",
    description:
      "Build visibility that compounds — not campaigns that stop the moment the budget does. We build fast, credible digital homes that convert visitors into qualified enquiries.",
    businessValue:
      "A strong digital presence builds authority before anyone speaks to you. Clients see your depth, understand your commercial value, and arrive ready to engage.",
    services: [
      "Website design & engineering",
      "Brand identity systems",
      "SEO & technical foundations",
      "Performance & speed optimization",
      "Mobile-first responsive architecture",
    ],
    idealFor: "Established businesses with outdated websites that fail to reflect their quality and market authority.",
    ctaText: "Explore Presence Solutions",
    icon: "Globe",
  },
  {
    id: "build-better-digital-experiences",
    title: "Build Better Digital Experiences",
    description:
      "Websites and applications built as business tools first, design objects second. We design and engineer web apps, client portals, and bespoke tools that eliminate operational friction.",
    businessValue:
      "Custom software shaped around your exact business workflows removes bottlenecks, saves team hours every week, and scales seamlessly with revenue growth.",
    services: [
      "Web application engineering",
      "Client & partner portal design",
      "Internal operations tools",
      "Custom API integrations",
      "Product architecture & roadmapping",
    ],
    idealFor: "Businesses outgrowing off-the-shelf SaaS and needing custom systems tailored to their operational workflows.",
    ctaText: "Explore Digital Experiences",
    icon: "Monitor",
  },
  {
    id: "strengthen-your-brand",
    title: "Strengthen Your Brand",
    description:
      "Positioning and visual identity that make the next ten decisions easier, not just the launch. We clarify your market position and communicate why you are the obvious choice.",
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
    ctaText: "Explore Brand Strategy",
    icon: "Layers",
  },
  {
    id: "automate-business-processes",
    title: "Automate Business Processes",
    description:
      "Systematize repetitive operations and data handoffs so your senior team spends time on high-leverage growth, not administrative friction.",
    businessValue:
      "Intelligent automation eliminates manual data entry errors, shortens delivery turnaround times, and lowers operating overhead across departments.",
    services: [
      "End-to-end process mapping",
      "Workflow & CRM automation",
      "Data ingestion pipelines",
      "Custom analytics & reporting dashboards",
      "Legacy software modernization",
    ],
    idealFor: "Teams bogged down by repetitive manual workflows that bottleneck scale.",
    ctaText: "Explore Process Automation",
    icon: "Zap",
  },
  {
    id: "scale-your-business",
    title: "Scale Your Business",
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
    ctaText: "Explore Scaling Systems",
    icon: "TrendingUp",
  },
];

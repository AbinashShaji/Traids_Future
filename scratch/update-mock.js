const fs = require('fs');
const path = require('path');

const projectsPath = path.join(__dirname, '../src/mock/projects.ts');
let content = fs.readFileSync(projectsPath, 'utf8');

// Use a simple regex replacement to insert the new fields based on existing ones
// For proj-001
content = content.replace(
  'client: "Meridian Financial",\n    industry: "Financial Services",',
  'client: "Meridian Financial",\n    clientName: "Meridian Financial",\n    industry: "Financial Services",'
);
content = content.replace(
  'tags: ["Web Application", "Financial Services", "Automation"],',
  `galleryImages: [\n      { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80", alt: "Platform Interface" },\n      { url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80", alt: "Mobile View" }\n    ],\n    narrativeSections: [\n      { title: "The Challenge", body: "Meridian\'s advisors were spending 40% of their time on administrative tasks..." },\n      { title: "The Strategy", body: "We began by mapping every touchpoint in the client journey..." },\n      { title: "The Technical Solution", body: "We built a custom client portal with document signing..." }\n    ],\n    tags: ["Web Application", "Financial Services", "Automation"],\n    published: true,`
);

// For proj-002
content = content.replace(
  'client: "Grove Collective",\n    industry: "Professional Services",',
  'client: "Grove Collective",\n    clientName: "Grove Collective",\n    industry: "Professional Services",'
);
content = content.replace(
  'tags: ["Brand Identity", "Website", "Professional Services"],',
  `galleryImages: [\n      { url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80", alt: "Brand Assets" },\n      { url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80", alt: "Website Homepage" }\n    ],\n    narrativeSections: [\n      { title: "The Challenge", body: "Despite delivering outstanding results, Grove had no brand presence..." },\n      { title: "The Strategy", body: "We conducted stakeholder interviews to uncover what made Grove genuinely different..." },\n      { title: "The Technical Solution", body: "We delivered a complete brand identity including naming rationale..." }\n    ],\n    tags: ["Brand Identity", "Website", "Professional Services"],\n    published: true,`
);

// For proj-003
content = content.replace(
  'client: "Summit Logistics",\n    industry: "Logistics",',
  'client: "Summit Logistics",\n    clientName: "Summit Logistics",\n    industry: "Logistics",'
);
content = content.replace(
  'tags: ["Automation", "Logistics", "Operations"],',
  `galleryImages: [\n      { url: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&q=80", alt: "Dashboard Interface" }\n    ],\n    narrativeSections: [\n      { title: "The Challenge", body: "Summit had grown from 12 to 80 employees in three years. Their manual processes hadn\'t scaled..." },\n      { title: "The Strategy", body: "We spent two weeks embedded with the operations team..." },\n      { title: "The Technical Solution", body: "We integrated their existing tools into a single operations dashboard..." }\n    ],\n    tags: ["Automation", "Logistics", "Operations"],\n    published: true,`
);

fs.writeFileSync(projectsPath, content);
console.log("Updated projects.ts");


const testimonialsPath = path.join(__dirname, '../src/mock/testimonials.ts');
let tContent = fs.readFileSync(testimonialsPath, 'utf8');

// Update interface
tContent = tContent.replace(
  'clientRole: string;',
  'clientRole: string;\n  designation: string;'
);

// Update data
tContent = tContent.replace(/clientRole:\n?/g, 'designation: ');
tContent = tContent.replace(/designation: "Managing Director",/g, 'clientRole: "Managing Director",\n    designation: "Managing Director",');
tContent = tContent.replace(/designation: "Founder & CEO",/g, 'clientRole: "Founder & CEO",\n    designation: "Founder & CEO",');
tContent = tContent.replace(/designation: "Operations Director",/g, 'clientRole: "Operations Director",\n    designation: "Operations Director",');

fs.writeFileSync(testimonialsPath, tContent);
console.log("Updated testimonials.ts");

const fs = require('fs');
const path = require('path');

const filesToProcess = [
  {
    path: '../src/components/testimonial-slider.tsx',
    replacements: [{
      from: 'import { type Testimonial } from "@prisma/client";',
      to: 'import { type Testimonial } from "@/mock/testimonials";'
    }]
  },
  {
    path: '../src/components/faq-item.tsx',
    replacements: [{
      from: 'import { type FAQ } from "@prisma/client";',
      to: 'import { type FAQ } from "@/mock/faq";'
    }]
  },
  {
    path: '../src/components/editorial-testimonial.tsx',
    replacements: [{
      from: 'import { type Testimonial } from "@prisma/client"',
      to: 'import { type Testimonial } from "@/mock/testimonials"'
    }]
  },
  {
    path: '../src/app/work/work-page-content.tsx',
    replacements: [{
      from: 'import { type Project } from "@prisma/client";',
      to: 'import { type Project } from "@/mock/projects";'
    }]
  },
  {
    path: '../src/app/home-page-content.tsx',
    replacements: [{
      from: 'import { type Project, type Testimonial, type BlogPost } from "@prisma/client";',
      to: 'import { type Project } from "@/mock/projects";\nimport { type Testimonial } from "@/mock/testimonials";\nimport { type Article as BlogPost } from "@/mock/articles";'
    }]
  },
  {
    path: '../src/app/insights/insights-page-content.tsx',
    replacements: [{
      from: 'import { type BlogPost } from "@prisma/client";',
      to: 'import { type Article as BlogPost } from "@/mock/articles";'
    }]
  },
  {
    path: '../src/app/contact/contact-page-content.tsx',
    replacements: [{
      from: 'import { type FAQ } from "@prisma/client";',
      to: 'import { type FAQ } from "@/mock/faq";'
    }]
  },
  {
    path: '../src/app/about/about-page-content.tsx',
    replacements: [{
      from: 'import { type FAQ } from "@prisma/client";',
      to: 'import { type FAQ } from "@/mock/faq";'
    }]
  }
];

filesToProcess.forEach(fileInfo => {
  const fullPath = path.join(__dirname, fileInfo.path);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    fileInfo.replacements.forEach(rep => {
      content = content.replace(rep.from, rep.to);
    });
    fs.writeFileSync(fullPath, content);
    console.log(`Updated ${fileInfo.path}`);
  } else {
    console.warn(`File not found: ${fullPath}`);
  }
});

const fs = require('fs');
let content = fs.readFileSync('src/mock/articles.ts', 'utf8');

content = content.replace(/coverImage: (.*),/g, 'coverImage: $1,\n    featuredImage: $1,\n    published: true,');
content = content.replace('coverImage: string;', 'coverImage: string;\n  featuredImage: string;\n  published: boolean;');

fs.writeFileSync('src/mock/articles.ts', content);

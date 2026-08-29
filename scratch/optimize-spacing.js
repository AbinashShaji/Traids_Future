const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../src');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

const replacements = [
  { from: /py-20 md:py-28/g, to: 'py-12 md:py-24 lg:py-28' },
  { from: /pt-24 pb-16 md:pt-28 md:pb-20/g, to: 'pt-16 pb-12 md:pt-28 md:pb-20' },
  { from: /pt-28 pb-10 md:pt-36 md:pb-12/g, to: 'pt-20 pb-8 md:pt-36 md:pb-12' },
  { from: /gap-12 lg:gap-16/g, to: 'gap-8 md:gap-12 lg:gap-16' },
  { from: /py-20(?!\s*md:)/g, to: 'py-12 md:py-20' }, // py-20 not followed by md:
  { from: /gap-12(?!\s*lg:)/g, to: 'gap-8 md:gap-12' }, // gap-12 not followed by lg:
  { from: /pt-32 pb-16/g, to: 'pt-24 pb-12 md:pt-32 md:pb-16' },
  { from: /pt-28 pb-20 md:pt-36 md:pb-28/g, to: 'pt-20 pb-12 md:pt-36 md:pb-28' },
  { from: /min-h-\[70vh\]/g, to: 'min-h-[50vh] md:min-h-[70vh]' },
  { from: /min-h-\[80vh\]/g, to: 'min-h-[60vh] md:min-h-[80vh]' }
];

let filesModified = 0;

walk(directoryPath, function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    replacements.forEach(rule => {
      content = content.replace(rule.from, rule.to);
    });

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
      filesModified++;
    }
  }
});

console.log(`Finished updating ${filesModified} files.`);

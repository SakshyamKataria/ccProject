const fs = require('fs');
const path = require('path');

const walk = (d) => {
  fs.readdirSync(d).forEach(f => {
    const full = path.join(d, f);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (full.endsWith('.jsx') || full.endsWith('.js')) {
      let content = fs.readFileSync(full, 'utf8');
      if (content.includes('http://localhost:5000')) {
         content = content.replace(/http:\/\/localhost:5000/g, '');
         fs.writeFileSync(full, content);
         console.log('Fixed', full);
      }
    }
  });
};

walk('src');
console.log('Done replacing URLs');

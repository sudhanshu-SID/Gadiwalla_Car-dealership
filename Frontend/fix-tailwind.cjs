const fs = require('fs');
let content = fs.readFileSync('tailwind.config.js', 'utf8');
content = content.replace(/colors:\s*\{([^}]*)\}/, (match, colorsStr) => {
  const newColorsStr = colorsStr.replace(/\"([a-z0-9_]+)\":/g, (m, key) => {
    return '\"' + key.replace(/_/g, '-') + '\":';
  });
  return 'colors: {' + newColorsStr + '}';
});
fs.writeFileSync('tailwind.config.js', content);
console.log('Fixed tailwind.config.js');

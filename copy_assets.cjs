const fs = require('fs');
const path = require('path');

function copyNonTs(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyNonTs(srcPath, destPath);
    } else {
      if (!entry.name.endsWith('.ts') && !entry.name.endsWith('.tsx')) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

copyNonTs(path.join(__dirname, 'src'), path.join(__dirname, 'src_js'));
console.log("Done copying non-ts files.");

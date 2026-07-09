const fs = require('fs');
let css = fs.readFileSync('src/styles/styles.css', 'utf8');

css = css.replace(
  /.milestone-complete-overlay \{\r?\n  position: fixed;\r?\n  top: 0;\r?\n  left: 0;\r?\n  width: 100vw;\r?\n  height: 100vh;\r?\n  background: #121212;\r?\n  color: white;/g,
  `.milestone-complete-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #f7fbff;
  color: #18202f;`
);

css = css.replace(
  /.milestone-mascot \{\r?\n  width: 200px;\r?\n  height: 200px;\r?\n  margin-bottom: 2rem;/g,
  `.milestone-mascot {
  width: 200px;
  height: 200px;
  margin-bottom: 2rem;
  mix-blend-mode: multiply;`
);

fs.writeFileSync('src/styles/styles.css', css, 'utf8');
console.log('styles.css updated');

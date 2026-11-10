const { execSync } = require('child_process');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
try {
  const out = execSync(`"${edge}" --headless --disable-gpu --dump-dom http://localhost:4173/pj3/`, { encoding: 'utf-8', timeout: 10000 });
  const rootIndex = out.indexOf('<div id="root">');
  console.log('Root content:', out.slice(rootIndex, rootIndex + 2000));
} catch (e) {
  console.error('Error:', e.message);
}

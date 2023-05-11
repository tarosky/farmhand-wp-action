import process from 'process';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['NODE_OPTIONS'] = '--experimental-vm-modules'
  const result = execSync('node index.js', {env: process.env});
  console.log(result.toString());
})

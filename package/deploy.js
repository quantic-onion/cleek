import { execSync } from 'child_process';

const args = process.argv.slice(2);
const versionType = args[0] || '--patch';

if (!['--patch', '--minor', '--major'].includes(versionType)) {
  console.error(`Invalid version type: ${versionType}`);
  process.exit(1);
}

try {
  execSync('bun run build', { stdio: 'inherit' });
  execSync(`bun version ${versionType}`, { stdio: 'inherit' });
  execSync('bun publish --non-interactive', { stdio: 'inherit' });
} catch (error) {
  console.error('Error during release process:', error);
  process.exit(1);
}

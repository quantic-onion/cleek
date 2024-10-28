import { execSync } from 'child_process';

const args = process.argv.slice(2);
const versionType = args[0] || '--patch';

if (!['--patch', '--minor', '--major'].includes(versionType)) {
  console.error(`Invalid version type: ${versionType}`);
  process.exit(1);
}

try {
  execSync('yarn build', { stdio: 'inherit' });
  execSync(`yarn version ${versionType}`, { stdio: 'inherit' });
  execSync('yarn publish --non-interactive', { stdio: 'inherit' });
} catch (error) {
  console.error('Error during release process:', error);
  process.exit(1);
}

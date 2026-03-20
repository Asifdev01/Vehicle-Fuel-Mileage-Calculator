const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const appJsonPath = path.join(__dirname, '..', 'app.json');
const packageJsonPath = path.join(__dirname, '..', 'package.json');

function incrementVersion(version) {
  const parts = version.split('.');
  if (parts.length !== 3) return version;
  parts[2] = parseInt(parts[2], 10) + 1;
  return parts.join('.');
}

try {
  // Update app.json
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
  const oldVersion = appJson.expo.version;
  const newVersion = incrementVersion(oldVersion);
  
  appJson.expo.version = newVersion;
  
  if (appJson.expo.android) {
    appJson.expo.android.versionCode = (appJson.expo.android.versionCode || 0) + 1;
  }
  
  if (appJson.expo.ios) {
    const buildNumber = parseInt(appJson.expo.ios.buildNumber || '0', 10) + 1;
    appJson.expo.ios.buildNumber = buildNumber.toString();
  }
  
  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + '\n');
  console.log(`Updated app.json: ${oldVersion} -> ${newVersion}`);

  // Update package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.version = newVersion;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log(`Updated package.json: ${oldVersion} -> ${newVersion}`);

  // Stage changes
  execSync('git add app.json package.json');
  console.log('Staged version changes.');

} catch (error) {
  console.error('Error incrementing version:', error.message);
  process.exit(1);
}

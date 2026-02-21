// Simple script to validate your .env.local file
// Run with: node validate-env.js

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating .env.local file...\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found!');
  console.log('   Create it by copying .env.example\n');
  process.exit(1);
}

// Read the file
const envContent = fs.readFileSync(envPath, 'utf8');
const lines = envContent.split('\n');

// Parse environment variables
const env = {};
lines.forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    const value = valueParts.join('=');
    env[key] = value;
  }
});

console.log('📋 Checking required variables:\n');

// Check client config
const clientVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
  'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'
];

let allGood = true;

clientVars.forEach(varName => {
  if (env[varName] && env[varName].length > 0) {
    console.log(`✅ ${varName}`);
  } else {
    console.log(`❌ ${varName} - Missing or empty`);
    allGood = false;
  }
});

console.log('\n📋 Checking admin config:\n');

// Check admin config
if (env.FIREBASE_PROJECT_ID && env.FIREBASE_PROJECT_ID !== 'fleetflow-5c1c7') {
  console.log(`⚠️  FIREBASE_PROJECT_ID - Should be "fleetflow-5c1c7"`);
  allGood = false;
} else if (env.FIREBASE_PROJECT_ID) {
  console.log(`✅ FIREBASE_PROJECT_ID`);
} else {
  console.log(`❌ FIREBASE_PROJECT_ID - Missing`);
  allGood = false;
}

// Check client email
if (env.FIREBASE_CLIENT_EMAIL) {
  if (env.FIREBASE_CLIENT_EMAIL.includes('YOUR_FIREBASE_ADMIN_EMAIL_HERE')) {
    console.log(`❌ FIREBASE_CLIENT_EMAIL - Still has placeholder value`);
    console.log(`   Replace with your actual Firebase Admin email`);
    allGood = false;
  } else if (env.FIREBASE_CLIENT_EMAIL.includes('@fleetflow-5c1c7.iam.gserviceaccount.com')) {
    console.log(`✅ FIREBASE_CLIENT_EMAIL`);
  } else {
    console.log(`⚠️  FIREBASE_CLIENT_EMAIL - Format looks unusual`);
    console.log(`   Should end with @fleetflow-5c1c7.iam.gserviceaccount.com`);
  }
} else {
  console.log(`❌ FIREBASE_CLIENT_EMAIL - Missing`);
  allGood = false;
}

// Check private key
if (env.FIREBASE_PRIVATE_KEY) {
  const key = env.FIREBASE_PRIVATE_KEY;
  
  if (key.includes('YOUR_FIREBASE_PRIVATE_KEY_HERE')) {
    console.log(`❌ FIREBASE_PRIVATE_KEY - Still has placeholder value`);
    console.log(`   Replace with your actual private key from Firebase`);
    allGood = false;
  } else if (!key.includes('BEGIN PRIVATE KEY')) {
    console.log(`❌ FIREBASE_PRIVATE_KEY - Missing "BEGIN PRIVATE KEY"`);
    console.log(`   Key should start with "-----BEGIN PRIVATE KEY-----\\n`);
    allGood = false;
  } else if (!key.includes('END PRIVATE KEY')) {
    console.log(`❌ FIREBASE_PRIVATE_KEY - Missing "END PRIVATE KEY"`);
    console.log(`   Key should end with \\n-----END PRIVATE KEY-----\\n"`);
    allGood = false;
  } else if (!key.startsWith('"') || !key.endsWith('"')) {
    console.log(`❌ FIREBASE_PRIVATE_KEY - Missing quotes`);
    console.log(`   Key should be wrapped in double quotes`);
    allGood = false;
  } else if (!key.includes('\\n')) {
    console.log(`❌ FIREBASE_PRIVATE_KEY - Missing \\n characters`);
    console.log(`   Key should have \\n for line breaks (not actual line breaks)`);
    allGood = false;
  } else {
    console.log(`✅ FIREBASE_PRIVATE_KEY - Format looks good!`);
  }
} else {
  console.log(`❌ FIREBASE_PRIVATE_KEY - Missing`);
  allGood = false;
}

console.log('\n' + '='.repeat(60) + '\n');

if (allGood) {
  console.log('🎉 All environment variables are configured correctly!');
  console.log('   You can now run: npm run dev\n');
} else {
  console.log('⚠️  Some environment variables need attention.');
  console.log('   Please fix the issues above and run this script again.\n');
  console.log('📚 For help, see:');
  console.log('   - 🔥_FIREBASE_SETUP.md');
  console.log('   - 🔧_PRIVATE_KEY_FIX.md');
  console.log('   - SETUP_INSTRUCTIONS.md\n');
}

// Comprehensive validation script for Firebase migration
const fs = require('fs');
const path = require('path');

console.log('🔍 Running Comprehensive Validation...\n');

let allPassed = true;
const errors = [];
const warnings = [];

// 1. Check environment variables
console.log('📋 Checking Environment Variables...');
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  errors.push('.env.local file not found');
  allPassed = false;
} else {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const requiredVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY'
  ];
  
  requiredVars.forEach(varName => {
    if (!envContent.includes(varName) || envContent.includes(`${varName}=YOUR_`)) {
      errors.push(`${varName} not configured`);
      allPassed = false;
    }
  });
  
  if (allPassed) {
    console.log('✅ All environment variables configured\n');
  }
}

// 2. Check for MongoDB references
console.log('📋 Checking for MongoDB References...');
const checkForMongoReferences = (dir) => {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next')) {
        checkForMongoReferences(filePath);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      if (content.includes('mongoose') || content.includes('connectDB') || content.includes('@/lib/models')) {
        errors.push(`MongoDB reference found in: ${filePath}`);
        allPassed = false;
      }
    }
  });
};

checkForMongoReferences(path.join(__dirname, 'src'));
if (allPassed) {
  console.log('✅ No MongoDB references found\n');
}

// 3. Check required files exist
console.log('📋 Checking Required Files...');
const requiredFiles = [
  'src/lib/firebase.ts',
  'src/lib/firebaseAdmin.ts',
  'src/lib/types/firestore.ts',
  'src/hooks/useAuth.ts',
  'src/components/auth/GoogleSignInButton.tsx',
  'src/app/api/auth/login/route.ts',
  'src/app/api/auth/register/route.ts',
  'src/app/api/auth/verify/route.ts',
  'src/app/api/drivers/route.ts',
  'src/app/api/vehicles/route.ts',
  'src/app/api/trips/route.ts',
  'src/app/api/expenses/route.ts',
  'src/app/api/analytics/route.ts',
  'src/proxy.ts'
];

requiredFiles.forEach(file => {
  if (!fs.existsSync(path.join(__dirname, file))) {
    errors.push(`Required file missing: ${file}`);
    allPassed = false;
  }
});

if (allPassed) {
  console.log('✅ All required files present\n');
}

// 4. Check API routes use Firestore
console.log('📋 Checking API Routes...');
const apiRoutes = [
  'src/app/api/drivers/route.ts',
  'src/app/api/vehicles/route.ts',
  'src/app/api/trips/route.ts',
  'src/app/api/expenses/route.ts',
  'src/app/api/analytics/route.ts'
];

apiRoutes.forEach(route => {
  const routePath = path.join(__dirname, route);
  if (fs.existsSync(routePath)) {
    const content = fs.readFileSync(routePath, 'utf8');
    if (!content.includes('adminDb') && !content.includes('firebaseAdmin')) {
      warnings.push(`${route} may not be using Firestore`);
    }
  }
});

if (warnings.length === 0) {
  console.log('✅ All API routes using Firestore\n');
}

// 5. Check deleted files
console.log('📋 Checking Deleted Files...');
const shouldBeDeleted = [
  'src/lib/connectDB.ts',
  'src/lib/auth.ts',
  'src/lib/models/User.schema.ts',
  'src/lib/models/Driver.schema.ts',
  'src/lib/models/Vehicle.schema.ts',
  'src/lib/models/Trip.schema.ts',
  'src/lib/models/Expense.schema.ts',
  'src/middleware.ts'
];

shouldBeDeleted.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    warnings.push(`Old file still exists: ${file}`);
  }
});

if (warnings.length === 0) {
  console.log('✅ All old files removed\n');
}

// 6. Check package.json
console.log('📋 Checking Dependencies...');
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

if (deps.mongoose) {
  warnings.push('mongoose still in package.json (run: npm uninstall mongoose)');
}
if (deps.bcryptjs) {
  warnings.push('bcryptjs still in package.json (run: npm uninstall bcryptjs)');
}
if (!deps.firebase) {
  errors.push('firebase not in package.json (run: npm install firebase)');
  allPassed = false;
}
if (!deps['firebase-admin']) {
  errors.push('firebase-admin not in package.json (run: npm install firebase-admin)');
  allPassed = false;
}

if (allPassed && warnings.length === 0) {
  console.log('✅ Dependencies correct\n');
}

// Print results
console.log('='.repeat(60));
console.log('\n📊 VALIDATION RESULTS\n');

if (errors.length > 0) {
  console.log('❌ ERRORS FOUND:\n');
  errors.forEach(error => console.log(`   - ${error}`));
  console.log('');
}

if (warnings.length > 0) {
  console.log('⚠️  WARNINGS:\n');
  warnings.forEach(warning => console.log(`   - ${warning}`));
  console.log('');
}

if (allPassed && errors.length === 0) {
  console.log('🎉 ALL CHECKS PASSED!\n');
  console.log('Your application is fully migrated to Firebase!');
  console.log('\nNext steps:');
  console.log('1. Run: npm run dev');
  console.log('2. Visit: http://localhost:3000/login');
  console.log('3. Sign in with Google');
  console.log('4. Test all features\n');
} else {
  console.log('❌ VALIDATION FAILED\n');
  console.log('Please fix the errors above before proceeding.\n');
  process.exit(1);
}

console.log('='.repeat(60));

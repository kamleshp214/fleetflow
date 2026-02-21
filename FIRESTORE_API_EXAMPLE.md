# Firestore API Route Examples

This document shows how to convert your existing MongoDB/Mongoose API routes to use Firestore.

## Example: Drivers Route

### Before (MongoDB/Mongoose)

```typescript
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import Driver from "@/lib/models/Driver.schema";

export async function GET(req: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");

        const query = status ? { status } : {};
        const drivers = await Driver.find(query).sort({ createdAt: -1 });
        
        return NextResponse.json(drivers);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch drivers" }, 
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const driver = await Driver.create(body);
        return NextResponse.json(driver, { status: 201 });
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json(
                { error: "License number already exists" }, 
                { status: 409 }
            );
        }
        return NextResponse.json(
            { error: "Failed to create driver" }, 
            { status: 500 }
        );
    }
}
```

### After (Firestore)

```typescript
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");

        let query = adminDb.collection('drivers').orderBy('createdAt', 'desc');
        
        if (status) {
            query = query.where('status', '==', status) as any;
        }

        const snapshot = await query.get();
        const drivers = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        return NextResponse.json(drivers);
    } catch (error) {
        console.error('Error fetching drivers:', error);
        return NextResponse.json(
            { error: "Failed to fetch drivers" }, 
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // Check for duplicate license number
        const existingDriver = await adminDb
            .collection('drivers')
            .where('licenseNumber', '==', body.licenseNumber)
            .limit(1)
            .get();

        if (!existingDriver.empty) {
            return NextResponse.json(
                { error: "License number already exists" }, 
                { status: 409 }
            );
        }

        // Create new driver
        const docRef = adminDb.collection('drivers').doc();
        const driverData = {
            ...body,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        
        await docRef.set(driverData);
        
        return NextResponse.json(
            { id: docRef.id, ...driverData }, 
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating driver:', error);
        return NextResponse.json(
            { error: "Failed to create driver" }, 
            { status: 500 }
        );
    }
}
```

## Key Differences

### 1. No Connection Required
- MongoDB: `await connectDB()` before every operation
- Firestore: Connection is managed automatically

### 2. Querying
```typescript
// MongoDB
const drivers = await Driver.find({ status: 'Available' });

// Firestore
const snapshot = await adminDb
    .collection('drivers')
    .where('status', '==', 'Available')
    .get();
const drivers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
```

### 3. Creating Documents
```typescript
// MongoDB
const driver = await Driver.create(data);

// Firestore
const docRef = adminDb.collection('drivers').doc();
await docRef.set(data);
const driver = { id: docRef.id, ...data };
```

### 4. Updating Documents
```typescript
// MongoDB
await Driver.findByIdAndUpdate(id, { status: 'On Trip' });

// Firestore
await adminDb.collection('drivers').doc(id).update({ 
    status: 'On Trip',
    updatedAt: new Date()
});
```

### 5. Deleting Documents
```typescript
// MongoDB
await Driver.findByIdAndDelete(id);

// Firestore
await adminDb.collection('drivers').doc(id).delete();
```

### 6. Finding by ID
```typescript
// MongoDB
const driver = await Driver.findById(id);

// Firestore
const doc = await adminDb.collection('drivers').doc(id).get();
const driver = doc.exists ? { id: doc.id, ...doc.data() } : null;
```

## Common Firestore Query Patterns

### Filtering
```typescript
// Single condition
const query = adminDb.collection('trips').where('status', '==', 'Completed');

// Multiple conditions (requires composite index)
const query = adminDb.collection('trips')
    .where('status', '==', 'Completed')
    .where('driverId', '==', driverId);
```

### Sorting
```typescript
const query = adminDb.collection('drivers').orderBy('createdAt', 'desc');
```

### Limiting
```typescript
const query = adminDb.collection('drivers').limit(10);
```

### Pagination
```typescript
// First page
const firstPage = await adminDb.collection('drivers')
    .orderBy('createdAt')
    .limit(10)
    .get();

// Next page
const lastDoc = firstPage.docs[firstPage.docs.length - 1];
const nextPage = await adminDb.collection('drivers')
    .orderBy('createdAt')
    .startAfter(lastDoc)
    .limit(10)
    .get();
```

### Aggregation
```typescript
// Count documents
const snapshot = await adminDb.collection('drivers').count().get();
const count = snapshot.data().count;

// For complex aggregations, fetch and process in code
const snapshot = await adminDb.collection('expenses').get();
const total = snapshot.docs.reduce((sum, doc) => sum + doc.data().amount, 0);
```

## Routes to Update

1. `/api/drivers/route.ts` ✓ (example above)
2. `/api/vehicles/route.ts` - Similar pattern
3. `/api/trips/route.ts` - Handle references to drivers/vehicles
4. `/api/trips/[id]/route.ts` - GET/PUT/DELETE by ID
5. `/api/expenses/route.ts` - Similar pattern
6. `/api/analytics/route.ts` - Aggregate queries

## Important Notes

1. **Indexes**: Complex queries may require composite indexes. Firebase will tell you the exact index URL to create.

2. **Timestamps**: Always include `createdAt` and `updatedAt` fields:
```typescript
{
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
}
```

3. **References**: Instead of MongoDB ObjectIds, use document IDs as strings:
```typescript
// MongoDB
vehicleId: new ObjectId('...')

// Firestore
vehicleId: 'abc123' // Just a string
```

4. **Transactions**: For operations that need atomicity:
```typescript
await adminDb.runTransaction(async (transaction) => {
    const driverRef = adminDb.collection('drivers').doc(driverId);
    const tripRef = adminDb.collection('trips').doc(tripId);
    
    transaction.update(driverRef, { status: 'On Trip' });
    transaction.update(tripRef, { status: 'Dispatched' });
});
```

5. **Batch Writes**: For multiple independent writes:
```typescript
const batch = adminDb.batch();

drivers.forEach(driver => {
    const ref = adminDb.collection('drivers').doc();
    batch.set(ref, driver);
});

await batch.commit();
```

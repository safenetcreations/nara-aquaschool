# Firebase Security Rules Setup Guide

## Issue: Upload Permission Errors

You're seeing this error:
```
Firebase Storage: User does not have permission to access 'marine-species/...' (storage/unauthorized)
```

This happens because Firebase Storage security rules are blocking authenticated uploads.

## Solution: Update Firebase Security Rules

You need to configure **TWO sets of rules**:
1. Firebase Storage Rules (for image files)
2. Firestore Security Rules (for image metadata)

---

## 1. Firebase Storage Rules

### Steps:
1. Go to **Firebase Console**: https://console.firebase.google.com
2. Select your project
3. Click **Storage** in left menu
4. Click **Rules** tab at top
5. Replace with these rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Marine species images - allow authenticated users to upload
    match /marine-species/{fileName} {
      allow read: if true;  // Anyone can view images
      allow write: if request.auth != null;  // Only logged-in users can upload
    }

    // Default: allow all reads
    match /{allPaths=**} {
      allow read: if true;
    }
  }
}
```

6. Click **Publish**
7. Wait 10-20 seconds for rules to propagate

---

## 2. Firestore Security Rules

### Steps:
1. Still in Firebase Console
2. Click **Firestore Database** in left menu
3. Click **Rules** tab
4. Add/update with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users collection - users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Species Images Collection - for storing image metadata
    match /species-images/{imageId} {
      allow read: if true;  // Anyone can view image metadata
      allow write: if request.auth != null;  // Only authenticated users can add images
    }

    // Default: deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

5. Click **Publish**
6. Wait 10-20 seconds

---

## Testing the Fix

### After updating both rules:

1. **Clear your browser cache** (or open incognito window)
2. **Make sure you're logged in** to the NARA app
3. Go to **Admin Panel** → **Image Generator**
4. Select a species (e.g., "Blue Whale")
5. Click **"Generate Images"**
6. Click the **cloud upload icon** or **"Upload All to Firebase"**
7. You should see:
   - ✅ "Uploading to Firebase..." (loading)
   - ✅ "Image uploaded & linked to species!" (success)
   - ✅ Green "✓ Uploaded" badge appears

### Troubleshooting

**If still getting errors:**

1. **Check Authentication:**
   - Make sure you're logged in
   - Open browser console (F12)
   - Type: `firebase.auth().currentUser`
   - Should show user object (not null)

2. **Check Rules Propagation:**
   - Wait 1-2 minutes after publishing
   - Refresh the page
   - Try again

3. **Check Console Logs:**
   - Open browser console (F12)
   - Look for detailed error messages
   - Should show upload progress logs

4. **Verify Firebase Config:**
   - Check that `.env` file has correct Firebase config
   - Restart dev server after changing `.env`

---

## Security Notes

### Current Rules Security Level:

✅ **Storage Rules:**
- **Read**: Public (anyone can view images)
- **Write**: Authenticated only (must be logged in)

✅ **Firestore Rules:**
- **Read**: Public for species-images
- **Write**: Authenticated only for species-images
- **User Data**: Private (each user can only access their own data)

### Production Recommendations:

For production, consider tightening rules:

```javascript
// More restrictive Storage rules
match /marine-species/{fileName} {
  allow read: if true;
  allow write: if request.auth != null
    && request.auth.token.admin == true;  // Only admin users
}

// More restrictive Firestore rules
match /species-images/{imageId} {
  allow read: if true;
  allow write: if request.auth != null
    && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
  allow delete: if request.auth != null
    && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
```

---

## Quick Reference

### Firebase Storage Rules Path:
```
Firebase Console → Storage → Rules
```

### Firestore Rules Path:
```
Firebase Console → Firestore Database → Rules
```

### Rule Format:
```javascript
allow read: if true;                    // Anyone
allow write: if request.auth != null;   // Authenticated users only
allow write: if request.auth.uid == userId;  // Owner only
```

---

## After Setup Complete

Once both rules are published and working:

1. ✅ Images upload to Firebase Storage successfully
2. ✅ Image URLs save to Firestore automatically
3. ✅ Images display on Marine Life pages
4. ✅ CDN delivery for fast loading worldwide

---

**Status**: Rules must be configured in Firebase Console
**Priority**: HIGH - Required for image upload to work
**Estimated Time**: 2-3 minutes

**Next Steps After Rules Update:**
1. Test image upload in Admin Panel
2. Verify images display on Marine Life page
3. Check browser console for any remaining errors

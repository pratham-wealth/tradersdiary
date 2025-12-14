# Supabase Storage Setup

## 1. Create Storage Bucket

1. Open Supabase Dashboard
2. Go to **Storage** in sidebar
3. Click **New bucket**
4. Bucket name: `tradenote-images`
5. **Make bucket PUBLIC** (check the box)
6. Click **Create bucket**

## 2. Set Up Storage Policies

Go to **Storage** → **Policies** → `tradenote-images` bucket

### Policy 1: Allow authenticated users to upload

```sql
CREATE POLICY "Users can upload their own images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'tradenote-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

### Policy 2: Allow public read access

```sql
CREATE POLICY "Public read access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'tradenote-images');
```

### Policy 3: Allow users to delete their own images

```sql
CREATE POLICY "Users can delete their own images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'tradenote-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

## 3. Test Upload

After setup:

1. Go to Studies page
2. Create new study
3. Upload an image
4. Image should appear in grid
5. Check Supabase Storage dashboard - file should be there

## File Structure in Bucket

```
tradenote-images/
├── {user-id}/
│   ├── {timestamp}-{random}.jpg
│   ├── {timestamp}-{random}.png
│   └── ...
```

## Size Limits

- **Per file:** 5MB max
- **Per study/trade:** 5 images max
- **Total storage:**
  - Basic Plan: 50MB
  - Pro Plan: 500MB

## Supported Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)
- GIF (.gif)

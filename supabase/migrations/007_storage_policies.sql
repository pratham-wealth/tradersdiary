-- Migration: 007 - Storage Policies for TradeNote Images
-- Policy 1: Allow Authenticated Users to Upload Images
-- Users can only upload to a folder matching their User ID
CREATE POLICY "Users can upload study images" ON storage.objects FOR
INSERT TO authenticated WITH CHECK (
        bucket_id = 'tradenote-images'
        AND (storage.foldername(name)) [1] = auth.uid()::text
    );
-- Policy 2: Allow Public Access to Images
-- Since these are used in shared studies/etc, they should be publicly readable.
CREATE POLICY "Public can view study images" ON storage.objects FOR
SELECT TO public USING (bucket_id = 'tradenote-images');
-- Policy 3: Allow Users to Update/Delete their own images
CREATE POLICY "Users can manage own study images" ON storage.objects FOR DELETE TO authenticated USING (
    bucket_id = 'tradenote-images'
    AND (storage.foldername(name)) [1] = auth.uid()::text
);
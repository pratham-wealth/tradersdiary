-- Add phone column to user_settings table
ALTER TABLE user_settings
ADD COLUMN IF NOT EXISTS phone TEXT;
-- Create index for faster phone lookups (optional but recommended)
CREATE INDEX IF NOT EXISTS idx_user_settings_phone ON user_settings(phone);
-- Add comment for documentation
COMMENT ON COLUMN user_settings.phone IS 'User phone number in international format (e.g., +1234567890)';
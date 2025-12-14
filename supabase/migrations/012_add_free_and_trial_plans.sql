ALTER TABLE user_settings DROP CONSTRAINT IF EXISTS user_settings_plan_type_check;
ALTER TABLE user_settings
ADD CONSTRAINT user_settings_plan_type_check CHECK (
        plan_type IN ('free', 'basic', 'pro', 'premium', 'trial')
    );
ALTER TABLE payments DROP CONSTRAINT IF EXISTS payments_plan_type_check;
ALTER TABLE payments
ADD CONSTRAINT payments_plan_type_check CHECK (
        plan_type IN ('free', 'basic', 'pro', 'premium', 'trial')
    );
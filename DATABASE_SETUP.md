# Database Setup Instructions

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose a name: `tradenote` or `tradenote-prod`
4. Set a strong database password (save it!)
5. Select region: **Mumbai** (for Indian users) or closest to your location
6. Click "Create new project" (takes ~2 minutes)

## Step 2: Run Database Migration

1. In Supabase Dashboard, go to **SQL Editor** (left sidebar)
2. Open file: `supabase/migrations/002_complete_schema.sql`
3. Copy the ENTIRE content
4. Paste into Supabase SQL Editor
5. Click **"Run"** button (bottom right)
6. Wait for success message: "Success. No rows returned"

✅ Your database is now set up with all 7 tables!

## Step 3: Get API Credentials

1. In Supabase Dashboard, go to **Settings** > **API**
2. Copy these values:

```
Project URL: https://xxxxx.supabase.co
anon/public key: eyJhbG...
service_role key: eyJhbG... (⚠️ Keep secret!)
```

## Step 4: Configure Environment Variables

Create `.env.local` in project root:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Razorpay (get from razorpay.com after signup)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your_secret_key
```

## Step 5: Enable Google OAuth (Optional)

1. In Supabase Dashboard, go to **Authentication** > **Providers**
2. Find "Google" and toggle **Enabled**
3. Enter Google OAuth credentials:
   - Get from [Google Cloud Console](https://console.cloud.google.com/)
   - Create OAuth 2.0 Client ID
   - Add authorized redirect URI: `https://your-project.supabase.co/auth/v1/callback`
4. Click **Save**

## Step 6: Test the Setup

```bash
# Restart dev server to load new env variables
npm run dev
```

Visit:

- Login: <http://localhost:3000/auth/login>
- Register: <http://localhost:3000/auth/register>

## Database Tables Created

| Table | Purpose | Rows (Est.) |
|-------|---------|-------------|
| `user_settings` | User profiles + subscription | 100K users |
| `strategies` | Trading strategies vault | ~5 per user |
| `watch_list` | Active instruments to monitor | ~10 per user |
| `diary_entries` | Daily journal entries | ~365 per user/year |
| `studies` | Market research & analysis | ~20 per user |
| `trades` | Trade journal | ~100 per user/month |
| `payments` | Payment transaction history | ~12 per user/year |

## Plan Limits (Enforced by Database)

Functions created to check limits:

- `can_add_trade(user_id)` - Checks monthly trade limit
- `can_add_study(user_id)` - Checks study limit
- `can_add_watch_item(user_id)` - Checks watch list limit

### Basic Plan (₹199/month)

- 100 trades/month
- 20 studies total
- 10 active watch items
- 50MB storage

### Pro Plan (₹499/month)

- Unlimited trades
- Unlimited studies
- Unlimited watch items
- 500MB storage
- PDF export enabled

## Security Features

✅ **Row Level Security (RLS)** - Users can only access their own data  
✅ **SSL/TLS** - All connections encrypted  
✅ **Auto Indexes** - Optimized for 100K users  
✅ **Automatic Backups** - Daily (on paid Supabase plan)  

## Next Steps

After database is set up:

1. ✅ Database schema - DONE
2. 🔄 Implement auth logic (connect forms to Supabase)
3. 🔄 Test login/register flows
4. 🔄 Set up protected routes
5. ⏳ Build dashboard with real data
6. ⏳ Implement watch list CRUD
7. ⏳ Build trade journal
8. ⏳ Add Razorpay payment integration

## Troubleshooting

**Error: "relation does not exist"**

- Make sure you ran the full SQL migration
- Check SQL Editor for error messages

**Error: "JWT expired"**

- Clear browser cookies
- Restart dev server

**Error: "invalid API key"**

- Double-check `.env.local` values
- Make sure to restart dev server after adding env vars

**Can't log in:**

- Check Supabase Dashboard > Authentication > Users
- Verify email confirmation settings
- Check network tab for API errors

## Production Checklist

Before launching:

- [ ] Upgrade to Supabase Pro Plan ($25/month)
- [ ] Enable Point-in-Time Recovery
- [ ] Set up custom domain
- [ ] Configure email templates (Supabase Auth)
- [ ] Set up monitoring alerts
- [ ] Test payment webhooks
- [ ] Configure rate limiting
- [ ] Set up error tracking (Sentry)

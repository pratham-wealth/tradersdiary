# TradeNote Subscription Plans

## Plan Comparison

| Feature | Basic Plan (₹199/month) | Pro Plan (₹499/month) |
|---------|-------------------------|----------------------|
| **Price** | ₹199/month (~$2.40) | ₹499/month (~$6) |
| **Trades per Month** | 100 trades | Unlimited |
| **Studies** | 20 studies | Unlimited |
| **Watch List Items** | 10 active items | Unlimited |
| **Storage for Images** | 50MB | 500MB |
| **Reports** | View only (screen) | PDF Export + Print |
| **Report Types** | Daily only | Daily, Weekly, Monthly |
| **Study Reports** | ❌ No | ✅ Yes (PDF export) |
| **Support** | Email (48hrs) | Priority (24hrs) |

## Plan Upgrade Benefits (Pro)

When users upgrade to Pro (₹499/month), they get:

1. **No Limits**
   - Log unlimited trades every month
   - Create unlimited market studies
   - Monitor unlimited instruments on watch list

2. **PDF Export & Print**
   - Export performance reports as PDF
   - Export study reports as PDF
   - Print-friendly formatting
   - Share reports easily

3. **Advanced Reporting**
   - Daily performance snapshots
   - Weekly trade analysis
   - Monthly trend reports
   - Strategy-wise breakdown

4. **More Storage**
   - 500MB for trade screenshots
   - Multiple images per trade
   - High-quality image storage

5. **Priority Support**
   - 24-hour response time
   - Dedicated support channel

## Technical Implementation

### Database Fields (user_settings table)

```sql
plan_type: 'basic' | 'pro'
monthly_trades_limit: 100 (basic) | NULL (pro = unlimited)
monthly_studies_limit: 20 (basic) | NULL (pro = unlimited)
watch_list_limit: 10 (basic) | NULL (pro = unlimited)
storage_limit_mb: 50 (basic) | 500 (pro)
```

### Plan Check Functions

The database includes helper functions to check limits:

- `can_add_trade(user_id)` - Returns true/false
- `can_add_study(user_id)` - Returns true/false
- `can_add_watch_item(user_id)` - Returns true/false

### Usage Tracking

```typescript
// Example check before adding trade
const canAdd = await supabase.rpc('can_add_trade', { p_user_id: userId });

if (!canAdd) {
  // Show upgrade modal
  showUpgradeModal('You've reached your monthly trade limit. Upgrade to Pro for unlimited trades!');
}
```

## Payment Flow (Razorpay)

### Basic Plan: ₹199/month

- Razorpay Plan ID: `plan_basic_199`
- Auto-renewal: Monthly
- First payment: Immediate
- Subsequent: Auto-deducted

### Pro Plan: ₹499/month

- Razorpay Plan ID: `plan_pro_499`
- Auto-renewal: Monthly
- First payment: Immediate
- Includes 7-day money-back guarantee

## Trial Period

- New users: 7-day free trial (Pro features)
- After trial: Auto-downgrade to Basic
- Can upgrade anytime during trial
- No credit card required for trial

## Future International Plans (Stripe)

When expanding globally:

**Basic Plan:** $3/month (₹249 equivalent)
**Pro Plan:** $7/month (₹

579 equivalent)

Slightly higher to account for Stripe fees (2.9% vs Razorpay 2%)

## Upgrade Prompts

Users will see upgrade prompts when they hit limits:

1. **Trade Limit Reached**
   > "You've logged 100 trades this month! 📊  
   > Upgrade to Pro for unlimited trades at just ₹499/month"

2. **Study Limit Reached**
   > "You've created 20 studies! 📈  
   > Get unlimited studies + PDF exports with Pro"

3. **PDF Export Attempt (Basic User)**
   > "PDF export is a Pro feature! 🎯  
   > Upgrade to export and print your reports"

4. **Watch List Full**
   > "Your watch list is full (10 items) 👁️  
   > Pro users can monitor unlimited instruments"

## Retention Strategy

- Show value: Display "X trades analyzed this month"
- Monthly recap: Email with stats (only available if subscribed)
- Discount codes: Offer ₹50 off first Pro month for Basic users
- Annual plan: ₹4,999/year (2 months free) - launch later

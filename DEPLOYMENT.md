# 🚀 Deployment Guide for TradeNote

This application is built with **Next.js 15**, **Supabase**, and **TailwindCSS**. It is optimized for deployment on **Vercel**.

## 1. Prerequisites

- [GitHub Account](https://github.com)
- [Vercel Account](https://vercel.com)
- [Supabase Project](https://supabase.com) (Already set up)

## 2. Prepare Codebase

1. **Commit all changes:**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

## 3. Environment Variables

You need to add these variables to Vercel:

| Variable | Description | Value Source |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL | Supabase Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon Key | Supabase Settings > API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role | Supabase Settings > API (Keep Secret!) |
| `NEXT_PUBLIC_APP_URL` | Your production URL | e.g., `https://tradenote.app` |

## 4. Deploy to Vercel

1. Go to **Vercel Dashboard** -> **Add New** -> **Project**.
2. Import your **GitHub Repository**.
3. In **Environment Variables** section, add the keys from Step 3.
4. Click **Deploy**.

## 5. Post-Deployment Setup (Supabase)

1. **Update Auth Redirect URLs:**
   - Go to Supabase Dashboard -> **Authentication** -> **URL Configuration**.
   - Add your Vercel production URL: `https://your-project.vercel.app/auth/callback`
   - Also add `https://your-project.vercel.app` to **Site URL**.

2. **Google OAuth (Production):**
   - Go to Google Cloud Console.
   - Add your production domain to **Authorized JavaScript origins**.
   - Add `https://your-project.vercel.app/auth/callback` to **Authorized redirect URIs**.

## 6. Verification

1. **Test Sign Up/Login:** Ensure auth works on production.
2. **Test Database:** Create a note or trade to verify DB connection.
3. **Test Images:** Upload an image to verify Storage config.

---

## 🛠️ Troubleshooting

- **500 Error on Login:** Check `NEXT_PUBLIC_APP_URL` and Supabase Auth Redirect URLs.
- **Images not loading:** Check Supabase Storage bucket policies (must be public).
- **Styles missing:** Ensure Tailwind CSS built correctly (Vercel automatic).

**🎉 You are ready to go live!**

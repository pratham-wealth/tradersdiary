-- Create a table for managing application advertisements
create table public.app_ads (
    id uuid not null default gen_random_uuid(),
    location text not null,
    -- e.g., 'dashboard_banner', 'sidebar_ad', 'library_banner'
    image_url text not null,
    link_url text,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    constraint app_ads_pkey primary key (id),
    constraint app_ads_location_key unique (location)
);
-- RLS Policies
alter table public.app_ads enable row level security;
-- Everyone can read active ads
create policy "Public can read active ads" on public.app_ads for
select using (is_active = true);
-- Admins can do everything
create policy "Admins can manage ads" on public.app_ads for all using (
    exists (
        select 1
        from public.user_settings
        where user_settings.id = auth.uid()
            and user_settings.role = 'super_admin'
    )
);
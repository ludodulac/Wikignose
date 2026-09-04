-- Snapshot du backend Supabase Wikignose avant fusion dans La forêt enchantée
-- Date : 2026-09-04
-- Projet source : jwtawyeuyvqjikjvfhri
--
-- IMPORTANT : aucun e-mail d'administrateur n'est inclus dans ce dépôt public.
-- État au moment de l'archive : 1 entrée admin, 0 document en attente,
-- 0 objet dans le bucket wikignose-pdfs.

create extension if not exists pgcrypto;

create table if not exists public.wikignose_admins (
  email text primary key,
  created_at timestamptz not null default now()
);

create table if not exists public.pending_documents (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  original_filename text not null,
  file_size bigint,
  title_hint text,
  course_hint text,
  school_hint text,
  current_hint text,
  masters_hint text[],
  status text not null default 'pending',
  uploaded_by uuid default auth.uid(),
  uploaded_at timestamptz not null default now(),
  indexed_at timestamptz
);

alter table public.wikignose_admins enable row level security;
alter table public.pending_documents enable row level security;

create or replace function public.is_wikignose_admin()
returns boolean
language sql
stable
set search_path = public
as $$
  select exists (
    select 1 from public.wikignose_admins a
    where lower(a.email) = lower(coalesce(auth.jwt()->>'email',''))
  );
$$;

drop policy if exists "admins can verify own authorization" on public.wikignose_admins;
create policy "admins can verify own authorization" on public.wikignose_admins
for select to authenticated
using (lower(email) = lower(coalesce(auth.jwt()->>'email','')));

drop policy if exists "wikignose admins view pending documents" on public.pending_documents;
create policy "wikignose admins view pending documents" on public.pending_documents
for select to authenticated using (public.is_wikignose_admin());

drop policy if exists "wikignose admins insert pending documents" on public.pending_documents;
create policy "wikignose admins insert pending documents" on public.pending_documents
for insert to authenticated with check (public.is_wikignose_admin());

drop policy if exists "wikignose admins update pending documents" on public.pending_documents;
create policy "wikignose admins update pending documents" on public.pending_documents
for update to authenticated using (public.is_wikignose_admin()) with check (public.is_wikignose_admin());

drop policy if exists "wikignose admins delete pending documents" on public.pending_documents;
create policy "wikignose admins delete pending documents" on public.pending_documents
for delete to authenticated using (public.is_wikignose_admin());

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('wikignose-pdfs','wikignose-pdfs',false,104857600,array['application/pdf'])
on conflict (id) do update set
  public=false,
  file_size_limit=excluded.file_size_limit,
  allowed_mime_types=excluded.allowed_mime_types;

drop policy if exists "wikignose admins read pdfs" on storage.objects;
create policy "wikignose admins read pdfs" on storage.objects
for select to authenticated
using (bucket_id='wikignose-pdfs' and public.is_wikignose_admin());

drop policy if exists "wikignose admins upload pdfs" on storage.objects;
create policy "wikignose admins upload pdfs" on storage.objects
for insert to authenticated
with check (bucket_id='wikignose-pdfs' and public.is_wikignose_admin());

drop policy if exists "wikignose admins update pdfs" on storage.objects;
create policy "wikignose admins update pdfs" on storage.objects
for update to authenticated
using (bucket_id='wikignose-pdfs' and public.is_wikignose_admin())
with check (bucket_id='wikignose-pdfs' and public.is_wikignose_admin());

drop policy if exists "wikignose admins delete pdfs" on storage.objects;
create policy "wikignose admins delete pdfs" on storage.objects
for delete to authenticated
using (bucket_id='wikignose-pdfs' and public.is_wikignose_admin());

-- Profiles-Tabelle erweitern
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS first_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_name text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS company text;

-- Addresses-Tabelle erweitern für Adresstyp
ALTER TABLE public.addresses ADD COLUMN IF NOT EXISTS address_type text DEFAULT 'shipping';
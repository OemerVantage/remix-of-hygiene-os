-- Add product_reference column for product inquiries
ALTER TABLE public.contact_submissions ADD COLUMN product_reference TEXT;
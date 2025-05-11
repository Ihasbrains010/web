-- Add a confirmation status column to the orders table

ALTER TABLE public.orders
ADD COLUMN confirmation_status TEXT DEFAULT 'Pending Confirmation';

COMMENT ON COLUMN public.orders.confirmation_status IS 'Tracks the manual confirmation status (e.g., Pending Confirmation, Confirmed, Cancelled)';


-- Remove the overly permissive delete policy
DROP POLICY "Allow delete for service role" ON public.participants;

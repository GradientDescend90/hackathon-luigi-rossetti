
-- Add team and value columns to participants
ALTER TABLE public.participants ADD COLUMN team TEXT NOT NULL DEFAULT '';
ALTER TABLE public.participants ADD COLUMN value TEXT NOT NULL DEFAULT '';

-- Add DELETE policy (needed for reset via edge function with service role)
CREATE POLICY "Allow delete for service role" ON public.participants
  FOR DELETE USING (true);

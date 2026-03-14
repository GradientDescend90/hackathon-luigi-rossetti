
-- Create participants table
CREATE TABLE public.participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read participants
CREATE POLICY "Anyone can view participants" ON public.participants
  FOR SELECT USING (true);

-- Allow anyone to insert (no auth required)
CREATE POLICY "Anyone can join" ON public.participants
  FOR INSERT WITH CHECK (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.participants;

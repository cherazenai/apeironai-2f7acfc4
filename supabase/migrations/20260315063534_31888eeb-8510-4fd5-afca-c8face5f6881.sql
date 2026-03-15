INSERT INTO storage.buckets (id, name, public)
VALUES ('papers', 'papers', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Authenticated users can upload papers"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'papers' AND (auth.uid())::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can read own papers"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'papers' AND (auth.uid())::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own papers"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'papers' AND (auth.uid())::text = (storage.foldername(name))[1]);
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Post = {
  id: number;
  status: string;
  image_url: string | null;
  created_at: string;

  ua_title: string;
  ua_content: string;
  ua_meta_title: string;
  ua_meta_description: string;
  ua_slug: string;

  ru_title: string;
  ru_content: string;
  ru_meta_title: string;
  ru_meta_description: string;
  ru_slug: string;

  en_title: string;
  en_content: string;
  en_meta_title: string;
  en_meta_description: string;
  en_slug: string;
};

// Получить все посты
export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return data || [];
}

// Получить пост по slug (любой язык)
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase.from('posts').select('*');

  if (error || !data) return null;

  const post = data.find((p) => p.ua_slug === slug || p.ru_slug === slug || p.en_slug === slug);

  return post || null;
}

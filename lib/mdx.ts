import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// This defines what a Post looks like for TypeScript
export interface Post {
  slug: string;
  title: string;
  date?: string;
  description?: string;
}

const postsPath = path.join(process.cwd(), 'posts');

// IMPORTANT: The word 'export' must be here!
export const getAllPosts = (): Post[] => {
  // Check if folder exists to prevent crashing
  if (!fs.existsSync(postsPath)) return [];

  const files = fs.readdirSync(postsPath);
  
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const fullPath = path.join(postsPath, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        description: data.description || '',
      };
    });
};

// IMPORTANT: The word 'export' must be here too!
export const getPostBySlug = (slug: string) => {
  const fullPath = path.join(postsPath, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return { data: data as Post, content };
};
/** Tech stack icons in /public/tech/{slug}.svg */
export type TechItem = {
  name: string;
  slug: string;
};

export const TECH_STACK: TechItem[] = [
  { name: 'Firebase', slug: 'firebase' },
  { name: 'MySQL', slug: 'mysql' },
  { name: 'MongoDB', slug: 'mongodb' },
  { name: 'AWS', slug: 'aws' },
  { name: 'React', slug: 'react' },
  { name: 'Next.js', slug: 'nextjs' },
  { name: 'Flutter', slug: 'flutter' },
  { name: 'WordPress', slug: 'wordpress' },
  { name: 'Shopify', slug: 'shopify' },
  { name: 'Node.js', slug: 'nodejs' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Python', slug: 'python' },
  { name: 'Docker', slug: 'docker' },
  { name: 'GraphQL', slug: 'graphql' },
];

export function techIconPath(slug: string) {
  return `/tech/${slug}.svg`;
}

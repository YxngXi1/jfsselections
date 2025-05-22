// Force override broken PageProps type in Next.js
declare module "*/app/candidate/[slug]/page" {
  export interface PageProps {
    params: { slug: string };
    searchParams?: Record<string, string | string[]>;
  }
}

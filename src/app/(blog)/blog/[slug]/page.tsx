import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getBlogPost } from "@/data/blog";
import { PageJsonLd } from "@/components/shared/JsonLd";
import ScrollReveal from "@/components/shared/ScrollReveal";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getBlogPost(resolvedParams.slug);

  if (!post) {
    return {
      title: "Artículo no encontrado",
    };
  }

  return {
    title: `${post.title} | O Sanchez Seguros`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.osanchezseguros.com/blog/${post.slug}`,
      images: [
        {
          url: `https://www.osanchezseguros.com${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "es_MX",
      type: "article",
    },
    alternates: {
      canonical: `https://www.osanchezseguros.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = getBlogPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PageJsonLd
        breadcrumbs={[
          { name: "Inicio", url: "https://www.osanchezseguros.com" },
          { name: "Blog", url: "https://www.osanchezseguros.com/blog" },
          { name: post.title, url: `https://www.osanchezseguros.com/blog/${post.slug}` },
        ]}
      />

      <article className="pt-24 pb-20 bg-background min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Link 
              href="/blog"
              className="inline-flex items-center text-accent hover:text-accent-dark font-medium mb-8 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al Blog
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-brand/10 text-brand text-sm font-bold rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-muted font-medium">
                {post.date}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-lg">
              <Image 
                src={post.image} 
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="prose prose-lg prose-blue max-w-none prose-headings:font-display prose-headings:text-brand">
              <ReactMarkdown
                components={{
                  a: ({ node, href, ...props }) => {
                    const isExternal = href?.startsWith("http") || href?.startsWith("mailto") || href?.startsWith("tel");
                    return (
                      <a
                        {...props}
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="text-accent font-bold underline decoration-2 underline-offset-4 hover:text-accent-dark transition-colors"
                      />
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </ScrollReveal>
        </div>
      </article>
    </>
  );
}

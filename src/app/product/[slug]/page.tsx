import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { initialProducts } from "@/data/products";
import { ProductDetailView } from "@/components/product/ProductDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return initialProducts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = initialProducts.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Footwear Not Found",
    };
  }

  return {
    title: product.metaTitle || `${product.name} by ${product.brand}`,
    description: product.metaDescription || product.description,
    openGraph: {
      title: `${product.name} | DORVEN Footwear`,
      description: product.description,
      images: [
        {
          url: product.primaryImage,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = initialProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products: same category or brand, excluding current product
  const relatedProducts = initialProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.brand === product.brand)
    )
    .slice(0, 4);

  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.primaryImage,
    description: product.description,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price || 0,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "DORVEN Footwear",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailView product={product} relatedProducts={relatedProducts} />
    </>
  );
}

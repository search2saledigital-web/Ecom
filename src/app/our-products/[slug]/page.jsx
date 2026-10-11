
import connectDB from "@/lib/db";
import Product from "@/models/product.model.js";
import ProductPage from "./ProductPage";

export async function generateMetadata({ params }) {
    const { slug } = await params;

    try {
        await connectDB();

        const product = await Product.findOne({
            slug,
            status: "active",
        })
            .select("name slug metaTitle metaDescription shortDescription images")
            .lean();

        if (!product) {
            return {
                title: "Product Not Found",
                description: "This product is currently unavailable.",
                robots: {
                    index: false,
                    follow: false,
                },
            };
        }

        const title =
            product.metaTitle?.trim() || product.name;

        const description =
            product.metaDescription?.trim() ||
            product.shortDescription ||
            `Explore ${product.name}.`;

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
        const canonicalUrl = baseUrl
            ? `${baseUrl}/products/${product.slug}`
            : undefined;

        return {
            title,
            description,
            alternates: canonicalUrl
                ? { canonical: canonicalUrl }
                : undefined,
            openGraph: {
                title,
                description,
                type: "website",
                url: canonicalUrl,
                images: product.images?.[0]?.url
                    ? [{ url: product.images[0].url, alt: product.name }]
                    : [],
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: product.images?.[0]?.url
                    ? [product.images[0].url]
                    : [],
            },
        };
    } catch (error) {
        console.error("PRODUCT METADATA ERROR:", error);

        return {
            title: "Product",
            description: "Explore our product collection.",
        };
    }
}

export default async function Page({ params }) {
    const { slug } = await params;

    return <ProductPage slug={slug} />;
}

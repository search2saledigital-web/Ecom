
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    Heart,
    ShoppingCart,
    Minus,
    Plus,
    ChevronLeft,
    ChevronRight,
    ZoomIn,
    X,
    Truck,
    ShieldCheck,
    RotateCcw,
    Check,
    ArrowRight,
    Package,
} from "lucide-react";

const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN")}`;

export default function ProductPage({ slug: slugProp }) {
    const params = useParams();
    const slug = slugProp || params?.slug;

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedPack, setSelectedPack] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [zoomOpen, setZoomOpen] = useState(false);
    const [wishlist, setWishlist] = useState(false);
    const [cartMessage, setCartMessage] = useState("");

    useEffect(() => {
        if (!slug) return;

        let cancelled = false;

        async function loadProduct() {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `/api/products/${encodeURIComponent(slug)}`,
                    { cache: "no-store" }
                );

                const data = await response.json();

                if (!response.ok || !data.product) {
                    throw new Error(
                        data.message || "Product not found."
                    );
                }

                if (cancelled) return;

                const currentProduct = data.product;

                setProduct(currentProduct);
                setSelectedImage(0);
                setQuantity(1);
                setSelectedPack(
                    currentProduct.packs?.length
                        ? 0
                        : null
                );

                // Load related products.
                const productsResponse = await fetch(
                    "/api/products",
                    { cache: "no-store" }
                );

                const productsData =
                    await productsResponse.json();

                if (!cancelled && productsResponse.ok) {
                    const products = Array.isArray(productsData)
                        ? productsData
                        : productsData.products || [];

                    setRelatedProducts(
                        products
                            .filter(
                                (item) =>
                                    String(item._id) !==
                                    String(currentProduct._id) &&
                                    item.status === "active"
                            )
                            .filter((item) => {
                                const currentCategory =
                                    currentProduct.category?._id ||
                                    currentProduct.category;

                                const itemCategory =
                                    item.category?._id ||
                                    item.category;

                                return (
                                    String(currentCategory || "") ===
                                    String(itemCategory || "")
                                );
                            })
                            .slice(0, 4)
                    );
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err.message || "Unable to load product."
                    );
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadProduct();

        return () => {
            cancelled = true;
        };
    }, [slug]);

    useEffect(() => {
        if (!product?._id) return;

        try {
            const saved = JSON.parse(
                localStorage.getItem("wishlist") || "[]"
            );

            setWishlist(
                saved.some(
                    (item) =>
                        String(item._id || item) ===
                        String(product._id)
                )
            );
        } catch {
            setWishlist(false);
        }
    }, [product?._id]);

    const images = useMemo(() => {
        const urls = (product?.images || [])
            .map((image) =>
                typeof image === "string"
                    ? image
                    : image?.url
            )
            .filter(Boolean);

        return [...new Set(urls)];
    }, [product]);

    const activePack =
        selectedPack !== null
            ? product?.packs?.[selectedPack]
            : null;

    const price = Number(
        activePack?.price ?? product?.realPrice ?? 0
    );

    const oldPrice = Number(product?.oldPrice || 0);
    const totalPrice = price * quantity;

    const discount =
        oldPrice > price && oldPrice > 0
            ? Math.round(
                ((oldPrice - price) / oldPrice) * 100
            )
            : 0;

    const changeImage = (direction) => {
        if (!images.length) return;

        setSelectedImage((current) =>
            direction === "next"
                ? (current + 1) % images.length
                : (current - 1 + images.length) % images.length
        );
    };

    const toggleWishlist = () => {
        if (!product) return;

        try {
            const saved = JSON.parse(
                localStorage.getItem("wishlist") || "[]"
            );

            const exists = saved.some(
                (item) =>
                    String(item._id || item) ===
                    String(product._id)
            );

            const updated = exists
                ? saved.filter(
                    (item) =>
                        String(item._id || item) !==
                        String(product._id)
                )
                : [
                    ...saved,
                    {
                        _id: product._id,
                        name: product.name,
                        slug: product.slug,
                        price,
                        image: images[0] || "",
                    },
                ];

            localStorage.setItem(
                "wishlist",
                JSON.stringify(updated)
            );

            setWishlist(!exists);
        } catch {
            setCartMessage(
                "Unable to update wishlist. Please try again."
            );
        }
    };

    const addToCart = (item = product, itemPrice = price, qty = quantity) => {
        if (!item) return;

        const cartItem = {
            _id: item._id,
            name: item.name,
            slug: item.slug,
            price: Number(itemPrice),
            image:
                typeof item.images?.[0] === "string"
                    ? item.images[0]
                    : item.images?.[0]?.url || "",
            quantity: qty,
            pack: item === product ? activePack?.name || "" : "",
        };

        window.dispatchEvent(
            new CustomEvent("add-to-cart", {
                detail: cartItem,
            })
        );

        setCartMessage("Added to cart");
        window.setTimeout(() => setCartMessage(""), 2500);
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#F7F7F5] px-4 py-20">
                <div className="mx-auto max-w-7xl animate-pulse">
                    <div className="grid gap-8 lg:grid-cols-2">
                        <div className="aspect-[4/5] rounded-3xl bg-neutral-200" />
                        <div className="space-y-5 py-6">
                            <div className="h-4 w-32 rounded bg-neutral-200" />
                            <div className="h-10 w-3/4 rounded bg-neutral-200" />
                            <div className="h-8 w-40 rounded bg-neutral-200" />
                            <div className="h-24 rounded bg-neutral-200" />
                            <div className="h-14 rounded bg-neutral-200" />
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (error || !product) {
        return (
            <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#F7F7F5] px-4 text-center">
                <Package size={42} className="text-[#C9A227]" />
                <h1 className="mt-5 text-2xl font-bold">
                    Product not found
                </h1>
                <p className="mt-2 text-sm text-neutral-500">
                    {error || "This product may no longer be available."}
                </p>
                <Link
                    href="/our-products"
                    className="mt-6 rounded-xl bg-[#111111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#C9A227]"
                >
                    Explore Products
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F7F7F5] text-[#171717]">
            {/* Breadcrumb */}
            <div className="mx-auto max-w-7xl px-4 pb-5 pt-7 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500 sm:text-xs">
                    <Link href="/" className="hover:text-[#C9A227]">
                        Home
                    </Link>
                    <span>/</span>
                    <Link
                        href="/our-products"
                        className="hover:text-[#C9A227]"
                    >
                        Our Products
                    </Link>
                    {product.category?.name && (
                        <>
                            <span>/</span>
                            <span>{product.category.name}</span>
                        </>
                    )}
                    <span>/</span>
                    <span className="max-w-48 truncate text-[#927018]">
                        {product.name}
                    </span>
                </div>
            </div>

            {/* Product Hero */}
            <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 xl:gap-12">
                    {/* Gallery */}
                    <div className="lg:col-span-7">
                        <div className="lg:sticky lg:top-30">
                            <div className="flex flex-col gap-4 md:flex-row">
                                {/* Thumbnails */}
                                {images.length > 1 && (
                                    <div className="order-2 flex gap-3 overflow-x-auto pb-1 md:order-1 md:w-24 md:flex-col md:overflow-visible">
                                        {images.map((image, index) => (
                                            <button
                                                key={`${image}-${index}`}
                                                type="button"
                                                onClick={() =>
                                                    setSelectedImage(index)
                                                }
                                                aria-label={`View image ${index + 1}`}
                                                className={`h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-white p-1 transition sm:h-24 sm:w-24 ${selectedImage === index
                                                    ? "border-2 border-[#C9A227]"
                                                    : "border border-neutral-200 hover:border-neutral-400"
                                                    }`}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${product.name} view ${index + 1}`}
                                                    className="h-full w-full rounded-xl object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Main image */}
                                <div className="relative order-1 aspect-[4/5] min-w-0 flex-1 overflow-hidden rounded-3xl border border-neutral-200 bg-white md:order-2 md:aspect-auto md:h-[550px]">
                                    {images[selectedImage] ? (
                                        <img
                                            src={images[selectedImage]}
                                            alt={product.name}
                                            className="h-full w-full object-contain p-4 transition duration-700 hover:scale-[1.03] sm:p-7"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                                            No product image available
                                        </div>
                                    )}

                                    <div className="absolute left-4 top-4 flex flex-wrap gap-2 sm:left-6 sm:top-6">
                                        <span className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                            {product.category?.name || "Product"}
                                        </span>
                                        {discount > 0 && (
                                            <span className="rounded-full bg-[#C9A227] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-black">
                                                {discount}% OFF
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setZoomOpen(true)}
                                        aria-label="Zoom product image"
                                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md transition hover:bg-[#C9A227]"
                                    >
                                        <ZoomIn size={19} />
                                    </button>

                                    {images.length > 1 && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    changeImage("prev")
                                                }
                                                aria-label="Previous image"
                                                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md transition hover:bg-[#C9A227]"
                                            >
                                                <ChevronLeft size={21} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    changeImage("next")
                                                }
                                                aria-label="Next image"
                                                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#111111] text-white shadow-md transition hover:bg-[#C9A227] hover:text-black"
                                            >
                                                <ChevronRight size={21} />
                                            </button>
                                            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-[11px] text-white">
                                                {selectedImage + 1} / {images.length}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Information */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center justify-between gap-3 border-b border-neutral-200 pb-4">
                            <span className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-600">
                                {product.status === "active"
                                    ? "Available"
                                    : "Currently unavailable"}
                            </span>

                            <button
                                type="button"
                                onClick={toggleWishlist}
                                aria-label={
                                    wishlist
                                        ? "Remove from wishlist"
                                        : "Add to wishlist"
                                }
                                className={`flex h-11 w-11 items-center justify-center rounded-full border transition ${wishlist
                                    ? "border-red-200 bg-red-50 text-red-500"
                                    : "border-neutral-200 bg-white hover:border-[#C9A227] hover:text-[#927018]"
                                    }`}
                            >
                                <Heart
                                    size={20}
                                    className={wishlist ? "fill-current" : ""}
                                />
                            </button>
                        </div>

                        <div className="mt-6">
                            {product.category?.name && (
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#927018]">
                                    {product.category.name}
                                </p>
                            )}

                            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-4xl xl:text-[42px]">
                                {product.name}
                            </h1>

                            {product.shortDescription && (
                                <p className="mt-3 text-sm leading-7 text-neutral-500 sm:text-base">
                                    {product.shortDescription}
                                </p>
                            )}
                        </div>

                        {/* Price */}
                        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="text-3xl font-bold tracking-tight sm:text-4xl">
                                    {formatPrice(price)}
                                </span>

                                {oldPrice > price && !activePack && (
                                    <span className="text-lg text-neutral-400 line-through">
                                        {formatPrice(oldPrice)}
                                    </span>
                                )}

                                {discount > 0 && !activePack && (
                                    <span className="rounded-md bg-[#C9A227]/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#80620D]">
                                        Save {discount}%
                                    </span>
                                )}
                            </div>

                            <p className="mt-2 text-xs text-neutral-500">
                                Inclusive of all applicable taxes
                            </p>
                        </div>

                        {/* Product packs */}
                        {product.packs?.length > 0 && (
                            <div className="mt-6">
                                <div className="mb-3 flex items-center justify-between gap-3">
                                    <span className="text-xs font-bold uppercase tracking-wider">
                                        Choose Size / Pack
                                    </span>
                                    <span className="text-xs text-neutral-500">
                                        {activePack?.name || ""}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                    {product.packs.map((pack, index) => (
                                        <button
                                            key={`${pack.name}-${index}`}
                                            type="button"
                                            onClick={() =>
                                                setSelectedPack(index)
                                            }
                                            className={`rounded-2xl border p-4 text-left transition ${selectedPack === index
                                                ? "border-[#C9A227] bg-[#C9A227]/10 ring-1 ring-[#C9A227]"
                                                : "border-neutral-200 bg-white hover:border-neutral-400"
                                                }`}
                                        >
                                            <span className="block text-sm font-bold">
                                                {pack.name}
                                            </span>
                                            {pack.quantity && (
                                                <span className="mt-1 block text-xs text-neutral-500">
                                                    {pack.quantity}
                                                </span>
                                            )}
                                            <span className="mt-3 block text-sm font-bold">
                                                {formatPrice(pack.price)}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Key features */}
                        {product.keyFeatures?.length > 0 && (
                            <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                {product.keyFeatures.slice(0, 4).map(
                                    (feature, index) => (
                                        <div
                                            key={`${feature}-${index}`}
                                            className="flex items-start gap-2 rounded-xl border border-neutral-200 bg-white p-3"
                                        >
                                            <Check
                                                size={16}
                                                className="mt-0.5 shrink-0 text-[#927018]"
                                            />
                                            <span className="text-xs leading-5 text-neutral-700">
                                                {feature}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        )}

                        {/* Quantity and cart */}
                        <div className="mt-7 border-t border-neutral-200 pt-6">
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <div className="flex h-14 items-center justify-between rounded-2xl border border-neutral-200 bg-white px-3 sm:w-36">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setQuantity((q) =>
                                                Math.max(1, q - 1)
                                            )
                                        }
                                        aria-label="Decrease quantity"
                                        className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-neutral-100"
                                    >
                                        <Minus size={16} />
                                    </button>

                                    <span className="text-sm font-bold">
                                        {String(quantity).padStart(2, "0")}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setQuantity((q) => q + 1)
                                        }
                                        aria-label="Increase quantity"
                                        className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-neutral-100"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    disabled={product.status !== "active"}
                                    onClick={() =>
                                        addToCart(product, price, quantity)
                                    }
                                    className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-[#111111] px-5 text-sm font-bold text-white transition hover:bg-[#C9A227] hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <ShoppingCart size={19} />
                                    Add to Cart · {formatPrice(totalPrice)}
                                </button>
                            </div>

                            <button
                                type="button"
                                disabled={product.status !== "active"}
                                onClick={() => {
                                    addToCart(product, price, quantity);
                                    window.location.href = "/checkout";
                                }}
                                className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#111111] bg-white text-sm font-bold transition hover:bg-[#111111] hover:text-white disabled:opacity-50"
                            >
                                Buy It Now
                                <ArrowRight size={16} />
                            </button>

                            {cartMessage && (
                                <p
                                    role="status"
                                    className="mt-3 text-center text-sm font-medium text-green-700"
                                >
                                    {cartMessage}
                                </p>
                            )}
                        </div>

                        {/* Trust information */}
                        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-neutral-200 pt-5">
                            <div className="rounded-xl bg-white p-3 text-center">
                                <ShieldCheck
                                    size={20}
                                    className="mx-auto text-[#927018]"
                                />
                                <span className="mt-2 block text-xs font-bold">
                                    Quality
                                </span>
                                <span className="mt-1 block text-[10px] text-neutral-500">
                                    Assured
                                </span>
                            </div>

                            <div className="rounded-xl bg-white p-3 text-center">
                                <Truck
                                    size={20}
                                    className="mx-auto text-[#927018]"
                                />
                                <span className="mt-2 block text-xs font-bold">
                                    Delivery
                                </span>
                                <span className="mt-1 block text-[10px] text-neutral-500">
                                    Shipping details at checkout
                                </span>
                            </div>

                            <div className="rounded-xl bg-white p-3 text-center">
                                <RotateCcw
                                    size={20}
                                    className="mx-auto text-[#927018]"
                                />
                                <span className="mt-2 block text-xs font-bold">
                                    Support
                                </span>
                                <span className="mt-1 block text-[10px] text-neutral-500">
                                    Customer assistance
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Details */}
            <section className="border-y border-neutral-200 bg-white">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-16">
                    <div className="lg:col-span-7">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#927018]">
                            Discover the Product
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            Product Details
                        </h2>

                        {product.longDescription ? (
                            <div className="mt-5 whitespace-pre-line text-sm leading-8 text-neutral-600 sm:text-base">
                                {product.longDescription}
                            </div>
                        ) : (
                            <p className="mt-5 text-sm leading-7 text-neutral-500">
                                Find product information, specifications,
                                and available options below.
                            </p>
                        )}

                        {product.applications?.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-sm font-bold uppercase tracking-wider">
                                    Applications
                                </h3>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {product.applications.map(
                                        (application, index) => (
                                            <span
                                                key={`${application}-${index}`}
                                                className="rounded-full border border-neutral-200 bg-[#F7F7F5] px-4 py-2 text-xs font-medium text-neutral-700"
                                            >
                                                {application}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        {product.specifications?.length > 0 && (
                            <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200">
                                <div className="border-b border-neutral-200 bg-[#F7F7F5] px-5 py-4">
                                    <h3 className="text-sm font-bold uppercase tracking-wider">
                                        Specifications
                                    </h3>
                                </div>

                                <div className="divide-y divide-neutral-100">
                                    {product.specifications.map(
                                        (spec, index) => (
                                            <div
                                                key={`${spec.name}-${index}`}
                                                className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-2"
                                            >
                                                <span className="text-xs font-semibold text-neutral-500">
                                                    {spec.name}
                                                </span>
                                                <span className="text-sm font-medium text-neutral-900 sm:text-right">
                                                    {spec.value}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-5">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#F7F7F5]">
                            {images[1] || images[0] ? (
                                <img
                                    src={images[1] || images[0]}
                                    alt={`${product.name} product detail`}
                                    className="h-full w-full object-contain p-6 transition duration-700 hover:scale-105"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center">
                                    <Package
                                        size={56}
                                        className="text-neutral-300"
                                    />
                                </div>
                            )}

                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-6 pb-7 pt-20 text-white">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8C75B]">
                                    {product.category?.name || "Our Collection"}
                                </span>
                                <p className="mt-2 text-2xl font-bold leading-tight">
                                    {product.name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-3xl bg-[#171717] px-6 py-10 text-white sm:px-10 lg:px-16 lg:py-14">
                    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
                                Performance Package
                            </p>

                            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                                More speed.
                                <br />
                                More control.
                                <br />
                                More fun.
                            </h2>

                            <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-400">
                                From quick indoor races to outdoor off-road adventures,
                                TurboX brings responsive controls and rugged performance to
                                every drive.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold uppercase tracking-wider text-neutral-300">
                                <span>✓ 4WD DRIVE</span>
                                <span>✓ LED LIGHTS</span>
                                <span>✓ RECHARGEABLE</span>
                            </div>
                        </div>

                        <div className="flex justify-center lg:col-span-5">
                            <div className="h-64 w-64 overflow-hidden rounded-full border-4 border-white/10 p-2 shadow-2xl sm:h-80 sm:w-80">
                                <img
                                    src={images[0]}
                                    alt="Remote control car detail"
                                    className="h-full w-full rounded-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 lg:p-10">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                        {/* Rating Summary */}
                        <div className="border-b border-neutral-200 pb-8 lg:col-span-4 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d1432d]">
                                Customer Reviews
                            </p>

                            <div className="mt-2 flex items-baseline gap-2">
                                <span className="text-6xl font-bold">4.8</span>
                                <span className="text-lg text-neutral-400">/ 5</span>
                            </div>

                            <div className="mt-1 text-lg text-yellow-500">
                                ★★★★★
                            </div>

                            <p className="mt-2 text-xs text-neutral-500">
                                Based on 327 verified customer reviews.
                            </p>

                            <div className="mt-6 space-y-2">
                                {[
                                    ["5 Stars", "92%"],
                                    ["4 Stars", "6%"],
                                    ["3 Stars", "2%"],
                                ].map(([label, percentage]) => (
                                    <div
                                        key={label}
                                        className="flex items-center gap-2 text-xs"
                                    >
                                        <span className="w-14 text-neutral-600">
                                            {label}
                                        </span>

                                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
                                            <div
                                                className="h-full rounded-full bg-[#171717]"
                                                style={{ width: percentage }}
                                            />
                                        </div>

                                        <span className="w-9 text-right text-neutral-500">
                                            {percentage}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                className="mt-7 w-full rounded-xl border border-neutral-900 py-3 text-xs font-bold uppercase tracking-wider transition hover:bg-neutral-900 hover:text-white"
                            >
                                Write A Review
                            </button>
                        </div>

                        {/* Reviews */}
                        <div className="lg:col-span-8">
                            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <h3 className="text-xl font-bold">What Customers Say</h3>

                                <span className="text-xs font-bold uppercase tracking-wide text-[#d1432d]">
                                    Most Helpful
                                </span>
                            </div>

                            <div className="space-y-4">
                                <article className="rounded-2xl border border-neutral-200 bg-[#fafafa] p-5">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <div className="text-xs text-yellow-500">
                                                ★★★★★
                                            </div>

                                            <h4 className="mt-1 text-sm font-bold">
                                                “Really fast and surprisingly strong”
                                            </h4>
                                        </div>

                                        <span className="text-[11px] text-neutral-400">
                                            Verified Buyer • 2 weeks ago
                                        </span>
                                    </div>

                                    <p className="mt-3 text-xs leading-6 text-neutral-600">
                                        The car is much faster than I expected. It works well on
                                        the floor and outside on rough ground. My son has been
                                        playing with it every day.
                                    </p>

                                    <div className="mt-3 text-[11px] text-neutral-400">
                                        Rahul • Delhi
                                    </div>
                                </article>

                                <article className="rounded-2xl border border-neutral-200 bg-[#fafafa] p-5">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <div className="text-xs text-yellow-500">
                                                ★★★★★
                                            </div>

                                            <h4 className="mt-1 text-sm font-bold">
                                                “Great remote control and battery”
                                            </h4>
                                        </div>

                                        <span className="text-[11px] text-neutral-400">
                                            Verified Buyer • 1 month ago
                                        </span>
                                    </div>

                                    <p className="mt-3 text-xs leading-6 text-neutral-600">
                                        Controls are easy to understand and the steering feels
                                        very responsive. Battery life is also good for regular
                                        play sessions.
                                    </p>

                                    <div className="mt-3 text-[11px] text-neutral-400">
                                        Amit • Gurugram
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
                    <div className="mb-8 flex items-end justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#927018]">
                                Explore More
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                                You May Also Like
                            </h2>
                        </div>

                        <Link
                            href="/our-products"
                            className="hidden items-center gap-2 text-xs font-bold uppercase tracking-wider transition hover:text-[#927018] sm:flex"
                        >
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
                        {relatedProducts.map((item) => {
                            const image =
                                typeof item.images?.[0] === "string"
                                    ? item.images[0]
                                    : item.images?.[0]?.url;

                            return (
                                <div
                                    key={item._id}
                                    className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <Link
                                        href={`/our-products/${item.slug}`}
                                        className="block"
                                    >
                                        <div className="relative aspect-[4/5] overflow-hidden bg-[#F7F7F5]">
                                            {image && (
                                                <img
                                                    src={image}
                                                    alt={item.name}
                                                    className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-105 sm:p-5"
                                                />
                                            )}
                                        </div>

                                        <div className="p-4">
                                            <p className="line-clamp-2 text-sm font-semibold leading-6">
                                                {item.name}
                                            </p>
                                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                                <span className="text-sm font-bold">
                                                    {formatPrice(item.realPrice)}
                                                </span>
                                                {Number(item.oldPrice) >
                                                    Number(item.realPrice) && (
                                                        <span className="text-xs text-neutral-400 line-through">
                                                            {formatPrice(item.oldPrice)}
                                                        </span>
                                                    )}
                                            </div>
                                        </div>
                                    </Link>

                                    <div className="px-4 pb-4">
                                        <button
                                            type="button"
                                            onClick={() => addToCart(item, item.realPrice, 1)}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#111111] px-3 py-3 text-xs font-bold text-white transition hover:bg-[#C9A227] hover:text-black"
                                        >
                                            <ShoppingCart size={15} />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Image zoom */}
            {zoomOpen && images[selectedImage] && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
                    onClick={() => setZoomOpen(false)}
                >
                    <button
                        type="button"
                        onClick={() => setZoomOpen(false)}
                        aria-label="Close image zoom"
                        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black"
                    >
                        <X size={22} />
                    </button>

                    <img
                        src={images[selectedImage]}
                        alt={product.name}
                        onClick={(event) => event.stopPropagation()}
                        className="max-h-[90vh] max-w-full rounded-xl object-contain"
                    />

                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    changeImage("prev");
                                }}
                                aria-label="Previous image"
                                className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black sm:left-8"
                            >
                                <ChevronLeft />
                            </button>
                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    changeImage("next");
                                }}
                                aria-label="Next image"
                                className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-black sm:right-8"
                            >
                                <ChevronRight />
                            </button>
                        </>
                    )}
                </div>
            )}
        </main>
    );
}

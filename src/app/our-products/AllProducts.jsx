"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, SlidersHorizontal, X, Heart, ShoppingCart } from "lucide-react";

const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN")}`;

export default function AllProducts() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [mobileFilters, setMobileFilters] = useState(false);

    const [wishlist, setWishlist] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const [productsResponse, categoriesResponse] =
                    await Promise.all([
                        fetch("/api/products", { cache: "no-store" }),
                        fetch("/api/categories", { cache: "no-store" }),
                    ]);

                const productsData = await productsResponse.json();
                const categoriesData = await categoriesResponse.json();

                if (!productsResponse.ok) {
                    throw new Error(
                        productsData.message || "Failed to load products"
                    );
                }

                if (!categoriesResponse.ok) {
                    throw new Error(
                        categoriesData.message || "Failed to load categories"
                    );
                }

                setProducts(productsData.products || []);
                setCategories(
                    (categoriesData.categories || []).filter(
                        (category) => category.status === "active"
                    )
                );
            } catch (error) {
                console.error("PRODUCT FETCH ERROR:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const categoryId =
                product.category?._id || product.category;

            const matchesCategory =
                selectedCategory === "all" ||
                String(categoryId) === String(selectedCategory);

            const query = search.trim().toLowerCase();

            const matchesSearch =
                !query ||
                product.name?.toLowerCase().includes(query) ||
                product.slug?.toLowerCase().includes(query) ||
                product.shortDescription?.toLowerCase().includes(query);

            return (
                product.status === "active" &&
                matchesCategory &&
                matchesSearch
            );
        });
    }, [products, selectedCategory, search]);

    const CategoryFilters = () => (
        <div className="space-y-1">
            <button
                type="button"
                onClick={() => {
                    setSelectedCategory("all");
                    setMobileFilters(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition ${selectedCategory === "all"
                    ? "bg-[#111111] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                    }`}
            >
                <span>All Products</span>
                <span>{products.filter((p) => p.status === "active").length}</span>
            </button>

            {categories.map((category) => {
                const count = products.filter((product) => {
                    const id = product.category?._id || product.category;
                    return (
                        String(id) === String(category._id) &&
                        product.status === "active"
                    );
                }).length;

                return (
                    <button
                        type="button"
                        key={category._id}
                        onClick={() => {
                            setSelectedCategory(category._id);
                            setMobileFilters(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition ${selectedCategory === category._id
                            ? "bg-[#111111] text-white"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        <span>{category.name}</span>
                        <span>{count}</span>
                    </button>
                );
            })}
        </div>
    );

    return (
        <main className="min-h-screen bg-[#F7F7F5] text-[#111111]">
            {/* PAGE HEADER */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A227]">
                        Explore Our Collection
                    </p>

                    <h1 className="font-serif text-4xl font-semibold sm:text-5xl">
                        All Products
                    </h1>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                        Explore our collection and find the right products
                        for your needs.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* SEARCH + MOBILE FILTER */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row">
                    <div className="relative flex-1">
                        <Search
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products..."
                            className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#C9A227]"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => setMobileFilters(true)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium lg:hidden"
                    >
                        <SlidersHorizontal size={17} />
                        Categories
                    </button>
                </div>

                <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
                    {/* DESKTOP CATEGORY SIDEBAR */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-20 rounded-2xl border border-gray-200 bg-white p-4">
                            <h2 className="mb-4 px-3 font-serif text-xl font-semibold">
                                Categories
                            </h2>

                            <CategoryFilters />
                        </div>
                    </aside>

                    {/* PRODUCT GRID */}
                    <div>
                        <div className="mb-5 flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                {loading
                                    ? "Loading products..."
                                    : `${filteredProducts.length} products found`}
                            </p>

                            {selectedCategory !== "all" && (
                                <button
                                    type="button"
                                    onClick={() => setSelectedCategory("all")}
                                    className="text-sm font-medium text-[#9A7718] hover:underline"
                                >
                                    Clear filter
                                </button>
                            )}
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="animate-pulse"
                                    >
                                        <div className="aspect-[4/5] rounded-2xl bg-gray-200" />
                                        <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
                                        <div className="mt-3 h-4 w-1/3 rounded bg-gray-200" />
                                    </div>
                                ))}
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center">
                                <h2 className="font-serif text-2xl font-semibold">
                                    No products found
                                </h2>
                                <p className="mt-3 text-sm text-gray-500">
                                    Try another search or category.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch("");
                                        setSelectedCategory("all");
                                    }}
                                    className="mt-6 rounded-xl bg-[#111111] px-5 py-3 text-sm font-medium text-white hover:bg-[#C9A227]"
                                >
                                    Clear filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3">
                                {filteredProducts.map((product) => {
                                    const image =
                                        product.images?.[0]?.url ||
                                        "/placeholder-product.png";

                                    return (
                                        <Link
                                            href={`/our-products/${product.slug}`}
                                            key={product._id}
                                            className="group min-w-0 rounded-2xl"
                                        >
                                            <div className="relative aspect-[4/4] overflow-hidden bg-white">
                                                <Image
                                                    src={image}
                                                    alt={product.name}
                                                    fill
                                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                                                    className="object-cover transition duration-500 group-hover:scale-105"
                                                />

                                                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#111111]">
                                                    {product.category?.name || "Product"}
                                                </span>

                                                {/* Wishlist */}
                                                <button
                                                    type="button"
                                                    aria-label="Add to wishlist"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();

                                                        setWishlist((prev) =>
                                                            prev.includes(product._id)
                                                                ? prev.filter((id) => id !== product._id)
                                                                : [...prev, product._id]
                                                        );
                                                    }}
                                                    className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-[#C9A227]"
                                                >
                                                    <Heart
                                                        size={18}
                                                        className={
                                                            wishlist.includes(product._id)
                                                                ? "fill-red-500 text-red-500"
                                                                : "text-[#111111]"
                                                        }
                                                    />
                                                </button>

                                                {/* Add to Cart */}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();

                                                        window.dispatchEvent(
                                                            new CustomEvent("add-to-cart", {
                                                                detail: {
                                                                    _id: product._id,
                                                                    name: product.name,
                                                                    slug: product.slug,
                                                                    price: Number(product.realPrice),
                                                                    image,
                                                                    quantity: 1,
                                                                },
                                                            })
                                                        );
                                                    }}
                                                    className="absolute bottom-3 left-3 right-3 z-10 flex translate-y-2 items-center justify-center gap-2 rounded-xl bg-[#111111] px-3 py-3 text-xs font-semibold text-white opacity-100 transition hover:bg-[#C9A227] sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
                                                >
                                                    <ShoppingCart size={16} />
                                                    Add to Cart
                                                </button>
                                            </div>

                                            <div className="bg-white px-3 py-4">
                                                <h2 className="line-clamp-2 text-sm font-semibold leading-6 sm:text-base">
                                                    {product.name}
                                                </h2>

                                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                                    <span className="font-semibold text-[#111111]">
                                                        {formatPrice(product.realPrice)}
                                                    </span>

                                                    {Number(product.oldPrice) > Number(product.realPrice) && (
                                                        <span className="text-xs text-gray-400 line-through">
                                                            {formatPrice(product.oldPrice)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* MOBILE CATEGORY DRAWER */}
            {mobileFilters && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <button
                        type="button"
                        aria-label="Close categories"
                        onClick={() => setMobileFilters(false)}
                        className="absolute inset-0 bg-black/50"
                    />

                    <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-3xl bg-white p-5">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="font-serif text-2xl font-semibold">
                                Categories
                            </h2>

                            <button
                                type="button"
                                onClick={() => setMobileFilters(false)}
                                className="rounded-full bg-gray-100 p-2"
                                aria-label="Close"
                            >
                                <X size={19} />
                            </button>
                        </div>

                        <CategoryFilters />
                    </div>
                </div>
            )}
        </main>
    );
}
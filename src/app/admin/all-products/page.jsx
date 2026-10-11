"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/admin/Sidebar";
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    Eye,
    Package,
} from "lucide-react";

export default function Page() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    // =====================================================
    // FETCH PRODUCTS
    // =====================================================

    const fetchProducts = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                "/api/products",
                {
                    method: "GET",
                    cache: "no-store",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                        "Failed to fetch products"
                );
            }

            setProducts(data.products || []);
        } catch (error) {
            console.error(
                "FETCH PRODUCTS ERROR:",
                error
            );

            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // FETCH CATEGORIES
    // =====================================================

    const fetchCategories = async () => {
        try {
            const response = await fetch(
                "/api/categories",
                {
                    method: "GET",
                    cache: "no-store",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                        "Failed to fetch categories"
                );
            }

            setCategories(data.categories || []);
        } catch (error) {
            console.error(
                "FETCH CATEGORIES ERROR:",
                error
            );
        }
    };

    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // =====================================================
    // DELETE PRODUCT
    // =====================================================

    const deleteProduct = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?\n\nThis will also delete all product images from Cloudflare R2."
        );

        if (!confirmDelete) {
            return;
        }

        try {
            setDeletingId(id);

            const response = await fetch(
                `/api/products/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                        "Failed to delete product"
                );
            }

            setProducts((prev) =>
                prev.filter(
                    (product) =>
                        product._id !== id
                )
            );

            alert(
                "Product deleted successfully"
            );
        } catch (error) {
            console.error(
                "DELETE PRODUCT ERROR:",
                error
            );

            alert(error.message);
        } finally {
            setDeletingId(null);
        }
    };

    // =====================================================
    // CATEGORY OPTIONS
    // =====================================================

    const categoryOptions = useMemo(() => {
        return [
            "All",
            ...categories.map(
                (item) => item.name
            ),
        ];
    }, [categories]);

    // =====================================================
    // FILTER PRODUCTS
    // =====================================================

    const filteredProducts = useMemo(() => {
        const searchValue =
            search.toLowerCase().trim();

        return products.filter((product) => {
            const productName =
                product.name?.toLowerCase() || "";

            const productSlug =
                product.slug?.toLowerCase() || "";

            const categoryName =
                product.category?.name || "";

            const matchesSearch =
                !searchValue ||
                productName.includes(
                    searchValue
                ) ||
                productSlug.includes(
                    searchValue
                );

            const matchesCategory =
                category === "All" ||
                categoryName === category;

            return (
                matchesSearch &&
                matchesCategory
            );
        });
    }, [
        products,
        search,
        category,
    ]);

    // =====================================================
    // STATS
    // =====================================================

    const activeProducts =
        products.filter(
            (product) =>
                product.status === "active"
        ).length;

    const inactiveProducts =
        products.filter(
            (product) =>
                product.status === "inactive"
        ).length;

    return (
        <div className="min-h-screen bg-[#F7F7F5]">
            <Sidebar />

            <main className="pt-16 lg:ml-[270px] lg:pt-0">
                <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">

                    {/* HEADER */}

                    <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="font-serif text-3xl font-semibold text-[#111111]">
                                All Products
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage all products, prices, packs and categories.
                            </p>
                        </div>

                        <Link
                            href="/admin/add-product"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C9A227] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#b28d20]"
                        >
                            <Plus size={18} />
                            Add Product
                        </Link>
                    </div>

                    {/* TOP STATS */}

                    <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

                        {/* TOTAL */}

                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A227]/10">
                                <Package
                                    size={20}
                                    className="text-[#C9A227]"
                                />
                            </div>

                            <p className="text-sm text-gray-500">
                                Total Products
                            </p>

                            <p className="mt-1 text-2xl font-semibold text-[#111111]">
                                {products.length}
                            </p>
                        </div>

                        {/* ACTIVE */}

                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Active Products
                            </p>

                            <p className="mt-2 text-2xl font-semibold text-[#111111]">
                                {activeProducts}
                            </p>
                        </div>

                        {/* INACTIVE */}

                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Inactive Products
                            </p>

                            <p className="mt-2 text-2xl font-semibold text-[#111111]">
                                {inactiveProducts}
                            </p>
                        </div>

                        {/* CATEGORIES */}

                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Categories
                            </p>

                            <p className="mt-2 text-2xl font-semibold text-[#111111]">
                                {categories.length}
                            </p>
                        </div>
                    </div>

                    {/* FILTERS */}

                    <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="flex flex-col gap-3 md:flex-row">

                            {/* SEARCH */}

                            <div className="relative flex-1">
                                <Search
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Search product name or slug..."
                                    className="w-full rounded-xl border border-gray-200 bg-[#F7F7F5] py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#C9A227]"
                                />
                            </div>

                            {/* CATEGORY */}

                            <select
                                value={category}
                                onChange={(e) =>
                                    setCategory(
                                        e.target.value
                                    )
                                }
                                className="rounded-xl border border-gray-200 bg-[#F7F7F5] px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#C9A227]"
                            >
                                {categoryOptions.map(
                                    (item) => (
                                        <option
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    </div>

                    {/* TABLE */}

                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[1100px] text-left">

                                <thead className="border-b border-gray-200 bg-[#F7F7F5]">
                                    <tr>

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Product
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Category
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Old Price
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Real Price
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Packs
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Status
                                        </th>

                                        <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Actions
                                        </th>

                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">

                                    {/* LOADING */}

                                    {loading ? (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="px-5 py-16 text-center"
                                            >
                                                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#C9A227]" />

                                                <p className="mt-4 text-sm text-gray-500">
                                                    Loading products...
                                                </p>
                                            </td>
                                        </tr>
                                    ) : filteredProducts.length >
                                      0 ? (
                                        filteredProducts.map(
                                            (product) => {

                                                const image =
                                                    product.images?.[0]?.url ||
                                                    "/placeholder-product.png";

                                                const categoryName =
                                                    product.category?.name ||
                                                    "Uncategorized";

                                                return (
                                                    <tr
                                                        key={
                                                            product._id
                                                        }
                                                        className="transition hover:bg-[#F7F7F5]/70"
                                                    >

                                                        {/* PRODUCT */}

                                                        <td className="px-5 py-4">
                                                            <div className="flex items-center gap-4">

                                                                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-[#F7F7F5]">
                                                                    <img
                                                                        src={
                                                                            image
                                                                        }
                                                                        alt={
                                                                            product.name
                                                                        }
                                                                        className="h-full w-full object-cover"
                                                                    />
                                                                </div>

                                                                <div className="min-w-0">

                                                                    <p className="max-w-[260px] truncate font-medium text-[#111111]">
                                                                        {
                                                                            product.name
                                                                        }
                                                                    </p>

                                                                    <p className="mt-1 max-w-[260px] truncate text-xs text-gray-400">
                                                                        /
                                                                        {
                                                                            product.slug
                                                                        }
                                                                    </p>

                                                                </div>

                                                            </div>
                                                        </td>

                                                        {/* CATEGORY */}

                                                        <td className="px-5 py-4">
                                                            <span className="rounded-full bg-[#111111] px-3 py-1.5 text-xs font-medium text-white">
                                                                {
                                                                    categoryName
                                                                }
                                                            </span>
                                                        </td>

                                                        {/* OLD PRICE */}

                                                        <td className="px-5 py-4 text-sm text-gray-400 line-through">
                                                            ₹
                                                            {Number(
                                                                product.oldPrice ||
                                                                    0
                                                            ).toLocaleString(
                                                                "en-IN"
                                                            )}
                                                        </td>

                                                        {/* REAL PRICE */}

                                                        <td className="px-5 py-4">
                                                            <span className="font-semibold text-[#111111]">
                                                                ₹
                                                                {Number(
                                                                    product.realPrice ||
                                                                        0
                                                                ).toLocaleString(
                                                                    "en-IN"
                                                                )}
                                                            </span>
                                                        </td>

                                                        {/* PACKS */}

                                                        <td className="px-5 py-4">
                                                            <div className="flex max-w-[280px] flex-wrap gap-1.5">

                                                                {product.packs?.length >
                                                                0 ? (
                                                                    product.packs.map(
                                                                        (
                                                                            pack,
                                                                            index
                                                                        ) => (
                                                                            <span
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className="rounded-lg border border-[#C9A227]/30 bg-[#C9A227]/5 px-2.5 py-1 text-xs text-gray-700"
                                                                            >
                                                                                {
                                                                                    pack.name
                                                                                }
                                                                            </span>
                                                                        )
                                                                    )
                                                                ) : (
                                                                    <span className="text-xs text-gray-400">
                                                                        No
                                                                        packs
                                                                    </span>
                                                                )}

                                                            </div>
                                                        </td>

                                                        {/* STATUS */}

                                                        <td className="px-5 py-4">

                                                            <span
                                                                className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${
                                                                    product.status ===
                                                                    "active"
                                                                        ? "bg-green-50 text-green-700"
                                                                        : "bg-red-50 text-red-600"
                                                                }`}
                                                            >
                                                                {product.status ===
                                                                "active"
                                                                    ? "Active"
                                                                    : "Inactive"}
                                                            </span>

                                                        </td>

                                                        {/* ACTIONS */}

                                                        <td className="px-5 py-4">

                                                            <div className="flex justify-end gap-2">

                                                                {/* VIEW */}

                                                                <Link
                                                                    href={`/products/${product.slug}`}
                                                                    target="_blank"
                                                                    className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:border-[#C9A227] hover:text-[#C9A227]"
                                                                    title="View Product"
                                                                >
                                                                    <Eye
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </Link>

                                                                {/* EDIT */}

                                                                <Link
                                                                    href={`/admin/edit-product/${product._id}`}
                                                                    className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:border-[#C9A227] hover:text-[#C9A227]"
                                                                    title="Edit Product"
                                                                >
                                                                    <Pencil
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </Link>

                                                                {/* DELETE */}

                                                                <button
                                                                    type="button"
                                                                    disabled={
                                                                        deletingId ===
                                                                        product._id
                                                                    }
                                                                    onClick={() =>
                                                                        deleteProduct(
                                                                            product._id
                                                                        )
                                                                    }
                                                                    className="rounded-lg border border-red-100 p-2 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    title="Delete Product"
                                                                >
                                                                    {deletingId ===
                                                                    product._id ? (
                                                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-red-500" />
                                                                    ) : (
                                                                        <Trash2
                                                                            size={
                                                                                16
                                                                            }
                                                                        />
                                                                    )}
                                                                </button>

                                                            </div>

                                                        </td>

                                                    </tr>
                                                );
                                            }
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="px-5 py-16 text-center"
                                            >
                                                <Package
                                                    size={40}
                                                    className="mx-auto text-gray-300"
                                                />

                                                <p className="mt-4 font-medium text-gray-600">
                                                    No products found
                                                </p>

                                                <p className="mt-1 text-sm text-gray-400">
                                                    Try changing your search or
                                                    category filter.
                                                </p>
                                            </td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>

                        {/* FOOTER */}

                        <div className="border-t border-gray-200 px-5 py-4">
                            <p className="text-sm text-gray-500">
                                Showing{" "}
                                <span className="font-medium text-gray-900">
                                    {
                                        filteredProducts.length
                                    }
                                </span>{" "}
                                of{" "}
                                <span className="font-medium text-gray-900">
                                    {products.length}
                                </span>{" "}
                                products
                            </p>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
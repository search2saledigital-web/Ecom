"use client";

import React, { useState } from "react";
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

const productsData = [
    {
        id: 1,
        name: "Premium Executive Gift Set",
        slug: "premium-executive-gift-set",
        category: "Corporate Gifts",
        image: "/products/product-1.jpg",
        oldPrice: 2499,
        realPrice: 1999,
        packs: [
            { name: "10 Pack Box", quantity: 10, price: 1799 },
            { name: "50 Pack Box", quantity: 50, price: 7999 },
            { name: "100 Pack Box", quantity: 100, price: 14999 },
        ],
        status: "Active",
    },
    {
        id: 2,
        name: "Premium Office Organizer",
        slug: "premium-office-organizer",
        category: "Office Products",
        image: "/products/product-2.jpg",
        oldPrice: 1299,
        realPrice: 999,
        packs: [
            { name: "10 Pack Box", quantity: 10, price: 899 },
            { name: "100 Pack Box", quantity: 100, price: 7499 },
        ],
        status: "Active",
    },
    {
        id: 3,
        name: "Decorative Table Set",
        slug: "decorative-table-set",
        category: "Decorative Products",
        image: "/products/decor-1.jpg",
        oldPrice: 1799,
        realPrice: 1499,
        packs: [
            { name: "10 Pack Box", quantity: 10, price: 1299 },
            { name: "50 Pack Box", quantity: 50, price: 5999 },
        ],
        status: "Active",
    },
    {
        id: 4,
        name: "Luxury Corporate Pen",
        slug: "luxury-corporate-pen",
        category: "Corporate Gifts",
        image: "/products/product-3.jpg",
        oldPrice: 599,
        realPrice: 449,
        packs: [
            { name: "10 Pack Box", quantity: 10, price: 399 },
            { name: "100 Pack Box", quantity: 100, price: 3499 },
        ],
        status: "Inactive",
    },
];

export default function Page() {
    const [products, setProducts] = useState(productsData);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const categories = [
        "All",
        "Corporate Gifts",
        "Office Products",
        "Decorative Products",
    ];

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            product.slug
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            category === "All" ||
            product.category === category;

        return matchesSearch && matchesCategory;
    });

    const deleteProduct = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        setProducts((prev) =>
            prev.filter((product) => product.id !== id)
        );
    };

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

                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Active Products
                            </p>

                            <p className="mt-2 text-2xl font-semibold text-[#111111]">
                                {
                                    products.filter(
                                        (product) =>
                                            product.status === "Active"
                                    ).length
                                }
                            </p>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Inactive Products
                            </p>

                            <p className="mt-2 text-2xl font-semibold text-[#111111]">
                                {
                                    products.filter(
                                        (product) =>
                                            product.status === "Inactive"
                                    ).length
                                }
                            </p>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Categories
                            </p>

                            <p className="mt-2 text-2xl font-semibold text-[#111111]">
                                {categories.length - 1}
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
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search product name or slug..."
                                    className="w-full rounded-xl border border-gray-200 bg-[#F7F7F5] py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#C9A227]"
                                />
                            </div>

                            {/* CATEGORY */}
                            <select
                                value={category}
                                onChange={(e) =>
                                    setCategory(e.target.value)
                                }
                                className="rounded-xl border border-gray-200 bg-[#F7F7F5] px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#C9A227]"
                            >
                                {categories.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>

                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                        {/* MOBILE SCROLL */}
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

                                    {filteredProducts.length > 0 ? (
                                        filteredProducts.map((product) => (
                                            <tr
                                                key={product.id}
                                                className="transition hover:bg-[#F7F7F5]/70"
                                            >

                                                {/* PRODUCT */}
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-4">

                                                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-[#F7F7F5]">
                                                            <img
                                                                src={product.image}
                                                                alt={product.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="max-w-[260px] truncate font-medium text-[#111111]">
                                                                {product.name}
                                                            </p>

                                                            <p className="mt-1 max-w-[260px] truncate text-xs text-gray-400">
                                                                /{product.slug}
                                                            </p>
                                                        </div>

                                                    </div>
                                                </td>

                                                {/* CATEGORY */}
                                                <td className="px-5 py-4">
                                                    <span className="rounded-full bg-[#111111] px-3 py-1.5 text-xs font-medium text-white">
                                                        {product.category}
                                                    </span>
                                                </td>

                                                {/* OLD PRICE */}
                                                <td className="px-5 py-4 text-sm text-gray-400 line-through">
                                                    ₹{product.oldPrice.toLocaleString("en-IN")}
                                                </td>

                                                {/* REAL PRICE */}
                                                <td className="px-5 py-4">
                                                    <span className="font-semibold text-[#111111]">
                                                        ₹{product.realPrice.toLocaleString("en-IN")}
                                                    </span>
                                                </td>

                                                {/* PACKS */}
                                                <td className="px-5 py-4">
                                                    <div className="flex max-w-[280px] flex-wrap gap-1.5">
                                                        {product.packs.map(
                                                            (pack, index) => (
                                                                <span
                                                                    key={index}
                                                                    className="rounded-lg border border-[#C9A227]/30 bg-[#C9A227]/5 px-2.5 py-1 text-xs text-gray-700"
                                                                >
                                                                    {pack.name}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                </td>

                                                {/* STATUS */}
                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${product.status ===
                                                            "Active"
                                                            ? "bg-green-50 text-green-700"
                                                            : "bg-red-50 text-red-600"
                                                            }`}
                                                    >
                                                        {product.status}
                                                    </span>
                                                </td>

                                                {/* ACTIONS */}
                                                <td className="px-5 py-4">
                                                    <div className="flex justify-end gap-2">

                                                        <Link
                                                            href={`/products/${product.slug}`}
                                                            target="_blank"
                                                            className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:border-[#C9A227] hover:text-[#C9A227]"
                                                            title="View Product"
                                                        >
                                                            <Eye size={16} />
                                                        </Link>

                                                        <Link
                                                            href={`/admin/edit-product/${product.id}`}
                                                            className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:border-[#C9A227] hover:text-[#C9A227]"
                                                            title="Edit Product"
                                                        >
                                                            <Pencil size={16} />
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                deleteProduct(
                                                                    product.id
                                                                )
                                                            }
                                                            className="rounded-lg border border-red-100 p-2 text-red-500 transition hover:bg-red-50"
                                                            title="Delete Product"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>

                                                    </div>
                                                </td>

                                            </tr>
                                        ))
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
                                    {filteredProducts.length}
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
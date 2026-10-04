"use client";

import React, { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import {
    Plus,
    Layers,
    Search,
    Pencil,
    Trash2,
    ImagePlus,
    X,
    FolderOpen,
} from "lucide-react";

const initialCategories = [
    {
        id: 1,
        name: "Corporate Gifts",
        slug: "corporate-gifts",
        image: "",
        metaTitle: "Premium Corporate Gifts",
        metaDescription: "Explore premium corporate gifting solutions.",
        createdAt: "04 Oct 2026",
    },
    {
        id: 2,
        name: "Office Products",
        slug: "office-products",
        image: "",
        metaTitle: "Office Products",
        metaDescription: "Discover premium office essentials.",
        createdAt: "03 Oct 2026",
    },
    {
        id: 3,
        name: "Decorative Products",
        slug: "decorative-products",
        image: "",
        metaTitle: "Decorative Products",
        metaDescription: "Explore elegant decorative products.",
        createdAt: "02 Oct 2026",
    },
];

const emptyForm = {
    name: "",
    slug: "",
    image: "",
    metaTitle: "",
    metaDescription: "",
};

export default function CategoriesPage() {
    const [activeTab, setActiveTab] = useState("all");
    const [categories, setCategories] = useState(initialCategories);
    const [form, setForm] = useState(emptyForm);
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState(null);

    const generateSlug = (value) =>
        value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

    const handleNameChange = (value) => {
        setForm((prev) => ({
            ...prev,
            name: value,
            slug: editingId
                ? prev.slug
                : generateSlug(value),
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            return;
        }

        const imageUrl = URL.createObjectURL(file);

        setForm((prev) => ({
            ...prev,
            image: imageUrl,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingId) {
            setCategories((prev) =>
                prev.map((category) =>
                    category.id === editingId
                        ? { ...category, ...form }
                        : category
                )
            );
        } else {
            setCategories((prev) => [
                {
                    id: Date.now(),
                    ...form,
                    createdAt: new Date().toLocaleDateString(
                        "en-IN",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        }
                    ),
                },
                ...prev,
            ]);
        }

        setForm(emptyForm);
        setEditingId(null);
        setActiveTab("all");
    };

    const handleEdit = (category) => {
        setForm({
            name: category.name,
            slug: category.slug,
            image: category.image,
            metaTitle: category.metaTitle,
            metaDescription: category.metaDescription,
        });

        setEditingId(category.id);
        setActiveTab("add");
    };

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) {
            return;
        }

        setCategories((prev) =>
            prev.filter((category) => category.id !== id)
        );
    };

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase())
    );

    const inputClass =
        "w-full rounded-xl border border-black/10 bg-[#FAFAF8] px-4 py-3.5 text-sm text-[#111111] outline-none transition-all placeholder:text-gray-400 focus:border-[#C9A227] focus:bg-white";

    return (
        <div className="min-h-screen bg-[#F5F5F3]">
            <Sidebar />

            <main className="min-h-screen pt-16 lg:ml-[270px] lg:pt-0">
                <div className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">

                    {/* Header */}
                    <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A47D12]">
                                Store Management
                            </p>

                            <h1 className="mt-2 font-serif text-3xl font-medium text-[#111111] sm:text-4xl">
                                Categories
                            </h1>

                            <p className="mt-2 text-xs text-gray-500">
                                Create and manage your product categories.
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                setForm(emptyForm);
                                setEditingId(null);
                                setActiveTab("add");
                            }}
                            className="flex items-center justify-center gap-2 rounded-full bg-[#111111] px-5 py-3.5 text-[10px] font-semibold uppercase tracking-wider text-white transition-all hover:bg-[#C9A227] hover:text-black"
                        >
                            <Plus size={16} />
                            Add Category
                        </button>
                    </div>

                    {/* Summary */}
                    <div className="mb-7 rounded-2xl border border-black/[0.04] bg-white p-5 shadow-sm sm:p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C9A227]/10 text-[#A47D12]">
                                <Layers size={21} />
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    Total Categories
                                </p>
                                <h2 className="mt-1 text-2xl font-semibold text-[#111111]">
                                    {categories.length}
                                </h2>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mb-6 flex gap-2 border-b border-black/10">
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`relative px - 5 py - 4 text - xs font - semibold transition - colors ${activeTab === "all"
                                    ? "text-[#A47D12]"
                                    : "text-gray-500 hover:text-[#111111]"
                                } `}
                        >
                            All Categories

                            {activeTab === "all" && (
                                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#C9A227]" />
                            )}
                        </button>

                        <button
                            onClick={() => {
                                setActiveTab("add");
                                setEditingId(null);
                                setForm(emptyForm);
                            }}
                            className={`relative px - 5 py - 4 text - xs font - semibold transition - colors ${activeTab === "add"
                                    ? "text-[#A47D12]"
                                    : "text-gray-500 hover:text-[#111111]"
                                } `}
                        >
                            Add Category

                            {activeTab === "add" && (
                                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#C9A227]" />
                            )}
                        </button>
                    </div>

                    {/* Add Category Form */}
                    {activeTab === "add" && (
                        <div className="rounded-2xl border border-black/[0.04] bg-white p-5 shadow-sm sm:p-8">
                            <div className="mb-7 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A227]/10 text-[#A47D12]">
                                    <FolderOpen size={19} />
                                </div>

                                <div>
                                    <h2 className="font-serif text-xl font-medium text-[#111111]">
                                        {editingId
                                            ? "Edit Category"
                                            : "Create New Category"}
                                    </h2>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Enter category details below.
                                    </p>
                                </div>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Name */}
                                    <div>
                                        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                                            Category Name *
                                        </label>

                                        <input
                                            required
                                            value={form.name}
                                            onChange={(e) =>
                                                handleNameChange(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="e.g. Corporate Gifts"
                                            className={inputClass}
                                        />
                                    </div>

                                    {/* Slug */}
                                    <div>
                                        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                                            Category Slug *
                                        </label>

                                        <input
                                            required
                                            value={form.slug}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    slug: generateSlug(
                                                        e.target.value
                                                    ),
                                                })
                                            }
                                            placeholder="corporate-gifts"
                                            className={inputClass}
                                        />

                                        <p className="mt-2 text-[10px] text-gray-400">
                                            URL: /category/{form.slug || "category-slug"}
                                        </p>
                                    </div>

                                    {/* Image */}
                                    <div className="md:col-span-2">
                                        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                                            Category Image
                                        </label>

                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                            <label className="flex min-h-[130px] w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-black/10 bg-[#FAFAF8] transition-colors hover:border-[#C9A227] sm:max-w-[250px]">
                                                <ImagePlus
                                                    size={25}
                                                    className="text-[#A47D12]"
                                                />
                                                <span className="mt-3 text-xs font-medium text-gray-600">
                                                    Upload Category Image
                                                </span>
                                                <span className="mt-1 text-[10px] text-gray-400">
                                                    JPG, PNG, WEBP
                                                </span>

                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                />
                                            </label>

                                            {form.image && (
                                                <div className="relative h-[130px] w-[130px] overflow-hidden rounded-xl border border-black/10 bg-gray-100">
                                                    <img
                                                        src={form.image}
                                                        alt="Category preview"
                                                        className="h-full w-full object-cover"
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setForm({
                                                                ...form,
                                                                image: "",
                                                            })
                                                        }
                                                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white"
                                                        aria-label="Remove image"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Meta Title */}
                                    <div>
                                        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                                            Meta Title
                                        </label>

                                        <input
                                            value={form.metaTitle}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    metaTitle: e.target.value,
                                                })
                                            }
                                            placeholder="SEO title"
                                            className={inputClass}
                                        />
                                    </div>

                                    {/* Meta Description */}
                                    <div>
                                        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                                            Meta Description
                                        </label>

                                        <textarea
                                            rows={3}
                                            value={form.metaDescription}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    metaDescription: e.target.value,
                                                })
                                            }
                                            placeholder="Write SEO description..."
                                            className={`${inputClass} resize - none`}
                                        />
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col-reverse gap-3 border-t border-black/[0.06] pt-6 sm:flex-row sm:justify-end">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setForm(emptyForm);
                                            setEditingId(null);
                                            setActiveTab("all");
                                        }}
                                        className="rounded-full border border-black/10 px-6 py-3.5 text-[10px] font-semibold uppercase tracking-wider text-gray-600 transition-colors hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="flex items-center justify-center gap-2 rounded-full bg-[#111111] px-7 py-3.5 text-[10px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#C9A227] hover:text-black"
                                    >
                                        <Plus size={15} />
                                        {editingId
                                            ? "Update Category"
                                            : "Save Category"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* All Categories Table */}
                    {activeTab === "all" && (
                        <div className="overflow-hidden rounded-2xl border border-black/[0.04] bg-white shadow-sm">
                            <div className="flex flex-col justify-between gap-4 border-b border-black/[0.06] p-5 sm:flex-row sm:items-center sm:p-6">
                                <div>
                                    <h2 className="font-serif text-xl font-medium text-[#111111]">
                                        All Categories
                                    </h2>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Manage your existing categories.
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 rounded-lg border border-black/10 px-3 py-2.5">
                                    <Search
                                        size={15}
                                        className="text-gray-400"
                                    />
                                    <input
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        placeholder="Search category..."
                                        className="w-full bg-transparent text-xs outline-none sm:w-44"
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[750px] text-left">
                                    <thead className="bg-[#FAFAF8]">
                                        <tr className="text-[9px] uppercase tracking-[0.15em] text-gray-500">
                                            <th className="px-5 py-4 font-semibold">
                                                Category
                                            </th>
                                            <th className="px-5 py-4 font-semibold">
                                                Slug
                                            </th>
                                            <th className="px-5 py-4 font-semibold">
                                                Meta Title
                                            </th>
                                            <th className="px-5 py-4 font-semibold">
                                                Created
                                            </th>
                                            <th className="px-5 py-4 text-right font-semibold">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredCategories.map(
                                            (category) => (
                                                <tr
                                                    key={category.id}
                                                    className="border-t border-black/[0.05] transition-colors hover:bg-[#FAFAF8]"
                                                >
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#C9A227]/10 text-[#A47D12]">
                                                                {category.image ? (
                                                                    <img
                                                                        src={category.image}
                                                                        alt={category.name}
                                                                        className="h-full w-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <FolderOpen
                                                                        size={18}
                                                                    />
                                                                )}
                                                            </div>

                                                            <span className="text-xs font-semibold text-[#111111]">
                                                                {category.name}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4 text-xs text-gray-500">
                                                        {category.slug}
                                                    </td>

                                                    <td className="max-w-[200px] truncate px-5 py-4 text-xs text-gray-500">
                                                        {category.metaTitle || "—"}
                                                    </td>

                                                    <td className="whitespace-nowrap px-5 py-4 text-xs text-gray-500">
                                                        {category.createdAt}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        category
                                                                    )
                                                                }
                                                                aria-label="Edit category"
                                                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C9A227]/10 text-[#A47D12] transition-colors hover:bg-[#C9A227] hover:text-black"
                                                            >
                                                                <Pencil
                                                                    size={14}
                                                                />
                                                            </button>

                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        category.id
                                                                    )
                                                                }
                                                                aria-label="Delete category"
                                                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition-colors hover:bg-red-500 hover:text-white"
                                                            >
                                                                <Trash2
                                                                    size={14}
                                                                />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}

                                        {filteredCategories.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="px-5 py-12 text-center text-sm text-gray-400"
                                                >
                                                    No categories found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="border-t border-black/[0.05] px-5 py-4">
                                <p className="text-[10px] text-gray-500">
                                    Showing {filteredCategories.length} of{" "}
                                    {categories.length} categories
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
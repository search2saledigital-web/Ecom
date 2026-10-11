"use client";

import React, { useEffect, useState } from "react";
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
    Loader2,
} from "lucide-react";

const emptyForm = {
    name: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",
};

export default function CategoriesPage() {
    const [activeTab, setActiveTab] = useState("all");
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const generateSlug = (value) => value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

    // --------------------------------------------------
    // GET ALL CATEGORIES
    // --------------------------------------------------

    const fetchCategories = async () => {
        try {
            setLoading(true);

            const response = await fetch("/api/categories", {
                method: "GET",
                cache: "no-store",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch categories"
                );
            }

            setCategories(data.categories || []);
        } catch (error) {
            console.error("FETCH CATEGORIES ERROR:", error);
            alert(error.message || "Failed to load categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // --------------------------------------------------
    // NAME / SLUG
    // --------------------------------------------------

    const handleNameChange = (value) => {
        setForm((prev) => ({
            ...prev,
            name: value,
            slug: editingId ? prev.slug : generateSlug(value),
        }));
    };

    const handleSlugChange = (value) => {
        setForm((prev) => ({
            ...prev,
            slug: generateSlug(value),
        }));
    };

    // --------------------------------------------------
    // IMAGE
    // --------------------------------------------------

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            return;
        }

        // Optional size limit: 5MB
        if (file.size > 5 * 1024 * 1024) {
            alert("Image size must be less than 5MB.");
            return;
        }

        setImageFile(file);

        const preview = URL.createObjectURL(file);

        setImagePreview(preview);
    };

    const removeImage = () => {
        if (imagePreview?.startsWith("blob:")) {
            URL.revokeObjectURL(imagePreview);
        }

        setImageFile(null);
        setImagePreview("");
    };

    // --------------------------------------------------
    // RESET FORM
    // --------------------------------------------------

    const resetForm = () => {
        if (imagePreview?.startsWith("blob:")) {
            URL.revokeObjectURL(imagePreview);
        }

        setForm(emptyForm);
        setImageFile(null);
        setImagePreview("");
        setEditingId(null);
    };

    // --------------------------------------------------
    // ADD / UPDATE CATEGORY
    // --------------------------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name.trim()) {
            alert("Category name is required.");
            return;
        }

        if (!form.slug.trim()) {
            alert("Category slug is required.");
            return;
        }

        try {
            setSaving(true);

            const formData = new FormData();

            formData.append("name", form.name.trim());
            formData.append("slug", form.slug.trim());
            formData.append(
                "metaTitle",
                form.metaTitle.trim()
            );
            formData.append(
                "metaDescription",
                form.metaDescription.trim()
            );

            // Only send image when user selected a new image
            if (imageFile) {
                formData.append("image", imageFile);
            }

            let url = "/api/categories";
            let method = "POST";

            // UPDATE
            if (editingId) {
                url = `/api/categories/${editingId}`;
                method = "PUT";
            }

            const response = await fetch(url, {
                method,
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    `Failed to ${editingId ? "update" : "add"
                    } category`
                );
            }

            alert(
                data.message ||
                `Category ${editingId ? "updated" : "added"
                } successfully`
            );

            resetForm();

            setActiveTab("all");

            await fetchCategories();
        } catch (error) {
            console.error(
                "SAVE CATEGORY ERROR:",
                error
            );

            alert(
                error.message ||
                "Something went wrong"
            );
        } finally {
            setSaving(false);
        }
    };

    // --------------------------------------------------
    // EDIT
    // --------------------------------------------------

    const handleEdit = (category) => {
        setForm({
            name: category.name || "",
            slug: category.slug || "",
            metaTitle: category.metaTitle || "",
            metaDescription:
                category.metaDescription || "",
        });

        setEditingId(category._id);

        setImageFile(null);
        setImagePreview(category.imageUrl || "");

        setActiveTab("add");
    };

    // --------------------------------------------------
    // DELETE
    // --------------------------------------------------

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this category?\n\nThis will also delete its image from Cloudflare R2."
        );

        if (!confirmed) return;

        try {
            setDeletingId(id);

            const response = await fetch(
                `/api/categories/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to delete category"
                );
            }

            alert(
                data.message ||
                "Category deleted successfully"
            );

            await fetchCategories();
        } catch (error) {
            console.error(
                "DELETE CATEGORY ERROR:",
                error
            );

            alert(
                error.message ||
                "Failed to delete category"
            );
        } finally {
            setDeletingId(null);
        }
    };

    // --------------------------------------------------
    // FILTER
    // --------------------------------------------------

    const filteredCategories = categories.filter((category) =>
        category.name
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
        category.slug
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );

    const inputClass =
        "w-full rounded-xl border border-black/10 bg-[#FAFAF8] px-4 py-3.5 text-sm text-[#111111] outline-none transition-all placeholder:text-gray-400 focus:border-[#C9A227] focus:bg-white";

    // --------------------------------------------------
    // UI
    // --------------------------------------------------

    return (
        <div className="min-h-screen bg-[#F5F5F3]">
            <Sidebar />

            <main className="min-h-screen pt-16 lg:ml-[270px] lg:pt-0">
                <div className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">

                    {/* HEADER */}
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
                            type="button"
                            onClick={() => {
                                resetForm();
                                setActiveTab("add");
                            }}
                            className="flex items-center justify-center gap-2 rounded-full bg-[#111111] px-5 py-3.5 text-[10px] font-semibold uppercase tracking-wider text-white transition-all hover:bg-[#C9A227] hover:text-black"
                        >
                            <Plus size={16} />
                            Add Category
                        </button>
                    </div>

                    {/* SUMMARY */}
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

                    {/* TABS */}
                    <div className="mb-6 flex gap-2 border-b border-black/10">
                        <button
                            type="button"
                            onClick={() =>
                                setActiveTab("all")
                            }
                            className={`relative px-5 py-4 text-xs font-semibold transition-colors ${activeTab === "all"
                                ? "text-[#A47D12]"
                                : "text-gray-500 hover:text-[#111111]"
                                }`}
                        >
                            All Categories

                            {activeTab === "all" && (
                                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#C9A227]" />
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                resetForm();
                                setActiveTab("add");
                            }}
                            className={`relative px-5 py-4 text-xs font-semibold transition-colors ${activeTab === "add"
                                ? "text-[#A47D12]"
                                : "text-gray-500 hover:text-[#111111]"
                                }`}
                        >
                            Add Category

                            {activeTab === "add" && (
                                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#C9A227]" />
                            )}
                        </button>
                    </div>

                    {/* FORM */}
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

                                    {/* NAME */}
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

                                    {/* SLUG */}
                                    <div>
                                        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                                            Category Slug *
                                        </label>

                                        <input
                                            required
                                            value={form.slug}
                                            onChange={(e) =>
                                                handleSlugChange(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="corporate-gifts"
                                            className={inputClass}
                                        />

                                        <p className="mt-2 text-[10px] text-gray-400">
                                            URL: /category/
                                            {form.slug ||
                                                "category-slug"}
                                        </p>
                                    </div>

                                    {/* IMAGE */}
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
                                                    JPG, PNG, WEBP — Max 5MB
                                                </span>

                                                <input
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/webp"
                                                    onChange={
                                                        handleImageChange
                                                    }
                                                    className="hidden"
                                                />
                                            </label>

                                            {imagePreview && (
                                                <div className="relative h-[130px] w-[130px] overflow-hidden rounded-xl border border-black/10 bg-gray-100">
                                                    <img
                                                        src={
                                                            imagePreview
                                                        }
                                                        alt={
                                                            form.name ||
                                                            "Category preview"
                                                        }
                                                        className="h-full w-full object-cover"
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={
                                                            removeImage
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

                                    {/* META TITLE */}
                                    <div>
                                        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                                            Meta Title
                                        </label>

                                        <input
                                            value={
                                                form.metaTitle
                                            }
                                            onChange={(e) =>
                                                setForm(
                                                    (prev) => ({
                                                        ...prev,
                                                        metaTitle:
                                                            e.target
                                                                .value,
                                                    })
                                                )
                                            }
                                            placeholder="SEO title"
                                            className={
                                                inputClass
                                            }
                                        />
                                    </div>

                                    {/* META DESCRIPTION */}
                                    <div>
                                        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                                            Meta Description
                                        </label>

                                        <textarea
                                            rows={3}
                                            value={
                                                form.metaDescription
                                            }
                                            onChange={(e) =>
                                                setForm(
                                                    (prev) => ({
                                                        ...prev,
                                                        metaDescription:
                                                            e.target
                                                                .value,
                                                    })
                                                )
                                            }
                                            placeholder="Write SEO description..."
                                            className={`${inputClass} resize-none`}
                                        />
                                    </div>
                                </div>

                                {/* ACTIONS */}
                                <div className="flex flex-col-reverse gap-3 border-t border-black/[0.06] pt-6 sm:flex-row sm:justify-end">

                                    <button
                                        type="button"
                                        onClick={() => {
                                            resetForm();
                                            setActiveTab(
                                                "all"
                                            );
                                        }}
                                        disabled={saving}
                                        className="rounded-full border border-black/10 px-6 py-3.5 text-[10px] font-semibold uppercase tracking-wider text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex items-center justify-center gap-2 rounded-full bg-[#111111] px-7 py-3.5 text-[10px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#C9A227] hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {saving ? (
                                            <>
                                                <Loader2
                                                    size={15}
                                                    className="animate-spin"
                                                />

                                                {editingId
                                                    ? "Updating..."
                                                    : "Saving..."}
                                            </>
                                        ) : (
                                            <>
                                                <Plus
                                                    size={15}
                                                />

                                                {editingId
                                                    ? "Update Category"
                                                    : "Save Category"}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* ALL CATEGORIES */}
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
                                            setSearch(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Search category..."
                                        className="w-full bg-transparent text-xs outline-none sm:w-44"
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">

                                <table className="w-full min-w-[800px] text-left">

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

                                        {loading ? (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="px-5 py-16 text-center"
                                                >
                                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                                                        <Loader2
                                                            size={18}
                                                            className="animate-spin"
                                                        />
                                                        Loading categories...
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : filteredCategories.length ===
                                            0 ? (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="px-5 py-16 text-center text-sm text-gray-400"
                                                >
                                                    No categories found.
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredCategories.map(
                                                (category) => (
                                                    <tr
                                                        key={
                                                            category._id
                                                        }
                                                        className="border-t border-black/[0.05] transition-colors hover:bg-[#FAFAF8]"
                                                    >

                                                        {/* CATEGORY */}
                                                        <td className="px-5 py-4">
                                                            <div className="flex items-center gap-3">

                                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#C9A227]/10 text-[#A47D12]">

                                                                    {category.imageUrl ? (
                                                                        <img
                                                                            src={
                                                                                category.imageUrl
                                                                            }
                                                                            alt={
                                                                                category.name
                                                                            }
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    ) : (
                                                                        <FolderOpen
                                                                            size={
                                                                                18
                                                                            }
                                                                        />
                                                                    )}
                                                                </div>

                                                                <span className="text-xs font-semibold text-[#111111]">
                                                                    {
                                                                        category.name
                                                                    }
                                                                </span>
                                                            </div>
                                                        </td>

                                                        {/* SLUG */}
                                                        <td className="px-5 py-4 text-xs text-gray-500">
                                                            {
                                                                category.slug
                                                            }
                                                        </td>

                                                        {/* META */}
                                                        <td className="max-w-[200px] truncate px-5 py-4 text-xs text-gray-500">
                                                            {category.metaTitle ||
                                                                "—"}
                                                        </td>

                                                        {/* DATE */}
                                                        <td className="whitespace-nowrap px-5 py-4 text-xs text-gray-500">
                                                            {category.createdAt
                                                                ? new Date(
                                                                    category.createdAt
                                                                ).toLocaleDateString(
                                                                    "en-IN",
                                                                    {
                                                                        day: "2-digit",
                                                                        month: "short",
                                                                        year: "numeric",
                                                                    }
                                                                )
                                                                : "—"}
                                                        </td>

                                                        {/* ACTIONS */}
                                                        <td className="px-5 py-4">
                                                            <div className="flex justify-end gap-2">

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleEdit(
                                                                            category
                                                                        )
                                                                    }
                                                                    aria-label="Edit category"
                                                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C9A227]/10 text-[#A47D12] transition-colors hover:bg-[#C9A227] hover:text-black"
                                                                >
                                                                    <Pencil
                                                                        size={
                                                                            14
                                                                        }
                                                                    />
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            category._id
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        deletingId ===
                                                                        category._id
                                                                    }
                                                                    aria-label="Delete category"
                                                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition-colors hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                                                                >
                                                                    {deletingId ===
                                                                        category._id ? (
                                                                        <Loader2
                                                                            size={
                                                                                14
                                                                            }
                                                                            className="animate-spin"
                                                                        />
                                                                    ) : (
                                                                        <Trash2
                                                                            size={
                                                                                14
                                                                            }
                                                                        />
                                                                    )}
                                                                </button>

                                                            </div>
                                                        </td>

                                                    </tr>
                                                )
                                            )
                                        )}

                                    </tbody>
                                </table>
                            </div>

                            <div className="border-t border-black/[0.05] px-5 py-4">
                                <p className="text-[10px] text-gray-500">
                                    Showing{" "}
                                    {
                                        filteredCategories.length
                                    }{" "}
                                    of{" "}
                                    {categories.length}{" "}
                                    categories
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
"use client";

import React, { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import {
    ArrowLeft,
    Plus,
    Trash2,
    Upload,
    X,
} from "lucide-react";
import Link from "next/link";

const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/10";

const labelClass =
    "mb-2 block text-sm font-medium text-gray-700";

export default function Page() {
    const [form, setForm] = useState({
        name: "",
        slug: "",
        category: "",
        oldPrice: "",
        realPrice: "",
        shortDescription: "",
        longDescription: "",
        videoLink: "",
        metaTitle: "",
        metaDescription: "",

        weight: "",
        length: "",
        breadth: "",
        height: "",

        keyFeatures: [""],
        applications: [""],

        specifications: [
            {
                name: "",
                value: "",
            },
        ],

        packs: [
            {
                name: "",
                quantity: "",
                price: "",
            },
        ],

        images: [],
    });

    const categories = [
        "Corporate Gifts",
        "Office Products",
        "Decorative Products",
    ];

    // -----------------------------
    // BASIC INPUT
    // -----------------------------

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNameChange = (e) => {
        const name = e.target.value;

        setForm((prev) => ({
            ...prev,
            name,
            slug: name
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, ""),
        }));
    };

    // -----------------------------
    // KEY FEATURES
    // -----------------------------

    const addFeature = () => {
        setForm((prev) => ({
            ...prev,
            keyFeatures: [...prev.keyFeatures, ""],
        }));
    };

    const updateFeature = (index, value) => {
        setForm((prev) => {
            const updated = [...prev.keyFeatures];
            updated[index] = value;

            return {
                ...prev,
                keyFeatures: updated,
            };
        });
    };

    const removeFeature = (index) => {
        setForm((prev) => ({
            ...prev,
            keyFeatures: prev.keyFeatures.filter(
                (_, i) => i !== index
            ),
        }));
    };

    // -----------------------------
    // APPLICATIONS
    // -----------------------------

    const addApplication = () => {
        setForm((prev) => ({
            ...prev,
            applications: [...prev.applications, ""],
        }));
    };

    const updateApplication = (index, value) => {
        setForm((prev) => {
            const updated = [...prev.applications];
            updated[index] = value;

            return {
                ...prev,
                applications: updated,
            };
        });
    };

    const removeApplication = (index) => {
        setForm((prev) => ({
            ...prev,
            applications: prev.applications.filter(
                (_, i) => i !== index
            ),
        }));
    };

    // -----------------------------
    // SPECIFICATIONS
    // -----------------------------

    const addSpecification = () => {
        setForm((prev) => ({
            ...prev,
            specifications: [
                ...prev.specifications,
                {
                    name: "",
                    value: "",
                },
            ],
        }));
    };

    const updateSpecification = (index, field, value) => {
        setForm((prev) => {
            const updated = [...prev.specifications];

            updated[index] = {
                ...updated[index],
                [field]: value,
            };

            return {
                ...prev,
                specifications: updated,
            };
        });
    };

    const removeSpecification = (index) => {
        setForm((prev) => ({
            ...prev,
            specifications: prev.specifications.filter(
                (_, i) => i !== index
            ),
        }));
    };

    // -----------------------------
    // PACKS
    // -----------------------------

    const addPack = () => {
        setForm((prev) => ({
            ...prev,
            packs: [
                ...prev.packs,
                {
                    name: "",
                    quantity: "",
                    price: "",
                },
            ],
        }));
    };

    const updatePack = (index, field, value) => {
        setForm((prev) => {
            const updated = [...prev.packs];

            updated[index] = {
                ...updated[index],
                [field]: value,
            };

            return {
                ...prev,
                packs: updated,
            };
        });
    };

    const removePack = (index) => {
        setForm((prev) => ({
            ...prev,
            packs: prev.packs.filter((_, i) => i !== index),
        }));
    };

    // -----------------------------
    // IMAGES
    // -----------------------------

    const handleImages = (e) => {
        const files = Array.from(e.target.files);

        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setForm((prev) => ({
            ...prev,
            images: [...prev.images, ...newImages],
        }));
    };

    const removeImage = (index) => {
        setForm((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    // -----------------------------
    // SUBMIT
    // -----------------------------

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("PRODUCT DATA:", form);

        alert("Product saved successfully!");

        // Later:
        // axios.post("/api/admin/products", form)
    };

    return (
        <div className="min-h-screen bg-[#F7F7F5]">
            <Sidebar />

            <main className="pt-16 lg:ml-[270px] lg:pt-0">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

                    {/* HEADER */}
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <Link
                                href="/admin/all-products"
                                className="mb-3 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#C9A227]"
                            >
                                <ArrowLeft size={16} />
                                Back to Products
                            </Link>

                            <h1 className="font-serif text-3xl font-semibold text-[#111111]">
                                Add Product
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Create a new product with pricing,
                                specifications, packs and images.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* --------------------------------
                            BASIC INFORMATION
                        -------------------------------- */}

                        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-[#111111]">
                                    Basic Information
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Enter the basic details of your product.
                                </p>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">

                                <div>
                                    <label className={labelClass}>
                                        Product Name *
                                    </label>

                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={handleNameChange}
                                        placeholder="Enter product name"
                                        className={inputClass}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Slug *
                                    </label>

                                    <input
                                        type="text"
                                        name="slug"
                                        value={form.slug}
                                        onChange={handleChange}
                                        placeholder="product-slug"
                                        className={inputClass}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Category *
                                    </label>

                                    <select
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        className={inputClass}
                                        required
                                    >
                                        <option value="">
                                            Select Category
                                        </option>

                                        {categories.map((category) => (
                                            <option
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Video Link
                                    </label>

                                    <input
                                        type="url"
                                        name="videoLink"
                                        value={form.videoLink}
                                        onChange={handleChange}
                                        placeholder="https://youtube.com/..."
                                        className={inputClass}
                                    />
                                </div>

                            </div>
                        </section>

                        {/* --------------------------------
                            PRICING
                        -------------------------------- */}

                        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <h2 className="mb-6 text-lg font-semibold text-[#111111]">
                                Pricing
                            </h2>

                            <div className="grid gap-5 md:grid-cols-2">

                                <div>
                                    <label className={labelClass}>
                                        Old Price
                                    </label>

                                    <input
                                        type="number"
                                        name="oldPrice"
                                        value={form.oldPrice}
                                        onChange={handleChange}
                                        placeholder="₹ 0"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Real Price *
                                    </label>

                                    <input
                                        type="number"
                                        name="realPrice"
                                        value={form.realPrice}
                                        onChange={handleChange}
                                        placeholder="₹ 0"
                                        className={inputClass}
                                        required
                                    />
                                </div>

                            </div>
                        </section>

                        {/* --------------------------------
                            DESCRIPTION
                        -------------------------------- */}

                        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <h2 className="mb-6 text-lg font-semibold text-[#111111]">
                                Product Description
                            </h2>

                            <div className="space-y-5">

                                <div>
                                    <label className={labelClass}>
                                        Short Description *
                                    </label>

                                    <textarea
                                        name="shortDescription"
                                        value={form.shortDescription}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Short product description..."
                                        className={inputClass}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Long Description
                                    </label>

                                    <textarea
                                        name="longDescription"
                                        value={form.longDescription}
                                        onChange={handleChange}
                                        rows={7}
                                        placeholder="Detailed product description..."
                                        className={inputClass}
                                    />
                                </div>

                            </div>
                        </section>

                        {/* --------------------------------
                            DIMENSIONS
                        -------------------------------- */}

                        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <h2 className="mb-6 text-lg font-semibold text-[#111111]">
                                Product Dimensions & Weight
                            </h2>

                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                                <div>
                                    <label className={labelClass}>
                                        Weight
                                    </label>

                                    <input
                                        type="text"
                                        name="weight"
                                        value={form.weight}
                                        onChange={handleChange}
                                        placeholder="e.g. 500 g"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Length
                                    </label>

                                    <input
                                        type="text"
                                        name="length"
                                        value={form.length}
                                        onChange={handleChange}
                                        placeholder="e.g. 20 cm"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Breadth
                                    </label>

                                    <input
                                        type="text"
                                        name="breadth"
                                        value={form.breadth}
                                        onChange={handleChange}
                                        placeholder="e.g. 10 cm"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Height
                                    </label>

                                    <input
                                        type="text"
                                        name="height"
                                        value={form.height}
                                        onChange={handleChange}
                                        placeholder="e.g. 5 cm"
                                        className={inputClass}
                                    />
                                </div>

                            </div>
                        </section>

                        {/* --------------------------------
                            KEY FEATURES
                        -------------------------------- */}

                        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-[#111111]">
                                        Key Features
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Add important product features.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#111111] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#C9A227]"
                                >
                                    <Plus size={16} />
                                    Add Feature
                                </button>
                            </div>

                            <div className="space-y-3">
                                {form.keyFeatures.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-3"
                                    >
                                        <input
                                            type="text"
                                            value={feature}
                                            onChange={(e) =>
                                                updateFeature(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            placeholder={`Feature ${index + 1} `}
                                            className={inputClass}
                                        />

                                        {form.keyFeatures.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeFeature(index)
                                                }
                                                className="rounded-xl border border-red-200 px-4 text-red-500 transition hover:bg-red-50"
                                            >
                                                <Trash2 size={17} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* --------------------------------
                            APPLICATIONS
                        -------------------------------- */}

                        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-[#111111]">
                                        Applications
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Where this product can be used.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={addApplication}
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#111111] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#C9A227]"
                                >
                                    <Plus size={16} />
                                    Add Application
                                </button>
                            </div>

                            <div className="space-y-3">
                                {form.applications.map(
                                    (application, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-3"
                                        >
                                            <input
                                                type="text"
                                                value={application}
                                                onChange={(e) =>
                                                    updateApplication(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                                placeholder={`Application ${index + 1} `}
                                                className={inputClass}
                                            />

                                            {form.applications.length >
                                                1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeApplication(
                                                                index
                                                            )
                                                        }
                                                        className="rounded-xl border border-red-200 px-4 text-red-500 transition hover:bg-red-50"
                                                    >
                                                        <Trash2 size={17} />
                                                    </button>
                                                )}
                                        </div>
                                    )
                                )}
                            </div>
                        </section>

                        {/* --------------------------------
                            SPECIFICATIONS
                        -------------------------------- */}

                        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-[#111111]">
                                        Specifications
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Add product specification name and value.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={addSpecification}
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#111111] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#C9A227]"
                                >
                                    <Plus size={16} />
                                    Add Specification
                                </button>
                            </div>

                            <div className="space-y-3">
                                {form.specifications.map(
                                    (specification, index) => (
                                        <div
                                            key={index}
                                            className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
                                        >
                                            <input
                                                type="text"
                                                value={specification.name}
                                                onChange={(e) =>
                                                    updateSpecification(
                                                        index,
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Specification name"
                                                className={inputClass}
                                            />

                                            <input
                                                type="text"
                                                value={specification.value}
                                                onChange={(e) =>
                                                    updateSpecification(
                                                        index,
                                                        "value",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Specification value"
                                                className={inputClass}
                                            />

                                            {form.specifications.length >
                                                1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeSpecification(
                                                                index
                                                            )
                                                        }
                                                        className="rounded-xl border border-red-200 px-4 text-red-500 transition hover:bg-red-50"
                                                    >
                                                        <Trash2 size={17} />
                                                    </button>
                                                )}
                                        </div>
                                    )
                                )}
                            </div>
                        </section>

                        {/* --------------------------------
                            PACK OPTIONS
                        -------------------------------- */}

                        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-[#111111]">
                                        Pack Options
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Add different pack sizes such as 10 Pack
                                        Box or 100 Pack Box.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={addPack}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#111111] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#C9A227]"
                                >
                                    <Plus size={16} />
                                    Add Pack
                                </button>
                            </div>

                            <div className="space-y-4">

                                {form.packs.map((pack, index) => (
                                    <div
                                        key={index}
                                        className="rounded-2xl border border-gray-200 bg-[#F7F7F5] p-4"
                                    >
                                        <div className="mb-4 flex items-center justify-between">
                                            <p className="font-medium text-[#111111]">
                                                Pack {index + 1}
                                            </p>

                                            {form.packs.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removePack(index)
                                                    }
                                                    className="text-red-500 transition hover:text-red-700"
                                                >
                                                    <Trash2 size={17} />
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-3">

                                            <div>
                                                <label className={labelClass}>
                                                    Pack Name
                                                </label>

                                                <input
                                                    type="text"
                                                    value={pack.name}
                                                    onChange={(e) =>
                                                        updatePack(
                                                            index,
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="10 Pack Box"
                                                    className={inputClass}
                                                />
                                            </div>

                                            <div>
                                                <label className={labelClass}>
                                                    Quantity
                                                </label>

                                                <input
                                                    type="number"
                                                    value={pack.quantity}
                                                    onChange={(e) =>
                                                        updatePack(
                                                            index,
                                                            "quantity",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="10"
                                                    className={inputClass}
                                                />
                                            </div>

                                            <div>
                                                <label className={labelClass}>
                                                    Pack Price
                                                </label>

                                                <input
                                                    type="number"
                                                    value={pack.price}
                                                    onChange={(e) =>
                                                        updatePack(
                                                            index,
                                                            "price",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="₹ 999"
                                                    className={inputClass}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                ))}

                            </div>

                            {/* PACK EXAMPLE */}
                            <div className="mt-5 rounded-xl border border-[#C9A227]/30 bg-[#C9A227]/5 p-4 text-sm text-gray-600">
                                <strong className="text-[#111111]">
                                    Example:
                                </strong>{" "}
                                10 Pack Box — ₹499 &nbsp; | &nbsp;
                                50 Pack Box — ₹1,999 &nbsp; | &nbsp;
                                100 Pack Box — ₹3,499
                            </div>
                        </section>

                        {/* --------------------------------
                            IMAGES
                        -------------------------------- */}

                        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-[#111111]">
                                    Product Images
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Upload multiple product images.
                                </p>
                            </div>

                            <label className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-[#F7F7F5] px-6 text-center transition hover:border-[#C9A227]">

                                <div className="mb-3 rounded-full bg-white p-3 shadow-sm">
                                    <Upload
                                        size={22}
                                        className="text-[#C9A227]"
                                    />
                                </div>

                                <p className="font-medium text-[#111111]">
                                    Click to upload images
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    PNG, JPG, WEBP
                                </p>

                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImages}
                                    className="hidden"
                                />
                            </label>

                            {form.images.length > 0 && (
                                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

                                    {form.images.map((image, index) => (
                                        <div
                                            key={index}
                                            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-100"
                                        >
                                            <img
                                                src={image.preview}
                                                alt={`Product ${index + 1} `}
                                                className="aspect-square w-full object-cover"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeImage(index)
                                                }
                                                className="absolute right-2 top-2 rounded-full bg-black/70 p-1.5 text-white opacity-0 transition group-hover:opacity-100"
                                            >
                                                <X size={15} />
                                            </button>
                                        </div>
                                    ))}

                                </div>
                            )}
                        </section>

                        {/* --------------------------------
                            SEO
                        -------------------------------- */}

                        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                            <h2 className="mb-6 text-lg font-semibold text-[#111111]">
                                SEO Information
                            </h2>

                            <div className="space-y-5">

                                <div>
                                    <label className={labelClass}>
                                        Meta Title
                                    </label>

                                    <input
                                        type="text"
                                        name="metaTitle"
                                        value={form.metaTitle}
                                        onChange={handleChange}
                                        placeholder="Enter meta title"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Meta Description
                                    </label>

                                    <textarea
                                        name="metaDescription"
                                        value={form.metaDescription}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Enter meta description"
                                        className={inputClass}
                                    />
                                </div>

                            </div>
                        </section>

                        {/* --------------------------------
                            ACTIONS
                        -------------------------------- */}

                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                            <Link
                                href="/admin/products"
                                className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="rounded-xl bg-[#C9A227] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#b28d20]"
                            >
                                Save Product
                            </button>

                        </div>

                    </form>
                </div>
            </main>
        </div>
    );
}
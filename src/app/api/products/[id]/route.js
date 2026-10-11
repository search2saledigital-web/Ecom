import mongoose from "mongoose";
import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Product from "@/models/product.model.js";
import Category from "@/models/category.model.js";
import { uploadToR2 } from "@/lib/r2-upload";
import { deleteFromR2 } from "@/lib/r2-delete";

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const identifier = decodeURIComponent(id);

        await connectDB();

        const isObjectId = mongoose.Types.ObjectId.isValid(identifier) &&
            /^[a-f\d]{24}$/i.test(identifier);

        const product = await Product.findOne(
            isObjectId
                ? { _id: identifier }
                : { slug: identifier }
        )
            .populate("category", "name slug")
            .lean();

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                product,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("GET PRODUCT ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch product",
            },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = await params;

        if (
            !mongoose.Types.ObjectId.isValid(id)
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid product ID",
                },
                { status: 400 }
            );
        }

        await connectDB();

        const product =
            await Product.findById(id);

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product not found",
                },
                { status: 404 }
            );
        }

        const formData =
            await request.formData();

        const name = formData.get("name");
        const slug = formData.get("slug");
        const category = formData.get("category");

        const oldPrice =
            formData.get("oldPrice");

        const realPrice =
            formData.get("realPrice");

        const shortDescription =
            formData.get("shortDescription");

        const longDescription =
            formData.get("longDescription");

        const videoLink =
            formData.get("videoLink");

        const weight =
            formData.get("weight");

        const length =
            formData.get("length");

        const breadth =
            formData.get("breadth");

        const height =
            formData.get("height");

        const metaTitle =
            formData.get("metaTitle");

        const metaDescription =
            formData.get("metaDescription");

        const keyFeatures =
            JSON.parse(
                formData.get("keyFeatures") ||
                "[]"
            );

        const applications =
            JSON.parse(
                formData.get("applications") ||
                "[]"
            );

        const specifications =
            JSON.parse(
                formData.get("specifications") ||
                "[]"
            );

        const packs =
            JSON.parse(
                formData.get("packs") ||
                "[]"
            );

        const removeImageKeys =
            JSON.parse(
                formData.get(
                    "removeImageKeys"
                ) || "[]"
            );

        // -------------------------------------------------
        // CATEGORY
        // -------------------------------------------------

        if (category) {
            const categoryExists =
                await Category.findById(
                    category
                );

            if (!categoryExists) {
                return NextResponse.json(
                    {
                        success: false,
                        message:
                            "Category not found",
                    },
                    { status: 404 }
                );
            }
        }

        // -------------------------------------------------
        // SLUG
        // -------------------------------------------------

        const cleanSlug =
            slug?.toLowerCase().trim();

        if (cleanSlug) {
            const slugExists =
                await Product.findOne({
                    slug: cleanSlug,
                    _id: {
                        $ne: id,
                    },
                });

            if (slugExists) {
                return NextResponse.json(
                    {
                        success: false,
                        message:
                            "Another product already uses this slug",
                    },
                    { status: 409 }
                );
            }
        }

        // -------------------------------------------------
        // DELETE REMOVED IMAGES
        // -------------------------------------------------

        if (
            Array.isArray(removeImageKeys) &&
            removeImageKeys.length > 0
        ) {
            for (const key of removeImageKeys) {
                if (!key) continue;

                try {
                    await deleteFromR2(key);
                } catch (error) {
                    console.error(
                        "R2 IMAGE DELETE ERROR:",
                        key,
                        error
                    );
                }
            }
        }

        // Keep images not removed
        let remainingImages =
            product.images.filter(
                (image) =>
                    !removeImageKeys.includes(
                        image.key
                    )
            );

        // -------------------------------------------------
        // NEW IMAGES
        // -------------------------------------------------

        const newFiles =
            formData.getAll("images");

        const newImages = [];

        for (const file of newFiles) {
            if (
                file &&
                typeof file !== "string" &&
                file.size > 0
            ) {
                if (
                    !file.type.startsWith(
                        "image/"
                    )
                ) {
                    return NextResponse.json(
                        {
                            success: false,
                            message:
                                "Only image files are allowed",
                        },
                        { status: 400 }
                    );
                }

                if (
                    file.size >
                    5 * 1024 * 1024
                ) {
                    return NextResponse.json(
                        {
                            success: false,
                            message:
                                "Each image must be less than 5MB",
                        },
                        { status: 400 }
                    );
                }

                const uploaded =
                    await uploadToR2(
                        file,
                        "products"
                    );

                newImages.push({
                    url: uploaded.url,
                    key: uploaded.key,
                });
            }
        }

        remainingImages = [
            ...remainingImages,
            ...newImages,
        ];

        // -------------------------------------------------
        // UPDATE
        // -------------------------------------------------

        product.name =
            name?.trim() || product.name;

        product.slug =
            cleanSlug || product.slug;

        product.category =
            category || product.category;

        product.oldPrice =
            Number(oldPrice) || 0;

        product.realPrice =
            Number(realPrice) || 0;

        product.shortDescription =
            shortDescription?.trim() || "";

        product.longDescription =
            longDescription?.trim() || "";

        product.videoLink =
            videoLink?.trim() || "";

        product.weight =
            weight?.trim() || "";

        product.length =
            length?.trim() || "";

        product.breadth =
            breadth?.trim() || "";

        product.height =
            height?.trim() || "";

        product.keyFeatures =
            Array.isArray(keyFeatures)
                ? keyFeatures
                    .map((item) =>
                        String(item).trim()
                    )
                    .filter(Boolean)
                : [];

        product.applications =
            Array.isArray(applications)
                ? applications
                    .map((item) =>
                        String(item).trim()
                    )
                    .filter(Boolean)
                : [];

        product.specifications =
            Array.isArray(specifications)
                ? specifications
                : [];

        product.packs =
            Array.isArray(packs)
                ? packs
                : [];

        product.images =
            remainingImages;

        product.metaTitle =
            metaTitle?.trim() || "";

        product.metaDescription =
            metaDescription?.trim() || "";

        await product.save();

        return NextResponse.json(
            {
                success: true,
                message:
                    "Product updated successfully",
                product,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(
            "UPDATE PRODUCT ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to update product",
                error: error.message,
            },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request,
    { params }
) {
    try {
        const { id } = await params;

        if (
            !mongoose.Types.ObjectId.isValid(id)
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid product ID",
                },
                { status: 400 }
            );
        }

        await connectDB();

        const product =
            await Product.findById(id);

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product not found",
                },
                { status: 404 }
            );
        }

        // Delete every product image
        for (const image of product.images) {
            if (!image.key) continue;

            try {
                await deleteFromR2(
                    image.key
                );
            } catch (error) {
                console.error(
                    "R2 DELETE ERROR:",
                    image.key,
                    error
                );
            }
        }

        // Delete MongoDB product
        await Product.findByIdAndDelete(id);

        return NextResponse.json(
            {
                success: true,
                message:
                    "Product deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(
            "DELETE PRODUCT ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to delete product",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
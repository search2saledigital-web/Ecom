import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Product from "@/models/product.model.js";
import Category from "@/models/category.model.js";
import { uploadToR2 } from "@/lib/r2-upload";

export async function POST(request) {
    try {
        await connectDB();

        const formData = await request.formData();

        const name = formData.get("name");
        const slug = formData.get("slug");
        const category = formData.get("category");

        const oldPrice = formData.get("oldPrice");
        const realPrice = formData.get("realPrice");

        const shortDescription =
            formData.get("shortDescription");

        const longDescription =
            formData.get("longDescription");

        const videoLink = formData.get("videoLink");

        const weight = formData.get("weight");
        const length = formData.get("length");
        const breadth = formData.get("breadth");
        const height = formData.get("height");

        const metaTitle = formData.get("metaTitle");
        const metaDescription =
            formData.get("metaDescription");

        const keyFeatures = JSON.parse(
            formData.get("keyFeatures") || "[]"
        );

        const applications = JSON.parse(
            formData.get("applications") || "[]"
        );

        const specifications = JSON.parse(
            formData.get("specifications") || "[]"
        );

        const packs = JSON.parse(
            formData.get("packs") || "[]"
        );

        const files = formData.getAll("images");

        // -------------------------------------------------
        // VALIDATION
        // -------------------------------------------------

        if (!name || !slug || !category) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Name, slug and category are required",
                },
                { status: 400 }
            );
        }

        if (!realPrice) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Real price is required",
                },
                { status: 400 }
            );
        }

        if (!shortDescription) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Short description is required",
                },
                { status: 400 }
            );
        }

        // -------------------------------------------------
        // CATEGORY CHECK
        // -------------------------------------------------

        const categoryExists =
            await Category.findById(category);

        if (!categoryExists) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category not found",
                },
                { status: 404 }
            );
        }

        // -------------------------------------------------
        // SLUG CHECK
        // -------------------------------------------------

        const cleanSlug = slug
            .toLowerCase()
            .trim();

        const existingProduct =
            await Product.findOne({
                slug: cleanSlug,
            });

        if (existingProduct) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Product with this slug already exists",
                },
                { status: 409 }
            );
        }

        // -------------------------------------------------
        // UPLOAD IMAGES
        // -------------------------------------------------

        const uploadedImages = [];

        for (const file of files) {
            if (
                file &&
                typeof file !== "string" &&
                file.size > 0
            ) {
                if (
                    !file.type.startsWith("image/")
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

                if (file.size > 5 * 1024 * 1024) {
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

                uploadedImages.push({
                    url: uploaded.url,
                    key: uploaded.key,
                });
            }
        }

        // -------------------------------------------------
        // CREATE PRODUCT
        // -------------------------------------------------

        const product =
            await Product.create({
                name: name.trim(),

                slug: cleanSlug,

                category,

                oldPrice:
                    Number(oldPrice) || 0,

                realPrice:
                    Number(realPrice),

                shortDescription:
                    shortDescription.trim(),

                longDescription:
                    longDescription?.trim() || "",

                videoLink:
                    videoLink?.trim() || "",

                weight:
                    weight?.trim() || "",

                length:
                    length?.trim() || "",

                breadth:
                    breadth?.trim() || "",

                height:
                    height?.trim() || "",

                keyFeatures:
                    Array.isArray(keyFeatures)
                        ? keyFeatures
                            .map((item) =>
                                String(item).trim()
                            )
                            .filter(Boolean)
                        : [],

                applications:
                    Array.isArray(applications)
                        ? applications
                            .map((item) =>
                                String(item).trim()
                            )
                            .filter(Boolean)
                        : [],

                specifications:
                    Array.isArray(specifications)
                        ? specifications
                        : [],

                packs:
                    Array.isArray(packs)
                        ? packs
                        : [],

                images: uploadedImages,

                metaTitle:
                    metaTitle?.trim() || "",

                metaDescription:
                    metaDescription?.trim() || "",
            });

        return NextResponse.json(
            {
                success: true,
                message:
                    "Product added successfully",
                product,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(
            "ADD PRODUCT ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: "Failed to add product",
                error: error.message,
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();

        const products =
            await Product.find({})
                .populate(
                    "category",
                    "name slug"
                )
                .sort({
                    createdAt: -1,
                })
                .lean();

        return NextResponse.json(
            {
                success: true,
                count: products.length,
                products,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(
            "GET ALL PRODUCTS ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to fetch products",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
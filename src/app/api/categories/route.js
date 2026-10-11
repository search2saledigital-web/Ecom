import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Category from "@/models/category.model.js";
import { uploadToR2 } from "@/lib/r2-upload"

export async function POST(request) {
    try {
        await connectDB();

        const formData = await request.formData();

        const name = formData.get("name");
        const slug = formData.get("slug");
        const metaTitle = formData.get("metaTitle");
        const metaDescription = formData.get("metaDescription");
        const file = formData.get("image");

        if (!name || !slug) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Name and slug are required",
                },
                { status: 400 }
            );
        }

        const existingCategory = await Category.findOne({
            slug: slug.toLowerCase().trim(),
        });

        if (existingCategory) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Category with this slug already exists",
                },
                { status: 409 }
            );
        }

        let imageUrl = "";
        let imageKey = "";

        if (file && file.size > 0) {
            const uploaded = await uploadToR2(
                file,
                "categories"
            );

            imageUrl = uploaded.url;
            imageKey = uploaded.key;
        }

        const category = await Category.create({
            name: name.trim(),
            slug: slug.toLowerCase().trim(),
            imageUrl,
            imageKey,
            metaTitle: metaTitle?.trim() || "",
            metaDescription:
                metaDescription?.trim() || "",
        });

        return NextResponse.json(
            {
                success: true,
                message: "Category added successfully",
                category,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("ADD CATEGORY ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to add category",
                error: error.message,
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();

        const categories = await Category.find({})
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json(
            {
                success: true,
                count: categories.length,
                categories,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(
            "GET ALL CATEGORIES ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch categories",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
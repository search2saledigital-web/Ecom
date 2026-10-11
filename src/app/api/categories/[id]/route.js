import mongoose from "mongoose";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Category from "@/models/category.model.js";
import { deleteFromR2 } from "@/lib/r2-delete";
import { uploadToR2 } from "@/lib/r2-upload";

export async function PUT(request, { params }) {
    let uploadedImageKey = "";
    let categoryUpdated = false;

    try {
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid category ID",
                },
                { status: 400 }
            );
        }

        await connectDB();

        const category = await Category.findById(id);

        if (!category) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category not found",
                },
                { status: 404 }
            );
        }

        const formData = await request.formData();
        const name = formData.get("name");
        const slug = formData.get("slug");
        const metaTitle = formData.get("metaTitle");
        const metaDescription = formData.get("metaDescription");
        const file = formData.get("image");

        if (typeof name !== "string" || !name.trim() ||
            typeof slug !== "string" || !slug.trim()) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Name and slug are required",
                },
                { status: 400 }
            );
        }

        const normalizedSlug = slug.toLowerCase().trim();
        const existingCategory = await Category.findOne({
            slug: normalizedSlug,
            _id: { $ne: id },
        });

        if (existingCategory) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category with this slug already exists",
                },
                { status: 409 }
            );
        }

        const updates = {
            name: name.trim(),
            slug: normalizedSlug,
        };

        if (typeof metaTitle === "string") {
            updates.metaTitle = metaTitle.trim();
        }

        if (typeof metaDescription === "string") {
            updates.metaDescription = metaDescription.trim();
        }

        if (file && typeof file === "string") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid category image",
                },
                { status: 400 }
            );
        }

        if (file && file.size > 0) {
            const uploaded = await uploadToR2(file, "categories");
            uploadedImageKey = uploaded.key;
            updates.imageUrl = uploaded.url;
            updates.imageKey = uploaded.key;
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            if (uploadedImageKey) {
                try {
                    await deleteFromR2(uploadedImageKey);
                } catch (cleanupError) {
                    console.error("R2 UPLOAD CLEANUP ERROR:", cleanupError);
                }
            }

            return NextResponse.json(
                {
                    success: false,
                    message: "Category not found",
                },
                { status: 404 }
            );
        }

        categoryUpdated = true;

        let imageCleanupWarning;
        if (uploadedImageKey && category.imageKey) {
            try {
                await deleteFromR2(category.imageKey);
            } catch (error) {
                console.error("OLD CATEGORY IMAGE DELETE ERROR:", error);
                imageCleanupWarning =
                    "Category updated, but the previous image could not be deleted from storage";
            }
        }

        return NextResponse.json(
            {
                success: true,
                message: imageCleanupWarning || "Category updated successfully",
                category: updatedCategory,
            },
            { status: 200 }
        );
    } catch (error) {
        if (uploadedImageKey && !categoryUpdated) {
            try {
                await deleteFromR2(uploadedImageKey);
            } catch (cleanupError) {
                console.error("R2 UPLOAD CLEANUP ERROR:", cleanupError);
            }
        }

        console.error("UPDATE CATEGORY ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to update category",
                error: error.message,
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;

        // Validate MongoDB ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid category ID",
                },
                { status: 400 }
            );
        }

        await connectDB();

        // Find category first
        const category = await Category.findById(id);

        if (!category) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category not found",
                },
                { status: 404 }
            );
        }

        // Delete image from Cloudflare R2
        if (category.imageKey) {
            try {
                await deleteFromR2(category.imageKey);
            } catch (r2Error) {
                console.error(
                    "R2 DELETE ERROR:",
                    r2Error
                );

                // Stop deletion if R2 cleanup fails
                return NextResponse.json(
                    {
                        success: false,
                        message:
                            "Failed to delete category image from storage",
                        error: r2Error.message,
                    },
                    { status: 500 }
                );
            }
        }

        // Delete category from MongoDB
        await Category.findByIdAndDelete(id);

        return NextResponse.json(
            {
                success: true,
                message: "Category deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(
            "DELETE CATEGORY ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete category",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
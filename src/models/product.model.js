import mongoose from "mongoose";

const SpecificationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            default: "",
        },
        value: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { _id: false }
);

const PackSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            default: "",
        },
        quantity: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            default: 0,
        },
    },
    { _id: false }
);

const ProductImageSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
        },
        key: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        oldPrice: {
            type: Number,
            default: 0,
        },

        realPrice: {
            type: Number,
            required: true,
        },

        shortDescription: {
            type: String,
            required: true,
            trim: true,
        },

        longDescription: {
            type: String,
            default: "",
            trim: true,
        },

        videoLink: {
            type: String,
            default: "",
            trim: true,
        },

        weight: {
            type: String,
            default: "",
        },

        length: {
            type: String,
            default: "",
        },

        breadth: {
            type: String,
            default: "",
        },

        height: {
            type: String,
            default: "",
        },

        keyFeatures: {
            type: [String],
            default: [],
        },

        applications: {
            type: [String],
            default: [],
        },

        specifications: {
            type: [SpecificationSchema],
            default: [],
        },

        packs: {
            type: [PackSchema],
            default: [],
        },

        images: {
            type: [ProductImageSchema],
            default: [],
        },

        metaTitle: {
            type: String,
            default: "",
            trim: true,
        },

        metaDescription: {
            type: String,
            default: "",
            trim: true,
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
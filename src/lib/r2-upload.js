import r2 from "./r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";

export async function uploadToR2(file, folder = "categories") {
    if (!file) {
        throw new Error("File is required");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const extension =
        file.name.split(".").pop()?.toLowerCase() || "jpg";

    const fileName = `${folder}/${crypto.randomUUID()}.${extension}`;

    await r2.send(
        new PutObjectCommand({
            Bucket: process.env.CLOUD_FLARE_R2_BUCKET,
            Key: fileName,
            Body: buffer,
            ContentType: file.type || "application/octet-stream",
        })
    );

    const publicUrl =
        `${process.env.CLOUD_FLARE_R2_PUBLIC_URL}`.replace(/\/$/, "");

    return {
        key: fileName,
        url: `${publicUrl}/${fileName}`,
    };
}
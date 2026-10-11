import r2 from "./r2";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function deleteFromR2(key) {
    if (!key) {
        throw new Error("R2 file key is required");
    }

    await r2.send(
        new DeleteObjectCommand({
            Bucket: process.env.CLOUD_FLARE_R2_BUCKET,
            Key: key,
        })
    );

    return true;
}
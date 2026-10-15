import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function testCloudinaryUpload() {
  try {
    const result = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      {
        folder: "Grovia",
        resource_type: "image",
      },
    );

    console.log("IMAGE UPLOAD SUCCESS:", result.secure_url);
  } catch (error: any) {
    console.error("IMAGE UPLOAD FAILED:", error);

    if (error.http_code) {
      console.error("HTTP status:", error.http_code);
    }
  }
}

testCloudinaryUpload();

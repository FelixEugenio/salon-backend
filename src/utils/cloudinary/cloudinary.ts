import cloudinary from "../../config/cloudinary-config";

const uploadImage = async (file: string) => {

    const result = await cloudinary.uploader.upload(file, {
        folder: "users",
        resource_type: "image",
    });
    return result.secure_url;
};

export { uploadImage };
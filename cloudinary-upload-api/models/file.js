import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    originalName: String,
    publicId: String,
    url: String,
    secureUrl: String,
    resourceType: String,
    format: String,
    bytes: Number
}, {
    timestamps: true
});

const File = mongoose.model("File", fileSchema);

export default File;
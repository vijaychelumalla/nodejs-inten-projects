import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import File from "../models/File.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});


const upload = multer({ storage });

// router.post(
//     "/upload",
//     upload.single("file"),
//     async (req, res) => {
//    console.log(req.file);
//         try {

//             const result = await cloudinary.uploader.upload(
//                 req.file.path,
//                 {
//                     resource_type: "auto"
//                 }
//             );

//             const savedFile = await File.create({
//                 originalName: req.file.originalname,
//                 publicId: result.public_id,
//                 url: result.url,
//                 secureUrl: result.secure_url,
//                 resourceType: result.resource_type,
//                 format: result.format,
//                 bytes: result.bytes
//             });

//             res.status(201).json({
//                 success: true,
//                 file: savedFile
//             });

//         } catch (error) {

//             res.status(500).json({
//                 success: false,
//                 message: error.message
//             });

//         }

//     }
// );
router.post(
    "/upload",
    upload.single("file"),
    async (req, res) => {

        try {

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "No file uploaded"
                });
            }

            const result = await cloudinary.uploader.upload(
                req.file.path,
                {
                    resource_type: "auto"
                }
            );

            const savedFile = await File.create({
                originalName: req.file.originalname,
                publicId: result.public_id,
                url: result.url,
                secureUrl: result.secure_url,
                resourceType: result.resource_type,
                format: result.format,
                bytes: result.bytes
            });

            res.status(201).json({
                success: true,
                file: savedFile
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
);

export default router;

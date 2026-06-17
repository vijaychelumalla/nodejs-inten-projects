
// import crypto, { verify } from "crypto";
import crypto from "crypto";
import UserModel from "../models/userModels.js";
import jwt from "jsonwebtoken";
import sesssionModel from "../models/sessionModels.js";
import config from "../config/config.js";
import { sendEmail } from "../Services/email.service.js";
import { generateOtp, getOtpHtml } from "../utils/utils.js";
import otpModel from "../models/otp.model.js";


// export async function register(req, res) {
//     const { username, email, password } = req.body;
//     const isAlreadyExist = await UserModel.findOne({
//         $or: [{ email }, { username }]
//     });
//     if (isAlreadyExist) {
//         return res.status(400).json({
//             message: "User already exists"
//         });
//     }
//     const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
//     const user = await UserModel.create({
//         username,
//         email,
//         password: hashedPassword
//     });
  
//         const otp = generateOtp();
//         const html = getOtpHtml();
//         const otpHash = crypto.createHash("sha256").update(password).digest("hex");
//         await  otpModel.create({
//             email,
//             user: user._id,
//             otpHash
//         })
//     // const refreshToken = jwt.sign(
//     //     { id: user._id }, config.JWT_SECRET, { expiresIn: "7d" }
//     // );

//     // const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

//     // const session = await sesssionModel.create({
//     //     userId: user._id,
//     //     refreshTokenHash,
//     //     ip: req.ip,
//     //     userAgent: req.headers["user-agent"],
//     // });


//     // const accessToken = jwt.sign(
//     //     {
//     //         id: user._id,
//     //         sessionid: session._id
//     //     }, config.JWT_SECRET, { expiresIn: "15m" }
//     // );

//     // res.cookie("refreshToken", refreshToken, {
//     //     httpOnly: true,
//     //     secure: false,
//     //     sameSite: "strict",
//     //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     // });
//     res.status(201).json({
//         message: "User registered successfully",
//         user: {
//             username: user.username,
//             email: user.email,
//             verified:user.verified
//         },
//         accessToken,
//     });
// }


export async function register(req, res) {
    const { username, email, password } = req.body;

    const isAlreadyExist = await UserModel.findOne({
        $or: [{ email }, { username }]
    });

    if (isAlreadyExist) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

    const user = await UserModel.create({
        username,
        email,
        password: hashedPassword
    });

    // Generate OTP
    const otp = generateOtp();

    // Create email HTML
    const html = getOtpHtml(otp);

    // Hash OTP before storing
    const otpHash = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");

    await otpModel.create({
        email,
        user: user._id,
        otpHash
    });

    // Send OTP email
    await sendEmail(
        email,
        "Verify Your Email",
        `Your OTP is ${otp}`,
        html
    );

    return res.status(201).json({
        message: "User registered successfully. Please verify your email.",
        user: {
            username: user.username,
            email: user.email,
            verified: user.verified
        }
    });
}
export async function login(req, res){
   

//     const {email , password} = req.body;
//      console.log("Email received:", email);
//    const user = await UserModel.findOne({ email });
//       console.log("User found:", user);

const { email, password } = req.body;

const allUsers = await UserModel.find();
console.log("All users:", allUsers);

console.log("Email received:", email);

const user = await UserModel.findOne({ email });
console.log("User found:", user);
    if(!user){
       return res.status(404).json({
            message: "invalid email or password"
        })
    }
    if(!user.verified){
        return res.status(401).json({
            massage: " email not verifed"
        })
    }
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
    const isPasswordValid = hashedPassword === user.password;
    if(!isPasswordValid){
        return res.status(404).json({
            message: "Invalid email or password"
        })
    }
    const refreshToken =jwt.sign({
        id: user._id
    },config.JWT_SECRET,{
        expiresIn:"7d"
    })
    const refreshTokenHash =crypto.createHash("sha256").update(refreshToken).digest("hex");
    const session =await sesssionModel.create({
        userId: user._id,
        refreshTokenHash,
       ip: req.ip,
        userAgent: req.headers["user-agent"]
    })
    const accessToken = jwt.sign({
        id:user._id,
        sessionid : session._id
    }, config.JWT_SECRET,{
        expiresIn:"15m"
    })
    res.cookie("refreshToken", refreshToken,{
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    res.status(200).json({
        message: "logged in successfully",
        user:{
            username: user.username,
            email: user.email,
        },
        accessToken,
    })

}

export async function getme(req, res) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            message: "token not found"
        })
    }
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);
    res.status(200).json({
        message: "User fetched successfully",
        user: {
            username: user.username,
            email: user.email,
        }
    })
}

export async function refreshToken(req, res) {
    //  console.log(req.cookies);
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token not found"
        });
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
    const session = await sesssionModel.findOne({
        refreshTokenHash,
        revoked: false
    })
    if (!session) {
        return res.status(400).json({
            message: "invalid refresh token"
        })
    }

    const accessToken = jwt.sign(
        { id: decoded.id },
        config.JWT_SECRET,
        { expiresIn: "15m" });
    const newRefreshToken = jwt.sign(
        { id: decoded.id },
        config.JWT_SECRET,
        { expiresIn: "7d" });

        const newRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex");
        session.refreshTokenHash = newRefreshTokenHash;
        await session.save();

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({
        message: "Access token refreshed successfully",
        accessToken,
    });
}

export async function logout(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(400).json({
            message: "Refresh Token not found"
        })
    }
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    const session = await sesssionModel.findOne({
        refreshTokenHash,
        revoked: false
    })

    if (!session) {
        return res.status(400).json({
            message: "Invalid refresh token"
        })
    }
    session.revoked = true;
    await session.save();
    res.clearCookie("refreshToken");
  res.status(200).json({
    message: "logged out from All Devices successfully"
})
}

export async function sign_out(req , res){
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(404).json({
            message : "refresh token not found"
        })

    }
    const decoded = jwt.verify(refreshToken, config.JWT_SECRET)
   await sesssionModel.updateMany(
    {
        userId: decoded.id,
        revoked: false
    },
    {
        revoked: true
    }
);
    res.clearCookie("refreshToken")
    res.status(404).json({
        message: "logged out from  All Devices successfully"
    })
}


export async function verifyEmail(req,res){
    const {otp,email}= req.body;
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    const otpDoc = await otpModel.findOne({
        email,otpHash
    })
    if(!otpDoc){
        return res.status(404).json({
            message : "Invalid Otp "
        })
    }
    const user = await UserModel.findByIdAndUpdate(
    otpDoc.user,
    { verified: true },
    { new: true }
);
    await otpModel.deleteMany({
        user: otpDoc.user
    })

    return res.status(200).json({
        message : " email verified succesfully",
        user:{
            username: user.username,
            email:user.email,
            verified: user.verified
        }
    })
}
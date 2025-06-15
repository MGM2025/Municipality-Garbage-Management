const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
// const multer = require('multer')

const userModel = require("../models/userModel");
const genToken = require('../utils/genToken');

// Configure Multer for memory storage
// const storage = multer.memoryStorage();

// const upload = multer({ 
//   storage,
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//     if (!allowedTypes.includes(file.mimetype)) {
//       return cb(new Error('Invalid file type'), false);
//     }
//     cb(null, true);
//   },
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
// });

// Middleware to parse JSON
// app.use(express.json());

class userController {
    async userRegister(req, res) {
        try{
            const {regHoldingNo, regWardNo, regFullName, regEmail, regPassword} = req.body;

            const user = await userModel.findOne({email: regEmail});
            if(user) {
                return res.status(409).json({message: "You already have an account. Please log in"});
            }

            const holdingNoCheck = await userModel.findOne({holdingNo: regHoldingNo});
            if(holdingNoCheck) {
                return res.status(409).json({message: "Your holding no is already registered!"});
            }

            const wardNoCheck = await userModel.findOne({wardNo: regWardNo});
            if(wardNoCheck) {
                return res.status(409).json({message: "Your ward no is already registered!"});
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(regPassword, salt);
    
            const createdUser = await userModel.create({
                holdingNo: regHoldingNo,
                wardNo: regWardNo,
                fullName: regFullName,
                email: regEmail,
                password : hash
            });

            const sentUser = await userModel.findById(createdUser._id).select("-password");

            const token = genToken(sentUser);
            res.cookie("token", token, {httpOnly : true});
            console.log("registered");
            return res.status(201).json({message: "User registration successful", user: sentUser});

        } catch(err) {
            console.error(err);
            return res.status(500).json({message: "Failed to register", error: err.message});
        }
    }

    async userLogin(req, res) {
        try {
            const { loginEmail, loginPassword } = req.body;
            
            const user = await userModel.findOne({ email: loginEmail });
            console.log(user)
            
            if (!user) {
                return res.status(401).json({ message: "Wrong email or password" });
            }
    
            const result = await bcrypt.compare(loginPassword, user.password);
    
            if (result) {
                const sentUser = await userModel.findById(user._id).select("-password");
    
                // Convert profilePic from Buffer to Base64 if it exists
                let profilePicBase64 = null;
                if (user.profilePic) {
                    profilePicBase64 = user.profilePic.toString('base64');
                }
    
                const tokenPayload = {
                    id: sentUser._id,
                    holdingNo: sentUser.holdingNo,
                    wardNo: sentUser.wardNo,
                    fullName: sentUser.fullName,
                    email: sentUser.email,
                    profilePic: profilePicBase64,
                    isUser: sentUser.isUser,
                };
    
                const token = genToken(tokenPayload);
                res.cookie("token", token, { httpOnly: true });
    
                return res.status(200).json({
                    message: "Log in successful",
                    user: { ...tokenPayload },
                });
            } else {
                return res.status(401).json({ message: "Wrong email or password" });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to log in", error: err.message });
        }
    }
    

    async userEdit(req, res) {
        try {
            const { fullName, username, email } = req.body;
            const profilePic = req.file;
    
            if (!profilePic) {
                return res.status(400).json({ message: "No file uploaded" });
            }
    
            // Optionally, you can save the file to a cloud storage or disk.
            // For now, we'll just log the file details.
            console.log("File received:", profilePic);
    
            // Example: Update the user's profile in the database
            const user = await userModel.findOneAndUpdate(
                { username }, // Find by username or another unique identifier
                { fullName, email, profilePic: profilePic.buffer }, // Save image buffer or URL if using cloud storage
                { new: true } // Return the updated document
            );
    
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const sentUser = await userModel.findById(user._id).select("-password");
            sentUser.profilePic = sentUser.profilePic.toString('base64');
            return res.status(200).json({ message: "Profile updated successfully", user: sentUser });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to edit user", error: err.message });
        }
    }
    

    async userLogout(req, res) {
        try{
            res.cookie("token", "");
            res.status(200).json({message: "Log out successful"})
        } catch(err){
            res.status(500).json({message: "Failed to log out"});
        }
    }
}

module.exports = new userController()
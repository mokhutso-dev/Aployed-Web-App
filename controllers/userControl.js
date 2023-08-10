// const { generateToken } = require('../config/jwtToken')
// const User = require('../models/userModel')
// const asyncHandler = require("express-async-handler")

// const createUser = asyncHandler(async (req, res) => {
//     const email = req.body.email
//     const findUser = await User.findOne({ email: email })
//     if (!findUser) {
//         const newUser = await User.create(req.body)
//         res.json({ newUser })
//     } else {
//         res.json({
//             msg: "User Already exixst",
//             success: false,
//         })
//     }
// })

// const loginUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body
//     const findUser = await User.findOne({ email })
//     if (findUser && (await findUser.isPasswordMatched(password))) {
//         res.json({
//             _id: findUser?._id,
//             firstName: findUser?.firstName,
//             lastName: findUser?.lastName,
//             email: findUser?.email,
//             mobile: findUser?.mobile,
//             token: generateToken(findUser?._id)
//         })
//     } else {
//         throw new Error("Invalid password or username")
//     }
// })

// const getAllUsers = asyncHandler(async (req, res) => {
//     try {
//         const allUsers = await User.find({})
//         res.json(allUsers)
//     } catch (error) {
//         throw new Error(error)
//     }
// })

// const getaUser = asyncHandler(async (req, res) => {
//     const { id } = req.params
//     try {
//         const getaUser = await User.findById(id)
//         res.json({ getaUser })
//     } catch {
//         throw new Error(error)
//     }
// })

// const update = asyncHandler(async (req, res) => {
//     const { id } = req.params
//     try {
//         const updatedUser = await User.findByIdAndUpdate(id,
//             {
//                 firstName: req?.body.firstName,
//                 lastName: req?.body.lastName,
//                 email: req?.body.email,
//                 mobile: req?.body.mobile
//             },
//             { new: true }
//         )
//         res.json(updatedUser)
//     } catch (error) {
//         throw new Error(error)
//     }
// })

// const deleteUser = asyncHandler(async (req, res) => {
//     const { id } = req.params
//     try {
//         const find = await User.findByIdAndDelete(id)
//         res.json(find)
//     } catch (error) {
//         throw new Error(error)
//     }
// })

// const viewAll = async (req, res) => {
//     try {
//         const posts = await User.find({})
//         res.json(posts)
//         // res.status.json(posts)
//     } catch (error) {
//         console.log(error)
//     }
// }

// const create = async (req, res) => {
//     try {
//         const post = await User.create(req.body)
//         // res.status(201).json(post)
//         res.status(201).json({
//             message: "Success",
//             data: post
//         })

//     } catch (error) {
//         console.log(error)
//     }
// }


// module.exports = { createUser, loginUser, getaUser, getAllUsers, update, deleteUser, viewAll, create }

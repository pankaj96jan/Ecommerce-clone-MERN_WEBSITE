const express = require("express")
const { registerUser, loginUser, logoutUser, forgotPassword, getUserDetails, updatePassword, getAllUsers, getSingleUser, updateProfile, UpdateUserRole, updateUserRole, deleteUserAdmin } = require("../controllers/userController")
const { isAuthenticateUser } = require("../middleware/Auth")

const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/password/forgot").post(forgotPassword)

router.route("/logout").get(logoutUser)

router.route("/me").get(isAuthenticateUser, getUserDetails)
router.route("/password/update").put(isAuthenticateUser,updatePassword)
router.route("/me/update").put(isAuthenticateUser,updateProfile)
router.route("/admin/users").get(getAllUsers)
router.route("/admin/user/:id").get(isAuthenticateUser,getSingleUser).put(isAuthenticateUser,updateUserRole).delete(isAuthenticateUser,deleteUserAdmin)

module.exports = router 
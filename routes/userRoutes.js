const express = require("express");
const {
  getUser,
  changePassword,
  updateMyFreeScoreDetails,
  getAllUsers,
  getUserById,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/profile", verifyToken, getUser);
router.put("/change-password", verifyToken, changePassword);
router.put("/update-myfreescore", verifyToken, updateMyFreeScoreDetails);
router.get("/", getAllUsers);
router.get("/:id", getUserById);

module.exports = router;

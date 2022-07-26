const express = require("express");
const router = express();
const { create, index, find, update, destroy } = require("./controller");

// router.get("/categories", (req, res) => {
//   res.status(200).json({
//     message: "Halaman Categories",
//     data: data,
//   });
// });

const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

// app.use(authenticateUser);
router.get("/categories", authenticateUser, authorizeRoles("organizer"), index);

router.get(
  "/categories/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  find
);
router.put("/categories/:id", authenticateUser, update);
router.delete("/categories/:id", authenticateUser, destroy);
router.post("/categories", authenticateUser, create);

module.exports = router;

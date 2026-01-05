const express = require("express")
const passport = require("passport")
const jwt = require("jsonwebtoken")
const isLoggedIn = require("../middlewares/isLoggedIn")

const router = express.Router()

// Google login start
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    try {
      // create token
      const token = jwt.sign(
        { id: req.user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      )

      // ✅ SET TOKEN IN COOKIE
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false // true in production
      })

      // ✅ REDIRECT TO EJS PAGE
      res.redirect("/profile") // or /dashboard

    } catch (err) {
      console.error(err)
      res.redirect("/login")
    }
  }
)

router.get("/me", isLoggedIn, (req, res) => {
  res.json({ success: true, user: req.user })
})

module.exports = router

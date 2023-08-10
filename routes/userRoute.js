const express = require("express")
const router = express.Router();

app.get('/', checkAuthenticated, (req, res) => {
    res.render("index.ejs", { name: req.user.name })
})





// const {
//     createUser,
//     loginUser,
//     getaUser,
//     getAllUsers,
//     update,
//     deleteUser, 
//     viewAll, 
//     create } = require("../controller/userControl")
// router.post("/register", createUser)
// router.post("/login", loginUser)
// router.get("/:id", getaUser)
// router.get("/users", getAllUsers)
// router.put("/:id", update)
// router.delete("/:id", deleteUser)

// router.get("/", viewAll)
// router.post("/signup", create)

// module.exports = router
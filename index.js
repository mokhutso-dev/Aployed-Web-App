// For deployment puposes .env should not be exposes
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

require("dotenv").config()
const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const passport = require("passport")
const initializePassport = require("./config/passport-config")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")
require("./config/auth")

const port = process.env.PORT || 5001

app.set("view engine", "ejs")
app.use(express.static('public'))



initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []

app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

app.use(passport, passport.initialize())
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))

// ---------------------Login with Google ---------------------- 

app.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/protected',
        failureRedirect: '/auth/google/failure'
    }));

app.get('/auth/google/failure', (req, res) => {
    res.send("something went wrong")
})

app.get('/auth/protected', isLoggedIn, (req, res) => {
    let name = req.user.displayName
    res.send(`Hello ${name}`)
})

app.get('/auth/logout', (req, res) => {
    req.session.destroy()
    res.send('See you agan')
})

// --------------------- Manual Login ----------------------------- 

app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}))

app.post("/register", checkNotAuthenticated, async (req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        console.log(users);
        res.redirect("/login")

    } catch (e) {
        console.log(e);
        res.redirect("/register")
    }
})

// Routes
app.get('/', checkAuthenticated, (req, res) => {
    res.render("index.ejs", { name: req.user.name })
})


app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render("login.ejs")
})

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render("register.ejs")
})


app.delete("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err)
        res.redirect("/")
    })
})


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/")
    }
    next()
}

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401)
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

console.log(users)




// --------------------------- Separation of Concern ---------------------------------------

// if (process.env.NODE_ENV !== "production") {
//     require("dotenv").config()
// }
// const express = require('express')
// const mongoose = require('mongoose')
// // const postRouter = require('./routes/postRoutes')

// const app = express()
// const port = process.env.PORT || 5500

// //Middleware
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// app.set("view engine", "ejs")
// app.use(express.static("public"))


// dbConnect()

// app.use('/', postRouter)

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`)
// })

// ------------------------------------------------------------------------------------------------------------

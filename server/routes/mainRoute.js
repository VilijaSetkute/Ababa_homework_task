const express = require("express");
const router = express.Router();


// middleware
const {loginValidator,
    registerValidator} = require('../middleware/userValidator')

// controllers
const {searchController,
    recommendationController,
    getFavoritesController,
    handleFavoritesController} = require("../controller/MovieController")

const {loginController,
    registerController,
    stayLoggedIn} = require('../controller/userController')


// routes
// -- movie database
router.post('/movie-search', searchController)
router.get('/recommended-movies', recommendationController)

// -- mongo database
router.get('/get-all-favorites', getFavoritesController)
router.post('/handle-favorites', handleFavoritesController)

// -- user authentication
router.post('/login', loginValidator, loginController)
router.post('/register', registerValidator, registerController)
router.get('/stayLoggedIn', stayLoggedIn)


module.exports = router ;
const favoritesSchema = require('../models/mongoFavoritesSchema')
const recommendedSchema = require('../models/mongoRecommendedSchema')
const fetch = require("node-fetch");

module.exports = {
    searchController: (req, res) => {
        const {database, searchText} = req.body
        const text = searchText.replaceAll(' ', '%20')
        const fullUrl = `${process.env.MOVIE_APIKEY}${text}`;
        if (database === 'movies') {
            fetch(fullUrl)
                .then(res => res.json())
                .then(data => {
                    if (data.Response === "True") {
                        const originalRes = data.Search
                        const withPosters = originalRes.filter(el => el.Poster.length > 3)
                        const uniqueRecords = []
                        for (const movie of withPosters) {
                            const filtered = uniqueRecords.find(el => el.imdbID === movie.imdbID)
                            if (!filtered) {
                                uniqueRecords.push(movie)
                            }
                        }
                        let message = ''
                        if (data.totalResults > 20) {
                            message = `${data.totalResults} movies found. For better experience add more keywords in search.`
                        } else {
                            message = `${uniqueRecords.length} movie(s) found.`
                        }
                        if (uniqueRecords.length > 0) {
                            res.send({success: true, movies: uniqueRecords, message: message});
                        } else {
                            res.send({success: false, message: `We couldn\'t find any movies including name ${searchText.toUpperCase()}. Please check spelling / spacing or expand your search.`});
                        }
                    } else {
                        res.send({success: false, message: `We couldn\'t find any movies including name ${searchText.toUpperCase()}. Please check spelling / spacing or expand your search.`});
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    recommendationController: async (req, res) => {
        const allRecommended = await recommendedSchema.find()
        res.send({success: true, movies: allRecommended})
    },
    getFavoritesController: async (req, res) => {
        const allFavorites = await favoritesSchema.find()
        res.send({success: true, movies: allFavorites})
    },
    handleFavoritesController: async (req, res) => {
        const {Title, Year, imdbID, Type, Poster} = req.body
        try {
            const findMovie = await favoritesSchema.findOne({imdbID: imdbID})
            if (findMovie) {
                await favoritesSchema.findOneAndDelete({imdbID: imdbID})
                const updatedFavorites = await favoritesSchema.find()
                res.send({success: true, movies: updatedFavorites, message: "Successfully removed from Favorites"})
            } else {
                const newFavorite = new favoritesSchema({
                    Title: Title,
                    Year: Year,
                    imdbID: imdbID,
                    Type: Type,
                    Poster: Poster
                })
                await newFavorite.save()
                const updatedFavorites = await favoritesSchema.find()
                res.send({success: true, movies: updatedFavorites, message: "Successfully added to Favorites"})
            }
        } catch (err) {
            console.log(err)
        }
    }
};
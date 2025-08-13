import express from "express";
import { addShow, getNowPlayingMovies, getShow, getShows, getUpcomingMovies } from "../controllers/showController.js";

const showRouter=express.Router();

showRouter.get("/now-playing",getNowPlayingMovies)
showRouter.get("/upcoming-movies",getUpcomingMovies);
showRouter.post("/add",addShow);
showRouter.get("/all",getShows);
showRouter.get("/:movieId",getShow);

// showRouter.get("/trailer/",getMovieTrailer);

export default showRouter;
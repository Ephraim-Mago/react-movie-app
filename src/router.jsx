import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Actors from "./views/Actors";
import ActorShow from "./views/ActorShow";
import RouteNotFound from "./views/errors/RouteNotFound";
import Home from "./views/Home";
import Movies from "./views/Movies";
import MovieShow from "./views/MovieShow";
import TvShows from "./views/TvShows";
import TvShowDetail from "./views/TvShowDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <RouteNotFound />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/movies",
                element: <Movies />,
            },
            {
                path: "/movies/:id",
                element: <MovieShow />,
            },
            {
                path: "/actors",
                element: <Actors />,
            },
            {
                path: "/actors/:id",
                element: <ActorShow />,
            },
            {
                path: "/tv-shows",
                element: <TvShows />,
            },
            {
                path: "/tv-shows/:id",
                element: <TvShowDetail />,
            },
        ],
    },
]);

export default router;

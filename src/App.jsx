import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/core/Header";
import useMovieSlice from "./composables/movie";
import useActorSlice from "./composables/actor";
import useTvShowSlice from "./composables/tvshow";
import Footer from "./components/core/Footer";

export default function App() {
    const { findAllMovies } = useMovieSlice();
    const { findAllActors } = useActorSlice();
    const { allTvShows } = useTvShowSlice();
    const [started, setStarted] = useState(true);

    const initialise = async () => {
        await findAllMovies();
        await findAllActors();
        await allTvShows();
    };

    useEffect(() => {
        if (started) {
            initialise();
            setStarted(false);
        }
    }, []);

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

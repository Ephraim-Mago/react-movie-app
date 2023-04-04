import { useEffect, useState } from "react";
import PageComponent from "../components/core/PageComponent";
import MovieList from "../components/movie/MovieList";
import { useStateContext } from "../contexts/ContextProvider";

export default function Home() {
    const { movies } = useStateContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [movies]);

    return (
        <>
            <PageComponent loanded={true} status={loading}>
                {/* Popular Movies */}
                {movies.popularMovies && (
                    <MovieList
                        classes="popular-movies"
                        title="Popular Movies"
                        movies={movies.popularMovies.data}
                    />
                )}

                {/* Now Playing */}
                {movies.playingMovies && (
                    <MovieList
                        classes="now-playing-movies py-24"
                        title="Now Playing"
                        movies={movies.playingMovies.data}
                    />
                )}
            </PageComponent>
        </>
    );
}

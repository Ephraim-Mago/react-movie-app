import { useEffect, useState } from "react";
import PageComponent from "../components/core/PageComponent";
import MovieList from "../components/movie/MovieList";
import { useStateContext } from "../contexts/ContextProvider";

export default function TvShows() {
    const { tvShows } = useStateContext();
    const [loading, setLoading] = useState(true);
    const [first, setFirst] = useState(false);

    useEffect(() => {
        if (first) {
            setTimeout(() => {
                setLoading(false);
            }, 5000);
            setFirst(true);
        } else {
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }
    }, []);

    return (
        <>
            <PageComponent loanded={true} status={loading}>
                {/* Popular Shows */}
                {tvShows.popularShows && (
                    <MovieList
                        movies={tvShows.popularShows.data}
                        title="Popular Shows"
                        classes="popular-tv-shows"
                        link="tv-shows"
                    />
                )}

                {tvShows.popularShows && (
                    <MovieList
                        movies={tvShows.topRatedShows.data}
                        title="Top Rated Shows"
                        classes="top-rated-shows py-24"
                        link="tv-shows"
                    />
                )}
            </PageComponent>
        </>
    );
}

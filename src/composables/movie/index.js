import apiClient from "../../api";
import { useStateContext } from "../../contexts/ContextProvider";
import useDataFunctions from "../../helpers/useDataFunctions";

export default function useMovieSlice() {
    const { setMovies } = useStateContext();
    const { arrayFormated, getAllGenres, find } = useDataFunctions("movie");

    const findAllMovies = async () => {
        await getAllGenres();
        let popularMovies = await apiClient.get("/movie/popular");
        let playingMovies = await apiClient.get("/movie/now_playing");

        formated({
            popularMovies: popularMovies.data,
            playingMovies: playingMovies.data,
        });
    };

    const formated = (array) => {
        setMovies({
            popularMovies: {
                data: arrayFormated(array.popularMovies.results),
                meta: {
                    page: array.popularMovies.page,
                    total_pages: array.popularMovies.total_pages,
                    total_results: array.popularMovies.total_results,
                },
            },
            playingMovies: {
                data: arrayFormated(array.playingMovies.results),
                meta: {
                    page: array.playingMovies.page,
                    total_pages: array.playingMovies.total_pages,
                    total_results: array.playingMovies.total_results,
                },
            },
        });
    };

    const sigleMovie = async (id) => {
        return await find("movie", id);
    };

    return {
        findAllMovies,
        sigleMovie,
    };
}

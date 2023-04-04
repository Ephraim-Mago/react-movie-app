import apiClient from "../../api";
import { useStateContext } from "../../contexts/ContextProvider";
import useDataFunctions from "../../helpers/useDataFunctions";

export default function useTvShowSlice() {
    const { setTvShows } = useStateContext();
    const { arrayFormated, getAllGenres, find } = useDataFunctions("tv-show");

    const allTvShows = async () => {
        await getAllGenres();
        let popularShows = await apiClient.get("/tv/popular");
        let topRatedShows = await apiClient.get("/tv/top_rated");

        formated({
            popularShows: popularShows.data,
            topRatedShows: topRatedShows.data,
        });
    };

    const formated = (data) => {
        setTvShows({
            popularShows: {
                data: arrayFormated(data.popularShows.results),
                meta: {
                    page: data.popularShows.page,
                    total_pages: data.popularShows.total_pages,
                    total_results: data.popularShows.total_results,
                },
            },
            topRatedShows: {
                data: arrayFormated(data.topRatedShows.results),
                meta: {
                    page: data.topRatedShows.page,
                    total_pages: data.topRatedShows.total_pages,
                    total_results: data.topRatedShows.total_results,
                },
            },
        });
    };

    const sigleTvShow = async (id) => {
        return await find("tv", id);
    };

    return {
        allTvShows,
        sigleTvShow,
    };
}

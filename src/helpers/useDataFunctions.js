import apiClient from "../api";
import useArrayFunctions from "./useArrayFunctions";
import useDateFunctions from "./useDateFunctions";

export default function useDataFunctions(type) {
    const { formatDate } = useDateFunctions();
    const { arrayLimit } = useArrayFunctions();
    let genres = [];

    const getAllGenres = async () => {
        let url = type == "movie" ? "/genre/movie/list" : "/genre/tv/list";
        let genresArray = await apiClient.get(url);

        genres = genresArray.data.genres;
    };

    const find = async (url, id) => {
        let response = await apiClient.get(
            `/${url}/${id}?append_to_response=videos,images,credits`
        );

        return objectFormated(response.data);
    };

    const attributes = (mode = "all", data) => {
        const options = {
            id: data.id,
            title: type == "movie" ? data.title : data.name,
            release_date: formatDate(
                type == "movie" ? data.release_date : data.first_air_date,
                2
            ),
            vote_average: `${Math.trunc(data.vote_average * 10)} %`,
            poster_path: `https://image.tmdb.org/t/p/w500/${data.poster_path}`,
            genres:
                mode == "all"
                    ? data.genre_ids.map((ids) => findGenre(ids)).join(", ")
                    : data.genres.map((value) => value.name).join(", "),
        };

        if (mode == "all") {
            return options;
        } else {
            const addings = {
                overview: data.overview,
                casts: arrayLimit(
                    data.credits.cast.map((item) => {
                        return {
                            ...item,
                            profile_path: item.profile_path
                                ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                                : `https://ui-avatars.com/api/?size=235&name=${item.name}`,
                        };
                    }),
                    10
                ),
                crews: arrayLimit(data.credits.crew, 5),
                backdrops: arrayLimit(data.images.backdrops, 10),
                video: data.videos.results.shift(),
            };

            return { ...options, ...addings };
        }
    };

    const findGenre = (id) => {
        let genre = genres.find((genre) => genre.id == id);
        return genre ? genre.name : null;
    };

    const arrayFormated = (data) => {
        return data.map((item) => {
            return attributes("all", item);
        });
    };

    const objectFormated = (data) => {
        return attributes("find", data);
    };

    return {
        getAllGenres,
        arrayFormated,
        objectFormated,
        find,
    };
}

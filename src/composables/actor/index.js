import { useStateContext } from "../../contexts/ContextProvider";
import apiClient from "../../api";
import useDateFunctions from "../../helpers/useDateFunctions";
import useArrayFunctions from "../../helpers/useArrayFunctions";

export default function useActorSlice() {
    const { setActors } = useStateContext();
    const { formatDate, getAge } = useDateFunctions();
    const { arrayLimit } = useArrayFunctions();

    const findAllActors = async (params = "") => {
        let url =
            params != ""
                ? `https://api.themoviedb.org/3/person/popular?page=${params}`
                : "https://api.themoviedb.org/3/person/popular";

        let response = await apiClient
            .get(url)
            .catch((err) => console.log(err));

        formated(response.data);
    };

    const sigleActor = async (id) => {
        let response = await apiClient.get(
            `/person/${id}?append_to_response=videos,images,credits,external_ids`
        );

        return attributes("find", response.data);
    };

    const formated = (array) => {
        setActors({
            data: array.results.map((actor) => {
                return {
                    id: actor.id,
                    name: actor.name,
                    profile_path: actor.profile_path
                        ? `https://image.tmdb.org/t/p/w235_and_h235_face/${actor.profile_path}`
                        : `https://ui-avatars.com/api/?size=235&name=${actor.name}`,
                    movies: actor.known_for
                        .map((item) => (item.title ? item.title : item.name))
                        .join(", "),
                };
            }),
            meta: {
                page: array.page,
                total_pages: array.total_pages,
                total_results: array.total_results,
            },
        });
    };

    const attributes = (mode = "all", actor) => {
        const options = {
            id: actor.id,
            name: actor.name,
            profile_path: actor.profile_path
                ? `https://image.tmdb.org/t/p/w235_and_h235_face/${actor.profile_path}`
                : `https://ui-avatars.com/api/?size=235&name=${actor.name}`,
            movies:
                mode == "all"
                    ? actor.known_for
                          .map((item) => (item.title ? item.title : item.name))
                          .join(", ")
                    : arrayLimit(
                          actor.credits.cast.map((item) => {
                              return {
                                  ...item,
                                  poster_path: item.poster_path
                                      ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                                      : `https://ui-avatars.com/api/?size=235&name=${item.title}`,
                              };
                          }),
                          10
                      ),
        };

        if (mode == "all") {
            return options;
        } else {
            const addings = {
                external_ids: actor.external_ids,
                socials: getSocials(actor.external_ids),
                place_of_birth: actor.place_of_birth,
                biography: actor.biography,
                birthday: formatDate(actor.birthday),
                age: getAge(actor.birthday),
                crews: arrayLimit(
                    actor.credits.crew.map((item) => {
                        return {
                            ...item,
                            poster_path: item.poster_path
                                ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                                : `https://ui-avatars.com/api/?size=235&name=${item.title}`,
                        };
                    }),
                    5
                ),
            };

            return { ...options, ...addings };
        }
    };

    const getSocials = (data) => {
        let socials = [];

        for (const property in data) {
            if (
                property === "twitter_id" &&
                data["twitter_id"] != null &&
                data["twitter_id"].length > 0
            ) {
                socials.push({
                    name: "twitter",
                    url: `https://twitter.com/${data["twitter_id"]}`,
                });
            } else if (
                property === "facebook_id" &&
                data["facebook_id"] != null &&
                data["facebook_id"].length > 0
            ) {
                socials.push({
                    name: "facebook",
                    url: `https://facebook.com/${data["facebook_id"]}`,
                });
            } else if (
                property === "instagram_id" &&
                data["instagram_id"] != null &&
                data["instagram_id"].length > 0
            ) {
                socials.push({
                    name: "instagram",
                    url: `https://instagram.com/${data["instagram_id"]}`,
                });
            }
        }

        return socials;
    };

    return {
        findAllActors,
        sigleActor,
    };
}

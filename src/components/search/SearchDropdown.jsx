import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useArrayFunctions from "../../helpers/useArrayFunctions";
import useOutsideClick from "../../hooks/useOutsideClick";
import apiClient from "../../api";

export default function SearchDropdown() {
    const { arrayLimit } = useArrayFunctions();
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(true);

    const sendNo = () => setShow(false);

    const ref = useRef(null);
    useOutsideClick(sendNo, ref);

    const find = async () => {
        let response = await apiClient
            .get(`/search/movie?query=${search}`)
            .catch((err) => console.log(err));

        setData(arrayLimit(response.data.results, 7));

        setLoading(false);
    };

    const handleClick = (ev) => {
        setShow(false);
        setSearch("");
    };

    useEffect(() => {
        if (search.length >= 2) {
            setLoading(true);
            setShow(true);
            find();
        }
    }, [search]);

    return (
        <>
            <div className="relative mt-3 md:mt-0" ref={ref}>
                <input
                    type="text"
                    value={search}
                    onChange={(ev) => setSearch(ev.target.value)}
                    onFocus={() => setShow(true)}
                    className="bg-gray-800 rounded-full w-64 px-4 pl-8 py-1 focus:outline-none focus:shadow-outline"
                    placeholder="Search"
                />
                <div className="absolute top-0">
                    <i className="fa fa-search fill-current w-4 text-gray-500 mt-2 ml-2"></i>
                </div>

                {loading && (
                    <div className="spinner top-0 right-0 mr-4 mt-4"></div>
                )}

                {search.length >= 2 && show && (
                    <div className="absolute bg-gray-800 text-sm rounded w-64 mt-4">
                        {data.length > 0 ? (
                            <ul>
                                {data.map((movie, i) => (
                                    <li
                                        key={i}
                                        className="border-b border-gray-700"
                                    >
                                        <Link
                                            to={`/movies/${movie.id}`}
                                            onClick={handleClick}
                                            className="hover:bg-gray-700 px-3 py-3 flex items-center"
                                        >
                                            <>
                                                {movie.poster_path ? (
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                                        alt="pster"
                                                        className="w-8"
                                                    />
                                                ) : (
                                                    <i className="fa fa-file-movie-o fa-2x w-8"></i>
                                                )}
                                                <span className="ml-4">
                                                    {movie.title}
                                                </span>
                                            </>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="px-3 py-3">
                                No results for {search}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

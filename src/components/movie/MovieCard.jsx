import { Link } from "react-router-dom";

export default function MovieCard({ movie, link }) {
    return (
        <>
            <div className="mt-8">
                <Link to={`/${link}/${movie.id}`}>
                    <img
                        src={movie.poster_path}
                        alt={movie.title}
                        className="hover:opacity-75 transition ease-in-out duration-150"
                    />
                </Link>
                <div className="mt-2">
                    <Link
                        to={`/${link}/${movie.id}`}
                        className="text-lg mt-2 hover:text-gray-300"
                    >
                        {movie.title}
                    </Link>
                    <div className="flex items-center text-gray-400 text-sm mt-1">
                        <span className="ml-1">
                            <i
                                className="fa fa-star me-1 text-orange-400"
                                style={{
                                    fontSize: "0.8rem",
                                }}
                            ></i>
                            {movie.vote_average}
                        </span>
                        <span className="mx-2">|</span>
                        <span>{movie.release_date}</span>
                    </div>
                    <div className="text-gray-400 text-sm">{movie.genres}</div>
                </div>
            </div>
        </>
    );
}

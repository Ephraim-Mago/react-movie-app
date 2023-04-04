import { useState } from "react";
import { Link } from "react-router-dom";
import ImageView from "./movie/ImageView";
import IframeVideoCard from "./movie/IframeVideoCard";

export default function ShowCard({
    data,
    crews = true,
    video = true,
    casts = true,
    images = true,
}) {
    const movie = data;
    const [show, setShow] = useState(false);
    const [image, setImage] = useState("");

    return (
        <>
            <div className="px-8">
                <div className="movie-info border-b border-gray-800">
                    <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row">
                        <img
                            src={movie.poster_path}
                            alt={movie.title}
                            className="w-64 md:w-96"
                        />
                        <div className="md:ml-24">
                            <h2 className="text-4xl font-semibold">
                                {movie.title}
                            </h2>
                            <div className="flex flex-wrap items-center text-gray-400 text-sm mt-1">
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
                                <span className="mx-2">|</span>
                                <span>{movie.genres}</span>
                            </div>

                            <p className="text-gray-300 mt-8">
                                {movie.overview}
                            </p>

                            {crews && (
                                <div className="mt-12">
                                    <h4 className="text-white font-semibold">
                                        Featured Crew
                                    </h4>
                                    {movie.crews && (
                                        <div className="flex mt-4">
                                            {movie.crews.map((credit, i) => (
                                                <div key={i} className="mr-8">
                                                    <h5>{credit.name}</h5>
                                                    <p className="text-sm text-gray-400">
                                                        {credit.job}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {video && movie.video && (
                                <>
                                    <div className="mt-12">
                                        <button
                                            onClick={() => setShow(true)}
                                            title={movie.video.site}
                                            className="inline-flex items-center bg-orange-500 text-gray-900 rounded font-semibold px-5 py-5 hover:bg-orange-600 transition ease-in-out duration-150"
                                        >
                                            <i className="fa fa-play-circle-o fa-2x me-2"></i>
                                            <span className="ml-2">
                                                Play Trailer
                                            </span>
                                        </button>
                                    </div>

                                    {/* Iframe Video */}
                                    <IframeVideoCard
                                        video={movie.video}
                                        show={show}
                                        setShow={setShow}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {casts && (
                    <div className="movie-cast border-b border-gray-800">
                        <div className="container mx-auto px-4 py-20">
                            <h2 className="text-4xl font-semibold">Cast</h2>
                            {movie.casts && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                    {movie.casts.map((item, i) => (
                                        <div key={i} className="mt-8">
                                            {item.profile_path && (
                                                <Link to={`/actors/${item.id}`}>
                                                    <img
                                                        src={item.profile_path}
                                                        alt={item.name}
                                                        className="hover:opacity-75 transition ease-in-out duration-150"
                                                    />
                                                </Link>
                                            )}
                                            <div className="mt-2">
                                                <Link to={`/actors/${item.id}`}>
                                                    <p className="text-lg mt-2 hover:text-gray-300">
                                                        {item.name}
                                                    </p>
                                                </Link>
                                                <p className="text-sm text-gray-500">
                                                    {item.character}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {images && (
                    <>
                        <div className="movie-cast border-b border-gray-800">
                            <div className="container mx-auto px-4 py-16">
                                <h2 className="text-4xl font-semibold">
                                    Images
                                </h2>
                                {movie.backdrops && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                        {movie.backdrops.map((image, i) => (
                                            <div key={i} className="mt-8">
                                                <a className="cursor-pointer">
                                                    <img
                                                        onClick={() =>
                                                            setImage(
                                                                image.file_path
                                                            )
                                                        }
                                                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                                        alt="Image"
                                                    />
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Image Component */}
                        <ImageView image={image} onCloseClick={setImage} />
                    </>
                )}
            </div>
        </>
    );
}

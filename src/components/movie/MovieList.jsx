import MovieCard from "./MovieCard";

export default function MovieList({
    movies,
    title,
    classes = "",
    link = "movies",
}) {
    return (
        <>
            {movies && (
                <>
                    <div className="container mx-auto px-8 pt-16">
                        <div className={classes}>
                            <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">
                                {title}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                {movies.map((movie, i) => (
                                    <MovieCard
                                        key={i}
                                        link={link}
                                        movie={movie}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

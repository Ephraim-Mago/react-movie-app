import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageComponent from "../components/core/PageComponent";
import PaginationLinks from "../components/core/PaginationLinks";
import useActorSlice from "../composables/actor";
import { useStateContext } from "../contexts/ContextProvider";

export default function Actors() {
    const { actors } = useStateContext();
    const { findAllActors } = useActorSlice();
    const [loading, setLoading] = useState(true);
    const [first, setFirst] = useState(true);

    useEffect(() => {
        if (first) {
            setTimeout(() => {
                setLoading(false);
            }, 2000);

            setFirst(false);
        }
    }, []);

    useEffect(() => {
        if (!first) {
            setLoading(true);

            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }, [actors]);

    return (
        <>
            <PageComponent loanded={true} status={loading}>
                <div className="container mx-auto px-4 py-16">
                    <div className="popular-actors">
                        <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">
                            Popular Actors
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                            {actors.data &&
                                actors.data.map((actor) => (
                                    <div key={actor.id} className="actor mt-8">
                                        <Link to={`/actors/${actor.id}`}>
                                            <img
                                                src={actor.profile_path}
                                                alt="Actor"
                                                className="hover:opacity-75 transition ease-in-out duration-150"
                                            />
                                        </Link>
                                        <div className="mt-2">
                                            <Link
                                                to={`/actors/${actor.id}`}
                                                className="text-lg mt-2 hover:text-gray-300"
                                            >
                                                {actor.name}
                                            </Link>
                                            <div className="text-sm truncate text-gray-400">
                                                {actor.movies}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {actors.meta && (
                        <PaginationLinks
                            meta={actors.meta}
                            onPageClick={findAllActors}
                        />
                    )}
                </div>
            </PageComponent>
        </>
    );
}

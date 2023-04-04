import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageComponent from "../components/core/PageComponent";
import useActorSlice from "../composables/actor";

export default function ActorShow() {
    const { sigleActor } = useActorSlice();
    const { id } = useParams();
    const [actor, setActor] = useState({});
    const [loading, setLoading] = useState(true);

    const find = async () => {
        let response = await sigleActor(id);
        setActor(response);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    useEffect(() => {
        find();
    }, []);

    return (
        <>
            <PageComponent loanded={true} status={loading}>
                <>
                    <div className="actor-info border-b border-gray-800">
                        <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row">
                            <div className="flex-none">
                                <img
                                    src={actor.profile_path}
                                    alt={actor.name}
                                    className="w-64 md:w-96 h-fit block"
                                />

                                <ul className="flex items-center mt-4">
                                    {actor.socials &&
                                        actor.socials.map((social) => (
                                            <li key={social.name}>
                                                <Link
                                                    to={social.url}
                                                    className={`fa fa-${social.name} fa-2x hover:text-orange-400 mr-4`}
                                                    title={social.name}
                                                    target="_blank"
                                                ></Link>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            <div className="md:ml-24">
                                <h2 className="text-4xl font-semibold">
                                    {actor.name}
                                </h2>
                                <div className="flex flex-wrap items-center text-gray-400 text-sm mt-1">
                                    <span className="ml-1">
                                        <i
                                            className="fa fa-birthday-cake me-1 text-orange-400"
                                            style={{
                                                fontSize: "0.8rem",
                                            }}
                                        ></i>
                                        {actor.birthday}
                                    </span>
                                    <span className="mx-2">
                                        ({actor.age} years old)
                                    </span>
                                    <span>in {actor.place_of_birth}</span>
                                </div>

                                <p className="text-gray-300 mt-8">
                                    {actor.biography}
                                </p>

                                <h4 className="mt-14 font-semibold">
                                    Know For
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                                    {actor.crews &&
                                        actor.crews.map((crew) => (
                                            <div key={crew.id} className="mt-4">
                                                <Link to={`/movies/${crew.id}`}>
                                                    <img
                                                        src={crew.poster_path}
                                                        alt="poster"
                                                        className="hover:opacity-75 transition ease-in-out duration-150"
                                                    />
                                                </Link>

                                                <Link
                                                    to={`/movies/${crew.id}`}
                                                    className="text-sm leading-none block text-gray-100 hover:text-gray-400 mt-1"
                                                >
                                                    {crew.title}
                                                </Link>

                                                <p className="text-sm leading-none block text-gray-400 mt-1">
                                                    {crew.job}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="actor-credits border-b border-gray-800">
                        <div className="container mx-auto px-4 py-20">
                            <h2 className="text-4xl font-semibold">Credits</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                {actor.movies &&
                                    actor.movies.map((cast) => (
                                        <div key={cast.id} className="mt-4">
                                            <Link to={`/movies/${cast.id}`}>
                                                <img
                                                    src={cast.poster_path}
                                                    alt="poster"
                                                    className="hover:opacity-75 transition ease-in-out duration-150"
                                                />
                                            </Link>

                                            <Link
                                                to={`/movies/${cast.id}`}
                                                className="text-sm font-semibold leading-none block text-white hover:text-gray-400 mt-1"
                                            >
                                                {cast.title}
                                            </Link>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </>
            </PageComponent>
        </>
    );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageComponent from "../components/core/PageComponent";
import useMovieSlice from "../composables/movie";
import ShowCard from "../components/ShowCard";

export default function MovieShow() {
    const { sigleMovie } = useMovieSlice();
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const [first, setFirst] = useState(true);

    const find = async () => {
        let response = await sigleMovie(id);
        // console.log(response);
        setMovie(response);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    useEffect(() => {
        if (first) {
            find();

            setFirst(false);
        }
    }, []);

    useEffect(() => {
        setLoading(true);

        find();
    }, [id]);

    return (
        <>
            <PageComponent loanded={true} status={loading}>
                <ShowCard data={movie} />
            </PageComponent>
        </>
    );
}

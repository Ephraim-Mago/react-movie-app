import { useEffect, useState } from "react";
import PageComponent from "../components/core/PageComponent";
import { useParams } from "react-router-dom";
import useTvShowSlice from "../composables/tvshow";
import ShowCard from "../components/ShowCard";

export default function TvShowDetail() {
    const { id } = useParams();
    const { sigleTvShow } = useTvShowSlice();
    const [tvShow, setTvShow] = useState({});
    const [loading, setLoading] = useState(true);

    const find = async () => {
        let response = await sigleTvShow(id);

        setTvShow(response);
    };

    useEffect(() => {
        find();

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <>
            <PageComponent loanded={true} status={loading}>
                <ShowCard data={tvShow} />
            </PageComponent>
        </>
    );
}

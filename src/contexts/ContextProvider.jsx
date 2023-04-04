import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    movies: {},
    setMovies: () => {},
    actors: {},
    setActors: () => {},
    tvShows: {},
    setTvShows: () => {},
});

export const ContextProvider = ({ children }) => {
    const [movies, setMovies] = useState({});
    const [actors, setActors] = useState({});
    const [tvShows, setTvShows] = useState({});

    return (
        <StateContext.Provider
            value={{
                movies,
                setMovies,
                actors,
                setActors,
                tvShows,
                setTvShows,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);

import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS, GET_MOVIES_API } from "../../utils/constants";


const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    const get_NowPlayingAPIMOvies = async () => {
        const data = await fetch(GET_MOVIES_API, API_OPTIONS);
        const json = await data.json();
        console.log(json.results);
        dispatch(addNowPlayingMovies(json.results));
    }

    useEffect(() => {
        get_NowPlayingAPIMOvies();
    }, []);
}

export default useNowPlayingMovies;
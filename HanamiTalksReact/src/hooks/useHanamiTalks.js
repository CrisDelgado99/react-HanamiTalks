import { useContext } from "react";
import HanamiTalksContext from "../context/HanamiTalksProvider";

const useHanamiTalks = () => {
    return useContext(HanamiTalksContext)
}

export default useHanamiTalks;
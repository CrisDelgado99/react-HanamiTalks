import { createContext, useState, useEffect } from "react";

const HanamiTalksContext = createContext();
const HanamiTalksProvider = ({ children }) => {
    //STATES
    const [currentKanjiTopic, setCurrentKanjiTopic] = useState("");
    const [currentVocabularyTopic, setCurrentVocabularyTopic] = useState("");
    const [currentGrammarTopic, setCurrentGrammarTopic] = useState("");

    const handleClickVisually = () => {
        
    }

    return (
        <HanamiTalksContext.Provider
            value={{
                currentKanjiTopic,
                setCurrentKanjiTopic,
                currentVocabularyTopic,
                setCurrentVocabularyTopic,
                currentGrammarTopic,
                setCurrentGrammarTopic,
            }}
        >
            {children}
        </HanamiTalksContext.Provider>
    );
};

export { HanamiTalksProvider };
export default HanamiTalksContext;

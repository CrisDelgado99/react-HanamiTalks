import { createContext, useState, useEffect } from "react";
import axiosClient from "../config/axios";

const HanamiTalksContext = createContext();
const HanamiTalksProvider = ({ children }) => {
    //STATES
    const [isAdmin, setIsAdmin] = useState(true);
    const [currentKanjiTopic, setCurrentKanjiTopic] = useState("");
    const [currentVocabularyTopic, setCurrentVocabularyTopic] = useState("");
    const [currentGrammarTopic, setCurrentGrammarTopic] = useState("");

    //VARIABLES
    const [userLevel, setUserLevel] = useState(3);

    //FUNCTIONS
    //This function takes the topic titles to make the main menu
    //of: kanji, vocabulary, grammar.
    const handleClickCheckbox = (e) => {
        //e.stopPropagation();
    }

    const printListElement = (item, index, userLvl) => {
        setUserLevel(userLvl);
        return (
            <div
                key={index}
                className={
                    item.level > userLevel
                        ? "card--simple list deactivated"
                        : "card--simple list activated"
                }
            >
                <ul>
                    <li>{item.topicTitle}</li>
                </ul>
                <div className="buttons">
                    <div className="lock">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 dispNone"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                            />
                        </svg>
                    </div>
                    <div
                        className={
                            userLevel === item.level
                                ? "check check--transparent"
                                : "check"
                        }
                        onClick={
                            userLevel === item.level
                                ? (e) => handleClickCheckbox(e)
                                : null
                        }
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <HanamiTalksContext.Provider
            value={{
                printListElement,
                userLevel,
                isAdmin,
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

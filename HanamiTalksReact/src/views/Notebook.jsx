import React from "react";
import "./../assets/css/notebook.css";
import { useAuth } from "../hooks/useAuth";
import axiosClient from "../config/axios";
import useSWR from "swr";
import LoadingScreen from "../components/LoadingScreen";

export default function Notebook() {
    const { user } = useAuth({ middleware: "auth" });
    const currentUser = user.data;

    // Function to sort by id
    function sortById(a, b) {
        return a.id - b.id;
    }

    // Sort each array
    const userKanjiList = currentUser.kanjis.sort(sortById);
    const userVocabList = currentUser.vocabularies.sort(sortById);
    const userGrammarList = currentUser.grammars.sort(sortById);

    // Using useSWR to fetch data
    const token = localStorage.getItem("AUTH_TOKEN"); // Retrieve the token from local storage

    const fetcher = async () => {
        return axiosClient("/api/grammarUses", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => response.data.data);
    };

    const { data, error, isLoading } = useSWR("/api/grammarUses", fetcher);

    // Handle loading, error, and data states
    if (isLoading)
        return (
            <LoadingScreen/>
        );
    if (error)
        return (
            <div>
                <h1>Error: {error.message}</h1>
            </div>
        );

    const arrGrammarUses = data;

    return (
        <div className="card--notebook">
            <h1>{currentUser.nickname}'s notebook</h1>

            {userVocabList.length == 0 && userKanjiList.length == 0 && userGrammarList.length == 0 
                ? (<p className="japanese message--empty">Your notebook is empty right now! You can add any kanji, vocabulary or grammar topic you want to study further.</p>)
                : null
            }
            {userKanjiList.length > 0 ? (
                <div>
                    <h2>Your kanjis:</h2>
                    {userKanjiList.map((kanji, index) => (
                        <div key={index} className="card--notebook__item">
                            <h3 className="mark h3--kanji japanese">
                                {kanji.symbol} - {kanji.translation}
                            </h3>
                            <ul>
                                <li className="japanese">
                                    Kunyomi: {kanji.kunyomi}
                                </li>
                                <li className="japanese">
                                    Onyomi: {kanji.onyomi}
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
            ) : null}

            {userVocabList.length > 0 ? (
                <div>
                    <h2>Your vocabulary:</h2>
                    {userVocabList.map((vocabulary, index) => (
                        <div key={index} className="card--notebook__item">
                            <h3 className="mark h3--vocabulary japanese">
                                {vocabulary.word} - {vocabulary.translation}
                            </h3>
                            <ul>
                                <li className="japanese">
                                    Kana: {vocabulary.kana}
                                </li>
                                <li className="japanese">
                                    Romaji: {vocabulary.romaji}
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
            ) : null}

            {userGrammarList.length > 0 ? (
                <div>
                    <h2>Your grammar:</h2>
                    {userGrammarList.map((grammar, index) => {
                        const userGrammarUses = arrGrammarUses.filter(
                            (grammarUse) => grammarUse.grammar_id === grammar.id
                        );
                        return (
                            <div key={index} className="card--notebook__item">
                                <h3 className="mark h3--grammar japanese">
                                    {grammar.topicTitle}
                                </h3>
                                <ul>
                                    <li className="japanese">
                                        {grammar.description}
                                    </li>
                                    {userGrammarUses.length > 0 && (
                                        <ul>
                                            {userGrammarUses.map(
                                                (grammarUse, useIndex) => (
                                                    <ul key={useIndex} className="list--grammarUses">
                                                        <li
                                                            className="japanese"
                                                        >
                                                            <h2 className="japanese mark h2--grammar">{grammarUse.title}</h2>
                                                        </li>
                                                        <li className="japanese">{grammarUse.description}</li>
                                                        <li className="japanese">Example: {grammarUse.example}</li>
                                                    </ul>
                                                )
                                            )}
                                        </ul>
                                    )}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            ) : null}
        </div>

    );
}

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useHanamiTalks from "../hooks/useHanamiTalks";
import "./../assets/css/grammar.css";
import useSWR from "swr";
import axiosClient from "../config/axios";
import { useAuth } from "../hooks/useAuth";

export default function GrammarTopic() {
    const { currentGrammarTopic } = useHanamiTalks();

    const { user } = useAuth({ middleware: "Auth" });
    const [currentUser, setCurrentUser] = useState(user.data);
    const [currentUserGrammars, setCurrentUserGrammars] = useState(currentUser.grammars);

    const [inNotebook, setInNotebook] = useState(false);
    const [objCurrentGrammar, setObjCurrentGrammar] = useState(null);
    const token = localStorage.getItem("AUTH_TOKEN"); // Retrieve the token from local storage

    // Using useSWR to fetch data
    const fetcher = async () => {
        return axiosClient(`/api/grammars/topic/${currentGrammarTopic}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => response.data.data);
    };

    const { data, error, isLoading } = useSWR(`/api/grammars/topic/${currentGrammarTopic}`, fetcher);

    useEffect(() => {
        if (data && data.length > 0) {
            const grammar = data[0];
            setObjCurrentGrammar(grammar);
            setInNotebook(currentUserGrammars.some(grammarUser => grammarUser.topicTitle === grammar.topicTitle));
        }
    }, [data, currentUserGrammars]);

    // Handle loading, error, and data states
    if (isLoading) return <div><h1>Loading...</h1></div>;
    if (error) return <div><h1>Error: {error.message}</h1></div>;
    if (!objCurrentGrammar) return null;

    const arrGrammarUse = objCurrentGrammar.grammar_uses;

    // ADD A GRAMMAR TO THE USER'S NOTEBOOK
    const handleClickNotebookAdd = (e) => {
        e.stopPropagation();
        const grammarId = objCurrentGrammar.id;
        updateUserAddGrammar(grammarId);
    };

    const updateUserAddGrammar = async (grammarId) => {
        const updatedUser = { ...currentUser };

        let prevKanjis = updatedUser.kanjis.map((kanji) => kanji.id);
        let prevGrammars = updatedUser.grammars.map((grammar) => grammar.id);
        let prevVocabularies = updatedUser.vocabularies.map((vocabulary) => vocabulary.id);

        prevGrammars.push(grammarId);

        updatedUser.kanjis = prevKanjis;
        updatedUser.vocabularies = prevVocabularies;
        updatedUser.grammars = prevGrammars;

        try {
            const response = await axiosClient.post(
                `/api/users/${updatedUser.id}`,
                updatedUser,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const updatedUserGrammars = response.data.data.grammars;

            // Update the inNotebook state after the request is successful
            setInNotebook(updatedUserGrammars.some(grammarUser => grammarUser.topicTitle === objCurrentGrammar.topicTitle));

            setCurrentUser(response.data.data);
            setCurrentUserGrammars(updatedUserGrammars);

            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            // Handle the error appropriately
            throw error;
        }
    };

    // REMOVE A GRAMMAR FROM THE USER'S NOTEBOOK
    const handleClickNotebookRemove = (e) => {
        e.stopPropagation();
        const grammarId = objCurrentGrammar.id;
        updateUserRemoveGrammar(grammarId);
    };

    const updateUserRemoveGrammar = async (grammarId) => {
        const updatedUser = { ...currentUser };

        let prevKanjis = updatedUser.kanjis.map((kanji) => kanji.id);
        let prevGrammars = updatedUser.grammars.map((grammar) => grammar.id);
        let prevVocabularies = updatedUser.vocabularies.map((vocabulary) => vocabulary.id);

        prevGrammars = prevGrammars.filter((id) => id !== grammarId);

        updatedUser.kanjis = prevKanjis;
        updatedUser.vocabularies = prevVocabularies;
        updatedUser.grammars = prevGrammars;

        try {
            const response = await axiosClient.post(
                `/api/users/${updatedUser.id}`,
                updatedUser,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const updatedUserGrammars = response.data.data.grammars;

            // Update the inNotebook state after the request is successful
            setInNotebook(updatedUserGrammars.some(grammarUser => grammarUser.topicTitle === objCurrentGrammar.topicTitle));

            setCurrentUser(response.data.data);
            setCurrentUserGrammars(updatedUserGrammars);

            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            // Handle the error appropriately
            throw error;
        }
    };

    return (
        <>
            <Link to="/grammar" className="link--goBack">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
                    <path
                        fill="#262626"
                        fillRule="evenodd"
                        stroke="#262626"
                        strokeLinejoin="round"
                        strokeWidth="4"
                        d="M44 40.836c-4.893-5.973-9.238-9.362-13.036-10.168-3.797-.805-7.412-.927-10.846-.365V41L4 23.545 20.118 7v10.167c6.349.05 11.746 2.328 16.192 6.833 4.445 4.505 7.009 10.117 7.69 16.836z"
                        clipRule="evenodd"
                    />
                </svg>
                <p>Back</p>
            </Link>
            <div className="card--simple grammar">
                <h1 className="title--grammar">{objCurrentGrammar.topicTitle}</h1>
                <p>{objCurrentGrammar.description}</p>

                <div>
                    {arrGrammarUse.map((item, index) => (
                        <div className="container--grammarUse" key={index}>
                            <h2 className="title--grammarUse">{item.title}</h2>
                            <p>{item.description}</p>
                            <p>
                                <strong>Example: </strong>
                                {item.example}
                            </p>
                        </div>
                    ))}
                </div>

                <div
                    className={inNotebook ? "notebook--remove" : "notebook--add"}
                    onClick={inNotebook ? handleClickNotebookRemove : handleClickNotebookAdd}
                >
                    <svg className="pen" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 21 21">
                        <path
                            fill="#262626b7"
                            stroke="#262626"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 4a2.121 2.121 0 0 1 0 3l-9.5 9.5-4 1 1-3.944 9.504-9.552a2.116 2.116 0 0 1 2.864-.125zm-1.5 2.5l1 1"
                        />
                    </svg>
                </div>
            </div>
        </>
    );
}
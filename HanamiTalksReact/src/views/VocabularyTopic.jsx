import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useHanamiTalks from "../hooks/useHanamiTalks";
import useSWR from "swr";
import axiosClient from "../config/axios";
import "./../assets/css/vocabulary.css";
import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";

export default function VocabularyTopic() {
    const { currentVocabularyTopic } = useHanamiTalks();

    const { user } = useAuth({ middleware: "auth" });
    const [currentUser, setCurrentUser] = useState(user.data);

    const [currentUserVocabularies, setCurrentUserVocabularies] = useState(currentUser.vocabularies);

    // State for controlling card rotation
    const [vocabularyIsRotated, setVocabularyIsRotated] = useState([]);

    const [notebookVocabularies, setNotebookVocabularies] = useState([]);

    // Using useSWR to fetch data
    const token = localStorage.getItem('AUTH_TOKEN'); // Retrieve the token from local storage

    const fetcher = async () => {
        return axiosClient("/api/vocabularies/topic/" + currentVocabularyTopic, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.data.data);
    };
    
    const { data, error, isLoading } = useSWR(
        "/api/vocabularies/topic/" + currentVocabularyTopic,
        fetcher
    );

    // Log data and error for debugging
    //console.log(data);
    //console.log("THIS IS THE SWR ERROR: " + error);

    // Update state when data changes
    useEffect(() => {
        if (data) {
            setVocabularyIsRotated(
                data.map((item, index) => ({
                    index,
                    rotated: false,
                }))
            );

            setNotebookVocabularies(
                data.map((vocabulary, index) => ({
                    index,
                    inNotebook: currentUserVocabularies.some(vocabularyUser => vocabularyUser.word == vocabulary.word),
                }))
            );
        }
    }, [data, currentUserVocabularies]);

    // Handle loading, error, and data states
    if (isLoading) return <LoadingScreen/>;
    if (error) return <div><h1>Error: {error.message}</h1></div>;

    // Assuming data is an array of topic titles with levels
    const arrCurrentVocabulary = data;

    console.log(arrCurrentVocabulary);

    const toggleRotation = (index) => {
        setVocabularyIsRotated((prevState) =>
            prevState.map((item, thisIndex) =>
                thisIndex === index ? { ...item, rotated: !item.rotated } : item
            )
        );
    };

    //ADD A VOCABULARY TO THE USER'S NOTEBOOK
    const handleClickNotebookAdd = (index, e) => {
        e.stopPropagation();

        const thisVocabulary = { ...data[index] };
        const vocabularyId = thisVocabulary.id;

        updateUserAddVocabulary(vocabularyId);
    };

    const updateUserAddVocabulary = async (vocabularyId) => {
        const updatedUser = { ...currentUser };

        let prevKanjis = [];
        let prevGrammars = [];
        let prevVocabularies = [];

        updatedUser.kanjis.map((kanji) => prevKanjis.push(kanji.id));
        updatedUser.vocabularies.map((vocabulary) => prevVocabularies.push(vocabulary.id));
        updatedUser.grammars.map((grammar) => prevGrammars.push(grammar.id));

        prevVocabularies.push(vocabularyId);

        updatedUser.kanjis = prevKanjis;
        updatedUser.vocabularies = prevVocabularies;
        updatedUser.grammars = prevGrammars;

        const token = localStorage.getItem("AUTH_TOKEN");

        try {
            const response = await axiosClient.post(
                "/api/users/" + updatedUser.id,
                updatedUser,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const updatedUserVocabularies = response.data.data.vocabularies;

            // Update the inNotebook state after the request is successful
            setNotebookVocabularies(
                arrCurrentVocabulary.map((vocabulary, index) => ({
                    index,
                    inNotebook: updatedUserVocabularies.some(vocabularyUser => vocabularyUser.word == vocabulary.word ),
                }))
            );

            setCurrentUser(response.data.data);
            setCurrentUserVocabularies(updatedUserVocabularies);

            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
            // Handle the error appropriately
            throw error;
        }
    };

    //REMOVE A KANJI FROM THE USER'S NOTEBOOK
    const handleClickNotebookRemove = (index, e) => {
        e.stopPropagation();

        const thisVocabulary = { ...data[index] };
        const vocabularyId = thisVocabulary.id;

        updateUserRemoveVocabulary(vocabularyId);
    };

    const updateUserRemoveVocabulary = async (vocabularyId) => {
        const updatedUser = { ...currentUser };

        let prevKanjis = [];
        let prevGrammars = [];
        let prevVocabularies = [];

        updatedUser.kanjis.map((kanji) => prevKanjis.push(kanji.id));
        updatedUser.vocabularies.map((vocabulary) => prevVocabularies.push(vocabulary.id));
        updatedUser.grammars.map((grammar) => prevGrammars.push(grammar.id));

        prevVocabularies = prevVocabularies.filter(id => id != vocabularyId);

        updatedUser.kanjis = prevKanjis;
        updatedUser.vocabularies = prevVocabularies;
        updatedUser.grammars = prevGrammars;

        const token = localStorage.getItem("AUTH_TOKEN");

        try {
            const response = await axiosClient.post(
                "/api/users/" + updatedUser.id,
                updatedUser,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const updatedUserVocabularies = response.data.data.vocabularies;

            // Update the inNotebook state after the request is successful
            setNotebookVocabularies(
                arrCurrentVocabulary.map((vocabulary, index) => ({
                    index,
                    inNotebook: updatedUserVocabularies.some(vocabularyUser => vocabularyUser.word == vocabulary.word),
                }))
            );

            setCurrentUser(response.data.data);
            setCurrentUserVocabularies(updatedUserVocabularies);

            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error(error);
            // Handle the error appropriately
            throw error;
        }
    };

    const printVocabulary = (item, index) => {
        const isRotated = vocabularyIsRotated[index]?.rotated || false;
        const inNotebook = notebookVocabularies.find(
            (vocabularies) => vocabularies.index === index
        )?.inNotebook;
        return (
            <div
                key={index}
                className={
                    isRotated
                        ? "card--rotating hiragana rotated"
                        : "card--rotating hiragana"
                }
                onClick={() => toggleRotation(index)}
            >
                <div className="card--full">
                    <div className="card--folded card--full__front">
                        <h1 className="word--front japanese">{item.word}</h1>
                        <p className="translation--front">{item.translation}</p>

                        <div
                            className={
                                inNotebook
                                    ? "notebook--remove"
                                    : "notebook--add"
                            }
                            onClick={
                                inNotebook
                                ?(e) =>handleClickNotebookRemove(index, e)
                                :(e) =>handleClickNotebookAdd(index, e)
                            }
                        >
                            <svg
                                className="pen"
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 21 21"
                            >
                                <path
                                    fill="#262626b7"
                                    stroke="#262626"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M17 4a2.121 2.121 0 0 1 0 3l-9.5 9.5l-4 1l1-3.944l9.504-9.552a2.116 2.116 0 0 1 2.864-.125zm-1.5 2.5l1 1"
                                />
                            </svg>
                        </div>

                        <div className="cornerSvg">
                            <svg
                                data-slot="icon"
                                aria-hidden="true"
                                fill="none"
                                stroke-width="1.5"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                            </svg>
                        </div>
                    </div>

                    <div className="card--folded card--full__back">
                        <table className="table--vocabulary">
                            <tr>
                                <td colSpan={2}>
                                    <h1 className="word--back japanese">{item.word}</h1>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Kana: <label className="japanese">{item.kana}</label></p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Romaji: {item.romaji}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Translation: {item.translation}</p>
                                </td>
                            </tr>
                        </table>

                        <div
                            className={
                                !isRotated
                                    ? "cornerSvg dispNone"
                                    : "cornerSvg dispNotNone"
                            }
                        >
                            <svg
                                data-slot="icon"
                                aria-hidden="true"
                                fill="none"
                                stroke-width="1.5"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <>
            <div>
                <Link to={"/vocabulary"} className="link--goBack">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 48 48"
                    >
                        <path
                            fill="#262626"
                            fill-rule="evenodd"
                            stroke="#262626"
                            stroke-linejoin="round"
                            stroke-width="4"
                            d="M44 40.836c-4.893-5.973-9.238-9.362-13.036-10.168c-3.797-.805-7.412-.927-10.846-.365V41L4 23.545L20.118 7v10.167c6.349.05 11.746 2.328 16.192 6.833c4.445 4.505 7.009 10.117 7.69 16.836Z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    <p>Back</p>{" "}
                </Link>
                <h1 className="title--kanjiTopic">{currentVocabularyTopic}</h1>
            </div>

            <div className="container--grid">
                {arrCurrentVocabulary.map((item, index) => {
                    return printVocabulary(item, index);
                })}
            </div>
        </>
    );
}

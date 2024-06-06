import React, { createRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axiosClient from "../config/axios";
import "./../assets/css/itemForm.css";
import { forwardRef } from "react";

const VocabularyForm = forwardRef(({ vocabularyTopicTitles, isEdit, vocabularyToEdit, handleBackToInsert, handleMutateVocabularyTopicTitles, handleMutateVocabularies }, ref) => {
    const [isOther, setIsOther] = useState(false);
    const [responseMessages, setResponseMessages] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [selectedTopicTitle, setSelectedTopicTitle] = useState("");

    const wordRef = createRef();
    const kanaRef = createRef();
    const romajiRef = createRef();
    const translationRef = createRef();
    const topicTitleSelectRef = createRef();
    const topicTitleInputRef = createRef();

    useEffect(() => {
        if (isEdit && vocabularyToEdit) {
            wordRef.current.value = vocabularyToEdit.word || "";
            kanaRef.current.value = vocabularyToEdit.kana || "";
            romajiRef.current.value = vocabularyToEdit.romaji || "";
            translationRef.current.value = vocabularyToEdit.translation || "";
            setSelectedTopicTitle(vocabularyToEdit.topicTitle || "");
            setIsOther(vocabularyToEdit.topicTitle === "other");
        } else {
            wordRef.current.value = "";
            kanaRef.current.value = "";
            romajiRef.current.value = "";
            translationRef.current.value = "";
            setSelectedTopicTitle("");
            setIsOther(false);
        }
    }, [isEdit, vocabularyToEdit]);

    const checkIfOther = () => {
        const value = topicTitleSelectRef.current.value;
        setSelectedTopicTitle(value);
        setIsOther(value === "other");
    };

    const addNewVocabulary = async () => {
        let topicTitle = "";
        let level = 1;

        if (isOther) {
            topicTitle = topicTitleInputRef.current.value;
            level = vocabularyTopicTitles.length + 1;
        } else {
            topicTitle = topicTitleSelectRef.current.value;
            const vocabularyTopicItem = vocabularyTopicTitles.find(
                (item) => item.topicTitle === topicTitle
            );
            level = vocabularyTopicItem ? vocabularyTopicItem.level : 1;
        }

        const newVocabularyData = {
            word: wordRef.current.value,
            kana: kanaRef.current.value,
            romaji: romajiRef.current.value,
            translation: translationRef.current.value,
            topicTitle: topicTitle,
            level: level,
        };

        console.log(newVocabularyData);

        try {
            const token = localStorage.getItem("AUTH_TOKEN");

            const response = await axiosClient.post(
                "api/vocabularies",
                newVocabularyData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setIsSuccess(true);
            setResponseMessages(["Vocabulary item created successfully"]);
            handleMutateVocabularyTopicTitles();
            handleMutateVocabularies();
        } catch (error) {
            console.log(error);
            setIsSuccess(false);
            setResponseMessages(Object.values(error.response.data.errors));
        }
    };

    const editExistingVocabulary = async () => {
        if (!vocabularyToEdit) return;

        let topicTitle = "";
        let level = 1;

        if (isOther) {
            topicTitle = topicTitleInputRef.current.value;
            level = vocabularyTopicTitles.length + 1;
        } else {
            topicTitle = topicTitleSelectRef.current.value;
            const vocabularyTopicItem = vocabularyTopicTitles.find(
                (item) => item.topicTitle === topicTitle
            );
            level = vocabularyTopicItem ? vocabularyTopicItem.level : 1;
        }

        const editVocabularyData = {
            id: vocabularyToEdit.id,
            word: wordRef.current.value,
            kana: kanaRef.current.value,
            romaji: romajiRef.current.value,
            translation: translationRef.current.value,
            topicTitle: topicTitle,
            level: level,
        };

        try {
            const token = localStorage.getItem("AUTH_TOKEN");

            const response = await axiosClient.put(
                `api/vocabularies/${editVocabularyData.id}`,
                editVocabularyData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setIsSuccess(true);
            setResponseMessages(["Vocabulary item edited successfully"]);
            handleBackToInsert();
            handleMutateVocabularyTopicTitles();
            handleMutateVocabularies();
        } catch (error) {
            console.log(error);
            setIsSuccess(false);
            setResponseMessages(Object.values(error.response.data.errors));
        }
    };

    return (
        <>
            <div ref={ref} className="card--item-form">
                <h2>{isEdit ? `Edit vocabulary | Id: ${vocabularyToEdit?.id}` : "Insert vocabulary"}</h2>
                <div className="item-form__div--input">
                    <label htmlFor="word">Word:</label>
                    <input type="text" name="word" ref={wordRef} />
                </div>
                <div className="item-form__div--input">
                    <label htmlFor="kana">Kana:</label>
                    <input type="text" name="kana" ref={kanaRef} />
                </div>
                <div className="item-form__div--input">
                    <label htmlFor="romaji">Romaji:</label>
                    <input type="text" name="romaji" ref={romajiRef} />
                </div>
                <div className="item-form__div--input">
                    <label htmlFor="translation">Translation:</label>
                    <input type="text" name="translation" ref={translationRef} />
                </div>

                <div className="item-form__div--topicTitles">
                    <label htmlFor="">Topic title:</label>
                    <select
                        name=""
                        id=""
                        onChange={checkIfOther}
                        ref={topicTitleSelectRef}
                        value={selectedTopicTitle}
                    >
                        {vocabularyTopicTitles.map((title, index) => (
                            <option value={title.topicTitle} key={index}>
                                {title.topicTitle}
                            </option>
                        ))}
                        <option value="other">Other</option>
                    </select>
                    {isOther && (
                        <div className="item-form__div--newTopic">
                            <label>New topic:</label>
                            <input type="text" ref={topicTitleInputRef} />
                        </div>
                    )}
                </div>

                <input className="admin-form__input--submit" type="submit" value={isEdit ? "EDIT" : "INSERT"} onClick={isEdit ? editExistingVocabulary : addNewVocabulary} />
                {isEdit && (
                    <input
                        type="submit"
                        className="admin-form__input--submit"
                        value="GO BACK TO INSERT"
                        onClick={handleBackToInsert}
                    />
                )}
            </div>

            {responseMessages && responseMessages.length > 0 &&
                ReactDOM.createPortal(
                    <div className="modal-background">
                        <div className="modal--errors">
                            {responseMessages.map((message, index) => (
                                <p
                                    className={
                                        isSuccess
                                            ? "modal--errors__success"
                                            : "modal--errors__errors"
                                    }
                                    key={index}
                                >
                                    {message}
                                </p>
                            ))}
                            <input
                                type="submit"
                                value="Got it!"
                                onClick={() => setResponseMessages([])}
                            />
                        </div>
                    </div>,
                    document.body
                )
            }
        </>
    );
});

export default VocabularyForm;
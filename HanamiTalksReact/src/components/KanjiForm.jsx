import React, { createRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axiosClient from "../config/axios";
import "./../assets/css/itemForm.css";
import { forwardRef } from "react";

const KanjiForm = forwardRef(({ kanjiTopicTitles, isEdit, kanjiToEdit, handleBackToInsert, handleMutateKanjiTopicTitles, handleMutateKanjis }, ref) => {
    const [isOther, setIsOther] = useState(false);
    const [responseMessages, setResponseMessages] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [selectedTopicTitle, setSelectedTopicTitle] = useState("");

    const symbolRef = createRef();
    const kunyomiRef = createRef();
    const onyomiRef = createRef();
    const translationRef = createRef();
    const topicTitleSelectRef = createRef();
    const topicTitleInputRef = createRef();

    useEffect(() => {
        if (isEdit && kanjiToEdit) {
            symbolRef.current.value = kanjiToEdit.symbol || "";
            kunyomiRef.current.value = kanjiToEdit.kunyomi || "";
            onyomiRef.current.value = kanjiToEdit.onyomi || "";
            translationRef.current.value = kanjiToEdit.translation || "";
            setSelectedTopicTitle(kanjiToEdit.topicTitle || "");
            setIsOther(kanjiToEdit.topicTitle === "other");
        } else {
            symbolRef.current.value = "";
            kunyomiRef.current.value = "";
            onyomiRef.current.value = "";
            translationRef.current.value = "";
            setSelectedTopicTitle("");
            setIsOther(false);
        }
    }, [isEdit, kanjiToEdit]);

    const checkIfOther = () => {
        const value = topicTitleSelectRef.current.value;
        setSelectedTopicTitle(value);
        setIsOther(value === "other");
    };

    const addNewKanji = async () => {
        let topicTitle = "";
        let level = 1;

        if (isOther) {
            topicTitle = topicTitleInputRef.current.value;
            level = kanjiTopicTitles.length + 1;
        } else {
            topicTitle = topicTitleSelectRef.current.value;
            const kanjiTopicItem = kanjiTopicTitles.find(
                (item) => item.topicTitle === topicTitle
            );
            level = kanjiTopicItem ? kanjiTopicItem.level : 1;
        }

        const newKanjiData = {
            symbol: symbolRef.current.value,
            kunyomi: kunyomiRef.current.value,
            onyomi: onyomiRef.current.value,
            translation: translationRef.current.value,
            topicTitle: topicTitle,
            level: level,
        };

        console.log(newKanjiData);

        try {
            const token = localStorage.getItem("AUTH_TOKEN");

            const response = await axiosClient.post(
                "api/kanjis",
                newKanjiData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setIsSuccess(true);
            setResponseMessages(["Kanji created successfully"]);
            handleMutateKanjiTopicTitles();
            handleMutateKanjis();
        } catch (error) {
            console.log(error);
            setIsSuccess(false);
            setResponseMessages(Object.values(error.response.data.errors));
        }
    };

    const editExistingKanji = async () => {
        if (!kanjiToEdit) return;

        let topicTitle = "";
        let level = 1;

        if (isOther) {
            topicTitle = topicTitleInputRef.current.value;
            level = kanjiTopicTitles.length + 1;
        } else {
            topicTitle = topicTitleSelectRef.current.value;
            const kanjiTopicItem = kanjiTopicTitles.find(
                (item) => item.topicTitle === topicTitle
            );
            level = kanjiTopicItem ? kanjiTopicItem.level : 1;
        }

        const editKanjiData = {
            id: kanjiToEdit.id,
            symbol: symbolRef.current.value,
            kunyomi: kunyomiRef.current.value,
            onyomi: onyomiRef.current.value,
            translation: translationRef.current.value,
            topicTitle: topicTitle,
            level: level,
        };

        try {
            const token = localStorage.getItem("AUTH_TOKEN");

            const response = await axiosClient.put(
                `api/kanjis/${editKanjiData.id}`,
                editKanjiData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setIsSuccess(true);
            setResponseMessages(["Kanji edited successfully"]);
            handleBackToInsert();
            handleMutateKanjiTopicTitles();
            handleMutateKanjis();
        } catch (error) {
            console.log(error);
            setIsSuccess(false);
            setResponseMessages(Object.values(error.response.data.errors));
        }
    };

    return (
        <>
            <div ref={ref} className="card--item-form">
                <h2>{isEdit ? `Edit kanji | Id: ${kanjiToEdit?.id}` : "Insert kanji"}</h2>
                <div className="item-form__div--input">
                    <label htmlFor="symbol">Symbol:</label>
                    <input type="text" name="symbol" ref={symbolRef} />
                </div>
                <div className="item-form__div--input">
                    <label htmlFor="kunyomi">Kunyomi:</label>
                    <input type="text" name="kunyomi" ref={kunyomiRef} />
                </div>
                <div className="item-form__div--input">
                    <label htmlFor="onyomi">Onyomi:</label>
                    <input type="text" name="onyomi" ref={onyomiRef} />
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
                        {kanjiTopicTitles.map((title, index) => (
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

                <input className="admin-form__input--submit" type="submit" value={isEdit ? "EDIT" : "INSERT"} onClick={isEdit ? editExistingKanji : addNewKanji} />
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

export default KanjiForm;
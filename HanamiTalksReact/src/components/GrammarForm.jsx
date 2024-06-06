import React, { createRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axiosClient from "../config/axios";
import "./../assets/css/itemForm.css";
import { forwardRef } from "react";

const GrammarForm = forwardRef(
    (
        { isEdit, grammarToEdit, handleBackToInsert, handleMutateGrammars },
        ref
    ) => {
        const [responseMessages, setResponseMessages] = useState([]);
        const [isSuccess, setIsSuccess] = useState(false);

        const topicTitleRef = createRef();
        const descriptionRef = createRef();

        useEffect(() => {
            if (isEdit && grammarToEdit) {
                topicTitleRef.current.value = grammarToEdit.topicTitle || "";
                descriptionRef.current.value = grammarToEdit.description || "";
            } else {
                topicTitleRef.current.value = "";
                descriptionRef.current.value = "";
            }
        }, [isEdit, grammarToEdit]);

        const addNewGrammar = async () => {
            const level = grammars.length + 1;

            const newGrammarData = {
                topicTitle: topicTitleRef.current.value,
                description: descriptionRef.current.value,
                level: level,
            };

            console.log(newGrammarData);

            try {
                const token = localStorage.getItem("AUTH_TOKEN");

                const response = await axiosClient.post(
                    "api/grammars",
                    newGrammarData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setIsSuccess(true);
                setResponseMessages(["Grammar created successfully"]);
                handleMutateGrammars();
            } catch (error) {
                console.log(error);
                setIsSuccess(false);
                setResponseMessages(Object.values(error.response.data.errors));
            }
        };

        const editExistingGrammar = async () => {
            if (!grammarToEdit) return;
            const level = grammarToEdit.level;

            const editGrammarData = {
                id: grammarToEdit.id,
                topicTitle: topicTitleRef.current.value,
                description: descriptionRef.current.value,
                level: level,
            };

            try {
                const token = localStorage.getItem("AUTH_TOKEN");

                const response = await axiosClient.put(
                    `api/grammars/${editGrammarData.id}`,
                    editGrammarData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setIsSuccess(true);
                setResponseMessages(["Grammar edited successfully"]);
                handleBackToInsert();
                handleMutateGrammars();
            } catch (error) {
                console.log(error);
                setIsSuccess(false);
                setResponseMessages(Object.values(error.response.data.errors));
            }
        };

        return (
            <>
                <div ref={ref} className="card--item-form">
                    <h2>
                        {isEdit
                            ? `Edit grammar | Id: ${grammarToEdit?.id}`
                            : "Insert grammar"}
                    </h2>
                    <div className="item-form__div--input">
                        <label htmlFor="topicTitle">Title:</label>
                        <input type="text" name="topicTitle" ref={topicTitleRef} />
                    </div>
                    <div className="item-form__div--textarea">
                        <label htmlFor="description">Description:</label>
                        <textarea cols={30} rows={10} name="description" ref={descriptionRef} />
                    </div>

                    <input
                        className="admin-form__input--submit"
                        type="submit"
                        value={isEdit ? "EDIT" : "INSERT"}
                        onClick={isEdit ? editExistingGrammar : addNewGrammar}
                    />
                    {isEdit && (
                        <input
                            type="submit"
                            className="admin-form__input--submit"
                            value="GO BACK TO INSERT"
                            onClick={handleBackToInsert}
                        />
                    )}
                </div>

                {responseMessages &&
                    responseMessages.length > 0 &&
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
                    )}
            </>
        );
    }
);

export default GrammarForm;

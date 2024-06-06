import React, { createRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axiosClient from "../config/axios";
import "./../assets/css/itemForm.css";
import { forwardRef } from "react";

const GrammarForm = forwardRef(
    (
        {
            grammarList,
            isEdit,
            grammarToEdit,
            handleBackToInsert,
            handleMutateGrammars,
        },
        ref
    ) => {
        const [responseMessages, setResponseMessages] = useState([]);
        const [isSuccess, setIsSuccess] = useState(false);

        const topicTitleRef = createRef();
        const descriptionRef = createRef();

        const [usesInputsValues, setUsesInputsValues] = useState([]);

        useEffect(() => {
            if (isEdit && grammarToEdit) {
                topicTitleRef.current.value = grammarToEdit.topicTitle || "";
                descriptionRef.current.value = grammarToEdit.description || "";
                if (
                    grammarToEdit.grammar_uses &&
                    grammarToEdit.grammar_uses.length > 0
                ) {
                    setUsesInputsValues(
                        grammarToEdit.grammar_uses.map((use) => ({
                            id: use.id,
                            title: use.title,
                            description: use.description,
                            example: use.example,
                        }))
                    );
                } else {
                    setUsesInputsValues([]);
                }
            } else {
                topicTitleRef.current.value = "";
                descriptionRef.current.value = "";
                setUsesInputsValues([]);
            }
        }, [isEdit, grammarToEdit]);

        //Put a grammar item into the endpoint
        const addNewGrammar = async () => {
            const level = grammarList.length + 1;

            const newGrammarData = {
                topicTitle: topicTitleRef.current.value,
                description: descriptionRef.current.value,
                level: level,
                uses: usesInputsValues,
            };

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

                const newGrammarId = response.data.data.id;

                if (usesInputsValues.length > 0) {
                    const newUses = [];
                    {
                        usesInputsValues.map((use, index) =>
                            newUses.push({
                                title: use.title,
                                description: use.description,
                                example: use.example,
                                grammar_id: newGrammarId,
                            })
                        );
                    }

                    for (let i = 0; i < newUses.length; i++) {
                        await axiosClient.post("api/grammarUses", newUses[i], {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                    }
                }

                setIsSuccess(true);
                setResponseMessages(["Grammar created successfully"]);
                handleMutateGrammars();
            } catch (error) {
                console.log(error);
                setIsSuccess(false);
                setResponseMessages(Object.values(error.response.data.errors));
            }
        };

        //Edit a grammar item that existed before
        const editExistingGrammar = async () => {
            if (!grammarToEdit) return;
            const level = grammarToEdit.level;

            const editGrammarData = {
                id: grammarToEdit.id,
                topicTitle: topicTitleRef.current.value,
                description: descriptionRef.current.value,
                level: level,
                uses: usesInputsValues,
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

                const existingGrammarId = response.data.data.id;

                if (usesInputsValues.length > 0) {
                    const newUses = [];
                    const existingUses = [];

                    usesInputsValues.forEach((use) => {
                        if (use.id === "notExisting") {
                            newUses.push({
                                title: use.title,
                                description: use.description,
                                example: use.example,
                                grammar_id: existingGrammarId,
                            });
                        } else {
                            existingUses.push({
                                id: use.id,
                                title: use.title,
                                description: use.description,
                                example: use.example,
                                grammar_id: existingGrammarId,
                            });
                        }
                    });

                    console.log(newUses);
                    console.log(existingUses);
                    // Add new uses
                    for (let i = 0; i < newUses.length; i++) {
                        await axiosClient.post("api/grammarUses", newUses[i], {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                    }

                    // Edit existing uses
                    for (let i = 0; i < existingUses.length; i++) {
                        await axiosClient.put(
                            `api/grammarUses/${existingUses[i].id}`,
                            existingUses[i],
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );
                    }
                }

                const grammarUseIds = usesInputsValues
                    .filter((use) => use.id !== "notExisting")
                    .map((use) => use.id);

                const grammarUseIdsToDelete = grammarToEdit.grammar_uses
                    .map((use) => use.id)
                    .filter((id) => !grammarUseIds.includes(id));

                for (let i = 0; i < grammarUseIdsToDelete.length; i++) {
                    await axiosClient.delete(
                        `api/grammarUses/${grammarUseIdsToDelete[i]}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                }

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

        const handleMoreUses = () => {
            setUsesInputsValues((prevUsesInputsValues) => [
                ...prevUsesInputsValues,
                {
                    id: "notExisting",
                    title: "",
                    description: "",
                    example: "",
                },
            ]);
        };

        const handleUseChange = (e, index, field) => {
            setUsesInputsValues((prevUsesInputsValues) =>
                prevUsesInputsValues.map((use, i) =>
                    i === index ? { ...use, [field]: e.target.value } : use
                )
            );
            console.log(usesInputsValues);
        };

        const handleLessUses = () => {
            setUsesInputsValues((prevUsesInputsValues) =>
                prevUsesInputsValues.slice(0, -1)
            );
        };

        return (
            <>
                <div ref={ref} className="card--item-form card--grammar-form">
                    <h2>
                        {isEdit
                            ? `Edit grammar | Id: ${grammarToEdit?.id}`
                            : "Insert grammar"}
                    </h2>
                    <div className="item-form__div--input">
                        <label htmlFor="topicTitle">Title:</label>
                        <input
                            type="text"
                            name="topicTitle"
                            ref={topicTitleRef}
                        />
                    </div>
                    <div className="item-form__div--textarea">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            cols={30}
                            rows={10}
                            name="description"
                            ref={descriptionRef}
                        />
                    </div>

                    <div className="item-form__div--uses">
                        {usesInputsValues.length > 0 &&
                            usesInputsValues.map((use, index) => (
                                <div key={index} className="div--use">
                                    <h3>Grammar use {index + 1}</h3>
                                    <div className="item-form__div--input">
                                        <label htmlFor="title">Title:</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={use.title}
                                            onChange={(e) =>
                                                handleUseChange(
                                                    e,
                                                    index,
                                                    "title"
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="item-form__div--textarea">
                                        <label htmlFor="description">
                                            Description:
                                        </label>
                                        <textarea
                                            cols={30}
                                            rows={6}
                                            name="description"
                                            value={use.description}
                                            onChange={(e) =>
                                                handleUseChange(
                                                    e,
                                                    index,
                                                    "description"
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="item-form__div--textarea">
                                        <label htmlFor="example">
                                            Example:
                                        </label>
                                        <textarea
                                            cols={30}
                                            rows={6}
                                            name="example"
                                            value={use.example}
                                            onChange={(e) =>
                                                handleUseChange(
                                                    e,
                                                    index,
                                                    "example"
                                                )
                                            }
                                        />
                                    </div>
                                    <hr />
                                </div>
                            ))}

                        <div className="div--uses__buttons">
                            <input
                                type="submit"
                                value="+"
                                onClick={handleMoreUses}
                            />
                            {usesInputsValues.length > 0 && (
                                <input
                                    type="submit"
                                    value="-"
                                    onClick={handleLessUses}
                                />
                            )}
                        </div>
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

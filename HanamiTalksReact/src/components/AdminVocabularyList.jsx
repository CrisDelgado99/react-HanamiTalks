import React, { useState } from "react";
import axiosClient from "../config/axios";
import ReactDOM from "react-dom";

export default function AdminVocabularyList ({ handleEditClick, handleMutateVocabularies, vocabularyList }) {
    const [deleteMessage, setDeleteMessage] = useState("");
    const [vocabularyToDelete, setVocabularyToDelete] = useState(null);

    const handleDeleteClick = (vocabulary) => {
        setDeleteMessage(`Are you sure you want to delete vocabulary with id ${vocabulary.id}?`);
        setVocabularyToDelete(vocabulary);
    };

    const deleteVocabulary = async () => {
        if (vocabularyToDelete) {
            const token = localStorage.getItem("AUTH_TOKEN");
            try {
                await axiosClient.delete(`/api/vocabularies/${vocabularyToDelete.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDeleteMessage("");
                setVocabularyToDelete(null);
                handleMutateVocabularies();
            } catch (error) {
                console.error("Failed to delete vocabulary:", error);
                setDeleteMessage("Failed to delete vocabulary. Please try again.");
            }
        }
    };

    return (
        <>
            <div className="list-modify--vocabulary list-modify">
                {vocabularyList.map((vocabulary) => (
                    <div className="list-modify__element" key={vocabulary.id}>
                        <h2>
                            <label className="japanese">{vocabulary.word}</label> -{" "}
                            {vocabulary.translation}
                        </h2>
                        <div className="modify--buttons">
                            <button
                                type="button"
                                className="button--delete"
                                onClick={() => handleDeleteClick(vocabulary)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="#262626"
                                        d="M20 6h-4V5a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v1H4a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8h1a1 1 0 0 0 0-2M10 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h-4Zm7 14a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8h10Z"
                                    />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className="button--edit"
                                onClick={() => handleEditClick(vocabulary)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="#262626"
                                        d="M5 18h4.24a1 1 0 0 0 .71-.29l6.92-6.93L19.71 8a1 1 0 0 0 0-1.42l-4.24-4.29a1 1 0 0 0-1.42 0l-2.82 2.83l-6.94 6.93a1 1 0 0 0-.29.71V17a1 1 0 0 0 1 1m9.76-13.59l2.83 2.83l-1.42 1.42l-2.83-2.83ZM6 13.17l5.93-5.93l2.83 2.83L8.83 16H6ZM21 20H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {deleteMessage && 
                ReactDOM.createPortal(
                    <div className="modal-background">
                        <div className="modal--delete">
                            <p>{deleteMessage}</p>
                            {vocabularyToDelete && (
                                <div>
                                    <p>Vocabulary data:</p>
                                    <ul>
                                        <li>Word: <label className="japanese">{vocabularyToDelete.word}</label></li>
                                        <li>Kana: <label className="japanese">{vocabularyToDelete.kana}</label></li>
                                        <li>Romaji: <label className="japanese">{vocabularyToDelete.romaji}</label></li>
                                        <li>Translation: <label className="japanese">{vocabularyToDelete.translation}</label></li>
                                    </ul>
                                </div>
                            )}
                            <div className="modal--delete__buttons">
                                <input
                                    type="button"
                                    value="Delete"
                                    onClick={deleteVocabulary}
                                />
                                <input
                                    type="button"
                                    value="Cancel"
                                    onClick={() => {
                                        setDeleteMessage("");
                                        setVocabularyToDelete(null);
                                    }}
                                />
                            </div>
                        </div>
                    </div>,
                    document.body
                )
            }
        </>
    );
}
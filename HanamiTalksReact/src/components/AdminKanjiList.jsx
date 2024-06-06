import React, { useState } from "react";
import axiosClient from "../config/axios";
import useSWR from "swr";
import ReactDOM from "react-dom";

export default function AdminKanjiList ({ handleEditClick, handleMutateKanjis, kanjiList }) {
    const [deleteMessage, setDeleteMessage] = useState("");
    const [kanjiToDelete, setKanjiToDelete] = useState(null);

    const handleDeleteClick = (kanji) => {
        setDeleteMessage(`Are you sure you want to delete kanji with id ${kanji.id}?`);
        setKanjiToDelete(kanji);
    };

    const deleteKanji = async () => {
        if (kanjiToDelete) {
            const token = localStorage.getItem("AUTH_TOKEN");
            try {
                await axiosClient.delete(`/api/kanjis/${kanjiToDelete.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDeleteMessage("");
                setKanjiToDelete(null);
                handleMutateKanjis();
            } catch (error) {
                console.error("Failed to delete kanji:", error);
                setDeleteMessage("Failed to delete kanji. Please try again.");
            }
        }
    };

    return (
        <>
            <div className="list-modify--kanji list-modify">
                {kanjiList.map((kanji) => (
                    <div className="list-modify__element" key={kanji.id}>
                        <h2>
                            <label className="japanese">{kanji.symbol}</label> -{" "}
                            {kanji.translation}
                        </h2>
                        <div className="modify--buttons">
                            <button
                                type="button"
                                className="button--delete"
                                onClick={() => handleDeleteClick(kanji)}
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
                                onClick={() => handleEditClick(kanji)}
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
                            {kanjiToDelete && (
                                <div>
                                    <p>Kanji data:</p>
                                    <ul>
                                        <li>Symbol: <label className="japanese">{kanjiToDelete.symbol}</label></li>
                                        <li>Kunyomi: <label className="japanese">{kanjiToDelete.kunyomi}</label></li>
                                        <li>Onyomi: <label className="japanese">{kanjiToDelete.onyomi}</label></li>
                                        <li>Translation: <label className="japanese">{kanjiToDelete.translation}</label></li>
                                    </ul>
                                </div>
                            )}
                            <div className="modal--delete__buttons">
                                <input
                                    type="button"
                                    value="Delete"
                                    onClick={deleteKanji}
                                />
                                <input
                                    type="button"
                                    value="Cancel"
                                    onClick={() => {
                                        setDeleteMessage("");
                                        setKanjiToDelete(null);
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
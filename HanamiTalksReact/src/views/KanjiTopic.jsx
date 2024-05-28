import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useHanamiTalks from "../hooks/useHanamiTalks";
import "./../assets/css/kanji.css";
import useSWR from "swr";
import axiosClient from "../config/axios";



export default function KanjiTopic() {
    const { currentKanjiTopic } = useHanamiTalks();


// State for controlling card rotation
    const [kanjiIsRotated, setKanjiIsRotated] = useState([]);

    // Using useSWR to fetch data
    const { data, error, isLoading } = useSWR(
        "/api/kanjis/topic/" + currentKanjiTopic, 
        () => axiosClient("/api/kanjis/topic/" + currentKanjiTopic).then((response) => response.data.data)
    );

    // Log data and error for debugging
    console.log(data);
    console.log("THIS IS THE SWR ERROR: " + error);

    // Update state when data changes
    useEffect(() => {
        if (data) {
            setKanjiIsRotated(
                data.map((item, index) => ({
                    index,
                    rotated: false,
                }))
            );
        }
    }, [data]);

    // Handle loading, error, and data states
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // Assuming data is an array of topic titles with levels
    const arrCurrentKanji = data;

    console.log(arrCurrentKanji);

    const toggleRotation = (index) => {
        setKanjiIsRotated((prevState) =>
            prevState.map((item, thisIndex) =>
                thisIndex === index ? { ...item, rotated: !item.rotated } : item
            )
        );
    };

    const printKanji = (item, index) => {
        const isRotated = kanjiIsRotated[index]?.rotated
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
                        <h1 className="kanjiSymboL--front japanese">{item.symbol}</h1>
                        <p className="translation--front">{item.translation}</p>

                        <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 21 21"><path fill="none" stroke="#262626" stroke-linecap="round" stroke-linejoin="round" d="M17 4a2.121 2.121 0 0 1 0 3l-9.5 9.5l-4 1l1-3.944l9.504-9.552a2.116 2.116 0 0 1 2.864-.125zm-1.5 2.5l1 1"/></svg>
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
                        <table className="table--kanji">
                            <tr>
                                <td rowSpan={2}>
                                    <h1 className="kanjiSymbol--back japanese">
                                        {item.symbol}
                                    </h1>
                                </td>
                                <td>
                                    <p>Onyomi: <label className="japanese">{item.onyomi}</label></p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Kunyomi: <label className="japanese">{item.kunyomi}</label></p>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
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
                <Link to={"/kanji"} className="link--goBack">
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

                    <p>Back</p>                </Link>
                <h1 className="title--kanjiTopic">{currentKanjiTopic}</h1>
            </div>

            <div className="container--grid">
                {arrCurrentKanji.map((item, index) => {
                    return printKanji(item, index);
                })}
            </div>
        </>
    );
}

import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useHanamiTalks from "../hooks/useHanamiTalks";
import { kanji as kanjiList } from "./../assets/data/kanji";
import "./../assets/css/kanji.css";

export default function KanjiTopic() {
    const { currentKanjiTopic } = useHanamiTalks();

    let arrCurrentKanji = [];
    arrCurrentKanji = kanjiList.filter(
        (item) =>
            item.topicTitle.toLowerCase() === currentKanjiTopic.toLowerCase()
    );

    const [kanjiIsRotated, setKanjiIsRotated] = useState(
        arrCurrentKanji.map((item, index) => ({
            index,
            rotated: false,
        }))
    );

    const toggleRotation = (index) => {
        setKanjiIsRotated((prevState) =>
            prevState.map((item, thisIndex) =>
                thisIndex === index ? { ...item, rotated: !item.rotated } : item
            )
        );
    };

    const printKanji = (item, index) => {
        const isRotated = kanjiIsRotated[index].rotated;
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
                        <h1 className="kanjiSymboL--front">{item.symbol}</h1>
                        <p className="translation--front">{item.translation}</p>

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
                                    <h1 className="kanjiSymbol--back">
                                        {item.symbol}
                                    </h1>
                                </td>
                                <td>
                                    <p>Onyomi: {item.onyomi}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Kunyomi: {item.kunyomi}</p>
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

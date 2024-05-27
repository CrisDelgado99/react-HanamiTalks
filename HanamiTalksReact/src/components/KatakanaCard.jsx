import React from "react";
import { useState } from "react";

export default function KatakanaCard({
    printKana,
    katakana,
    arrPureLetters,
    arrVowels,
}) {
    const [cardRotated, setCardRotated] = useState(false);

    const handleClick = () => {
        setCardRotated(!cardRotated);
    };

    return (
        <div
            className={
                cardRotated
                    ? "card--rotating hiragana rotated"
                    : "card--rotating hiragana"
            }
            onClick={handleClick}
        >
            <div className="card--full">
                <div className="card--folded card--full__front">
                    <h1>Katakana/<label className="japanese">カタカナ</label></h1>
                    <p>
                        Katakana also originated around the same period as
                        hiragana, but its development was influenced by Buddhist
                        practices and the use of Chinese characters in the
                        pronunciation of Sanskrit words. Over time, katakana
                        evolved to be used in the writing of foreign words and
                        names. During the Edo period (1603-1868), katakana began
                        to be adopted more widely for various applications.
                    </p>
                    <ul>
                        <li>
                            Katakana also represents syllables, but it is
                            primarily used to write foreign words, names, and
                            technical terms.
                        </li>
                        <li>
                            It has a more angular appearance and is used to
                            express words that come from other languages.
                        </li>
                    </ul>

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
                    {printKana({
                        kanaType: katakana,
                        arrLetters: arrPureLetters,
                        arrVowels: arrVowels,
                    })}
                    <div
                        className={
                            !cardRotated
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
}

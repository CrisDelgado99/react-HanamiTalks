import React from "react";
import { useState } from "react";

export default function HiraganaCard({
    printKana,
    hiragana,
    arrPureLetters,
    arrVowels,
}) {

    const [cardRotated, setCardRotated] = useState(false);

    const handleClick = () => {
        setCardRotated(!cardRotated);
    };

    return (
        <div className={cardRotated ? "card--rotating hiragana rotated" : "card--rotating hiragana"} onClick={handleClick}>
            <div className="card--full">
                <div className="card--folded card--full__front">
                    <h1>Hiragana/ひらがな</h1>
                    <p>
                        The hiragana writing system has its roots in the Heian
                        period (794-1185) in Japan. Although an exact date
                        cannot be determined, it is believed that hiragana
                        developed from stylized forms of Chinese characters,
                        simplifying and adapting the strokes to represent
                        Japanese sounds. Initially, it was primarily used by
                        women for creative writing and personal correspondence.
                    </p>
                    <ul>
                        <li>
                            Hiragana is a set of characters that is primarily
                            used to write Japanese words and verb endings.
                        </li>
                        <li>
                            Each character represents a syllable and has a
                            specific pronunciation.
                        </li>
                        <li>
                            It is more rounded and is used to express more
                            everyday words and grammar.
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
                        kanaType: hiragana,
                        arrLetters: arrPureLetters,
                        arrVowels: arrVowels,
                    })}
                    <div className={!cardRotated ? "cornerSvg dispNone" : "cornerSvg dispNotNone"}>
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

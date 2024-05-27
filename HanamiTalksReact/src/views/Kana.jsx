import React from "react";
import { useState } from "react";
import {
    hiragana as hiraganaList,
    katakana as katakanaList,
} from "../assets/data/kana";

import KatakanaCard from "../components/KatakanaCard";
import HiraganaCard from "../components/HiraganaCard";

import "./../assets/css/kana.css";


export default function Kana() {
    //States------------------------------------------------------------------------------------
    const [hiragana, setHiragana] = useState(hiraganaList);
    const [katakana, setKatakana] = useState(katakanaList);

    //Variables---------------------------------------------------------------------------------
    const arrPureLetters = [
        "vowel",
        "k",
        "s",
        "t",
        "n",
        "h",
        "m",
        "y",
        "r",
        "w",
    ];
    const arrImpureLetters = ["g", "z", "d", "p", "b"];

    const arrVowels = ["a", "i", "u", "e", "o", ""];
    const arrImpureVowels = ["a", "i", "u", "e", "o"];

    //Functions---------------------------------------------------------------------------------
    const printKana = ({ kanaType, arrLetters, arrVowels }) => {
        return (
            <table>
                {arrLetters.map((letter, rowIndex) => (
                    <tr key={rowIndex}>
                        {arrVowels.map((vowel, colIndex) => {
                            let sound;
                            if (letter === "vowel") {
                                sound = vowel;
                            } else {
                                sound = letter + vowel;
                            }

                            let element = kanaType.find(
                                (element) => element.sound === sound
                            );

                            if (!element) {
                                if (sound === "si") {
                                    element = kanaType.find(
                                        (element) => element.sound === "shi"
                                    );
                                } else if (sound === "ti") {
                                    element = kanaType.find(
                                        (element) => element.sound === "chi"
                                    );
                                } else if (sound === "tu") {
                                    element = kanaType.find(
                                        (element) => element.sound === "tsu"
                                    );
                                } else if (sound === "hu") {
                                    element = kanaType.find(
                                        (element) => element.sound === "fu"
                                    );
                                } else if (sound === "zi") {
                                    element = kanaType.find(
                                        (element) => element.sound === "ji"
                                    );
                                } else if (sound === "di") {
                                    element = kanaType
                                        .slice()
                                        .reverse()
                                        .find(
                                            (element) => element.sound === "ji"
                                        );
                                } else if (sound === "du") {
                                    element = kanaType
                                        .slice()
                                        .reverse()
                                        .find(
                                            (element) => element.sound === "zu"
                                        );
                                }
                            }

                            return (
                                <td key={colIndex}>
                                    {element && (
                                        <>
                                            <p className="japanese">{element.kana}</p>
                                            <div className="sound-div">
                                                {element.sound}
                                            </div>
                                        </>
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </table>
        );
    };

    return (
        <>
            <div className="card--simple kana">
                <h1>Kana</h1>
                <p>
                    Kana is a Japanese writing system designed to represent the
                    sounds of the Japanese language. This system is syllabic,
                    meaning that each character (kana) represents a specific
                    syllable or sound. In Japanese, there are two main types of
                    kana: hiragana and katakana.
                </p>
                <p>
                    Both writing systems, hiragana and katakana, play a
                    fundamental role in the phonetic representation of Japanese,
                    being essential for understanding and producing the language
                    in various situations. These kana are used in a wide variety
                    of texts, working together with the more complex characters
                    of the Japanese writing system, known as kanji.
                </p>
            </div>

            <div className="container--row">
                <HiraganaCard
                    printKana={printKana}
                    hiragana={hiragana}
                    arrPureLetters={arrPureLetters}
                    arrVowels={arrVowels}
                />

                <KatakanaCard
                    printKana={printKana}
                    katakana={katakana}
                    arrPureLetters={arrPureLetters}
                    arrVowels={arrVowels}
                />
            </div>
        </>
    );
}

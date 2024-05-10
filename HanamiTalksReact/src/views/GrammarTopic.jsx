import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useHanamiTalks from "../hooks/useHanamiTalks";
import { grammar as grammarList } from "./../assets/data/grammar";
import { grammarUse as grammarUseList } from "./../assets/data/grammarUse";
import "./../assets/css/grammar.css";

export default function GrammarTopic() {
    const { currentGrammarTopic } = useHanamiTalks();

    let objCurrentGrammar = {};
    objCurrentGrammar = grammarList.filter(
        (item) =>
            item.topicTitle.toLowerCase() === currentGrammarTopic.toLowerCase()
    );

    let arrGrammarUse = [];

    objCurrentGrammar[0].useId.forEach((id) => {
        const newUse = grammarUseList.find((item) => item.useId == id);
        arrGrammarUse.push(newUse);
    });

    console.log(objCurrentGrammar[0]);
    console.log(arrGrammarUse);

    return (
        <>
            <Link to={"/grammar"} className="link--goBack">
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
                <p>Back</p>{" "}
            </Link>
            <div className="card--simple grammar">
                <h1 className="title--grammar">
                    {objCurrentGrammar[0].topicTitle}
                </h1>
                <p>{objCurrentGrammar[0].description}</p>

                <div>
                    {arrGrammarUse.map((item, index) => {
                        return (
                            <div className="container--grammarUse" key={index}>
                                <h2 className="title--grammarUse">
                                    {item.title}
                                </h2>
                                <p>{item.description}</p>
                                <p>
                                    <strong>Example: </strong>
                                    {item.exampleOfUse}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

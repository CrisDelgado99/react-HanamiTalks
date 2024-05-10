import React, { useEffect, useState } from "react";
import KanjiForm from "../components/KanjiForm";
import useHanamiTalks from "../hooks/useHanamiTalks";
import { grammar as grammarList } from "./../assets/data/grammar";
import { Link } from "react-router-dom";
import "./../assets/css/list.css";

export default function Grammar() {
    const { getUniqueTopicTitles } = useHanamiTalks();
    const { printListElement } = useHanamiTalks();
    const { isAdmin } = useHanamiTalks();
    const { currentGrammarTopic, setCurrentGrammarTopic } =
        useHanamiTalks();

    const userLevel = 3;
    const grammarTopicTitles = getUniqueTopicTitles(grammarList);
    return (<>
        {isAdmin && <KanjiForm />}

        {grammarTopicTitles.map((item, index) =>
            userLevel >= item.level ? (
                <Link
                    to={"/grammarTopic"}
                    key={index}
                    className="listLink"
                    onClick={() => setCurrentGrammarTopic(item.title)}
                >
                    {printListElement(item, index)}
                </Link>
            ) : (
                printListElement(item, index)
            )
        )}
    </>);
}

import React, { useEffect, useState } from "react";
import KanjiForm from "../components/KanjiForm";
import useHanamiTalks from "../hooks/useHanamiTalks";
import { kanji as kanjiList } from "./../assets/data/kanji";
import { Link } from "react-router-dom"
import "./../assets/css/list.css";

export default function Kanji() {
    //I get the states, variables and functions from the context
    const { getUniqueTopicTitles } = useHanamiTalks();
    const { printListElement } = useHanamiTalks();
    const { isAdmin } = useHanamiTalks();
    const { currentKanjiTopic, setCurrentKanjiTopic } = useHanamiTalks();
    const userLevel = 3;

    //I create a list of topics related to kanji
    const kanjiTopicTitles = getUniqueTopicTitles(kanjiList);

    return (
        <>
            {isAdmin && <KanjiForm />}

            {kanjiTopicTitles.map((item, index) =>
                userLevel >= item.level ? (
                    <Link to={'/kanjiTopic'} key={index} className="listLink" onClick={() => setCurrentKanjiTopic(item.title)}>
                        {printListElement(item, index)}
                    </Link>
                ) : (
                    printListElement(item, index)
                )
            )}
        </>
    );
}

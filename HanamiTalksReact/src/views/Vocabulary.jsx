import React, { useEffect, useState } from "react";
import KanjiForm from "../components/KanjiForm";
import useHanamiTalks from "../hooks/useHanamiTalks";
import { vocabulary as vocabularyList } from "./../assets/data/vocabulary";
import { Link } from "react-router-dom";
import "./../assets/css/list.css";

export default function Vocabulary() {
    const { getUniqueTopicTitles } = useHanamiTalks();
    const { printListElement } = useHanamiTalks();
    const { isAdmin } = useHanamiTalks();
    const { currentVocabularyTopic, setCurrentVocabularyTopic } =
        useHanamiTalks();
    const userLevel = 3;

    const vocabularyTopicTitles = getUniqueTopicTitles(vocabularyList);
    return (
        <>
            {isAdmin && <KanjiForm />}

            {vocabularyTopicTitles.map((item, index) =>
                userLevel >= item.level ? (
                    <Link
                        to={"/vocabularyTopic"}
                        key={index}
                        className="listLink"
                        onClick={() => setCurrentVocabularyTopic(item.title)}
                    >
                        {printListElement(item, index)}
                    </Link>
                ) : (
                    printListElement(item, index)
                )
            )}
        </>
    );
}

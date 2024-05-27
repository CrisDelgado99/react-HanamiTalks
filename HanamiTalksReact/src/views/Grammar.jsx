import React, { useEffect, useState } from "react";
import KanjiForm from "../components/KanjiForm";
import useHanamiTalks from "../hooks/useHanamiTalks";
import { grammar as grammarList } from "./../assets/data/grammar";
import { Link } from "react-router-dom";
import "./../assets/css/list.css";
import useSWR from "swr";
import axiosClient from "../config/axios";

export default function Grammar() {
    const { getUniqueTopicTitles } = useHanamiTalks();
    const { printListElement } = useHanamiTalks();
    const { isAdmin } = useHanamiTalks();
    const { currentGrammarTopic, setCurrentGrammarTopic } =
        useHanamiTalks();

    const userLevel = 3;
        //SWR consult
    // Fetcher function to get data from API
    const fetcher = () =>
        axiosClient("/api/grammars/topicTitles").then(
            (response) => response.data
        );

    // Using useSWR to fetch data
    const { data, error, isLoading } = useSWR(
        "/api/grammars/topicTitles",
        fetcher
    );

    // Log data and error for debugging
    console.log(data);
    console.log("THIS IS THE SWR ERROR: " + error);

    // Handle loading, error, and data states
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // Assuming data is an array of topic titles with levels
    const grammarTopicTitles = data;
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

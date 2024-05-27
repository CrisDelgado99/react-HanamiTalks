import React, { useEffect, useState } from "react";
import KanjiForm from "../components/KanjiForm";
import useHanamiTalks from "../hooks/useHanamiTalks";
import { kanji as kanjiList } from "./../assets/data/kanji";
import { Link } from "react-router-dom";
import "./../assets/css/list.css";
import useSWR from "swr";
import axiosClient from "../config/axios";

export default function Kanji() {
    //I get the states, variables and functions from the context
    const { printListElement } = useHanamiTalks();
    const { isAdmin } = useHanamiTalks();
    const { currentKanjiTopic, setCurrentKanjiTopic } = useHanamiTalks();
    const userLevel = 3;

    //SWR consult
    // Fetcher function to get data from API
    const fetcher = () =>
        axiosClient("/api/kanjis/topicTitles").then(
            (response) => response.data
        );

    // Using useSWR to fetch data
    const { data, error, isLoading } = useSWR(
        "/api/kanjis/topicTitles",
        fetcher
    );

    // Log data and error for debugging
    console.log(data);
    console.log("THIS IS THE SWR ERROR: " + error);

    // Handle loading, error, and data states
    if (isLoading) return <div><h1>Loading...</h1></div>;
    if (error) return <div>Error: {error.message}</div>;

    // Assuming data is an array of topic titles with levels
    const kanjiTopicTitles = data;

    return (
        <>
            {isAdmin && <KanjiForm />}

            {kanjiTopicTitles.map((item, index) =>
                userLevel >= item.level ? (
                    <Link
                        to={"/kanjiTopic"}
                        key={index}
                        className="listLink"
                        onClick={() => setCurrentKanjiTopic(item.topicTitle)}
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

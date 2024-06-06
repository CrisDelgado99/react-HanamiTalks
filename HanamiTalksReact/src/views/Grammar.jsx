import React, { useEffect, useState } from "react";
import useHanamiTalks from "../hooks/useHanamiTalks";
import { Link } from "react-router-dom";
import "./../assets/css/list.css";
import useSWR from "swr";
import axiosClient from "../config/axios";
import { useAuth } from "../hooks/useAuth";
import AdminModify from "../components/AdminModify";

export default function Grammar() {
    const { currentGrammarTopic, setCurrentGrammarTopic } =
        useHanamiTalks();

    const { user } = useAuth({ middleware: 'auth' });
    const currentUser = user.data;
    const isAdmin = currentUser.type == "Admin";
    
    const [grammarLvl, setGrammarLvl] = useState(currentUser.grammarLvl);

    //SWR consult
    // Fetcher function to get data from API
    const fetcher = async () => {
        const token = localStorage.getItem('AUTH_TOKEN');
    
        return axiosClient("/api/grammars/topicTitles", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.data);
    };
    
    // Using useSWR to fetch data
    const { data, error, isLoading } = useSWR("/api/grammars/topicTitles", fetcher);

    // Log data and error for debugging
    console.log(data);
    console.log("THIS IS THE SWR ERROR: " + error);

    // Handle loading, error, and data states
    if (isLoading) return <div><h1>Loading...</h1></div>;
    if (error) return <div><h1>Error: {error.message}</h1></div>;

    const grammarTopicTitles = data;
    
    const handleClickCheckbox = async (e) => {
        e.preventDefault();
        
        currentUser.grammarLvl = grammarLvl + 1;

        let updatedUser = {... currentUser};

        let prevKanjis = [];
        let prevGrammars = [];
        let prevVocabs = [];

        updatedUser.kanjis.map(kanji => prevKanjis.push(kanji.id));
        updatedUser.vocabularies.map(vocab => prevVocabs.push(vocab.id));
        updatedUser.grammars.map(grammar => prevGrammars.push(grammar.id));

        updatedUser.kanjis = prevKanjis;
        updatedUser.vocabularies = prevVocabs;
        updatedUser.grammars = prevGrammars;


        const token = localStorage.getItem('AUTH_TOKEN');
    
        return axiosClient.post("/api/users/" + updatedUser.id, updatedUser ,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.data, setGrammarLvl(updatedUser.grammarLvl)).catch(error)

    }

    const handleClickStopParent = (e) => {
        e.preventDefault();
    }

    const printListElement = (item, index) => {
        return (
            <div
                key={index}
                className={
                    item.level > grammarLvl
                        ? "card--simple list deactivated"
                        : "card--simple list activated"
                }
            >
                <ul>
                    <li>{item.topicTitle}</li>
                </ul>
                <div className="buttons">
                    <div className="lock">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 dispNone"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                            />
                        </svg>
                    </div>
                    <div
                        className={
                            grammarLvl === item.level
                                ? "check check--transparent"
                                : "check"
                        }
                        onClick={grammarLvl === item.level ? handleClickCheckbox : handleClickStopParent}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        );
    };
    
    
    return (<>

        {grammarTopicTitles.map((item, index) =>
            grammarLvl >= item.level ? (
                <Link
                    to={"/grammarTopic"}
                    key={index}
                    className="listLink"
                    onClick={() => setCurrentGrammarTopic(item.topicTitle)}
                >
                    {printListElement(item, index, grammarLvl)}
                </Link>
            ) : (
                printListElement(item, index, grammarLvl)
            )
        )}
    </>);
}

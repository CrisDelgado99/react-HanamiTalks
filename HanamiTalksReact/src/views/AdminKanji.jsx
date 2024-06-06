import React, { useState } from "react";
import axiosClient from "../config/axios";
import useSWR from "swr";
import KanjiForm from "../components/KanjiForm";
import AdminKanjiList from "../components/AdminKanjiList";
import { useRef } from "react";

export default function AdminKanji() {
    const [isEdit, setIsEdit] = useState(false);
    const [kanjiToEdit, setKanjiToEdit] = useState(null);
    const formRef = useRef(null);

    // Fetcher function to get data from API
    const fetcherTopicTitles = async () => {
        const token = localStorage.getItem('AUTH_TOKEN');

        return axiosClient("/api/kanjis/topicTitles", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.data);
    };

    // Using useSWR to fetch data
    const { data : dataTopicTitles, error: errorTopicTitles, isLoading: isLoadingTopicTitles, mutate: mutateTopicTitles} = useSWR("/api/kanjis/topicTitles", fetcherTopicTitles);

    // Handle loading, error, and data states
    if (isLoadingTopicTitles) return <div><h1>Loading...</h1></div>;
    if (errorTopicTitles) return <div><h1>Error: {error.message}</h1></div>;

    // Assuming data is an array of topic titles with levels
    const kanjiTopicTitles = dataTopicTitles;

        // Fetcher function to get data from API
        const kanjisFetcher = async (url) => {
          const token = localStorage.getItem("AUTH_TOKEN");
          return axiosClient(url, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }).then((response) => response.data);
      };
  
      // Using useSWR to fetch data
      const { data: dataKanjis, error: errorKanjis, isLoading: isLoadingKanjis, mutate:mutateKanjis } = useSWR("/api/kanjis", kanjisFetcher);
  
      // Handle loading, error, and data states
      if (isLoadingKanjis) return <div><h1>Loading...</h1></div>;
      if (errorKanjis) return <div><h1>Error: {error.message}</h1></div>;
  
      // Assuming data is an array of topic titles with levels
      const kanjiList = dataKanjis.data;

      const scrollToKanjiForm = () => {
        console.log("SCROLLING INTO VIEW")
        const {current} = formRef
        if (current !== null){
          current.scrollIntoView({behavior: "smooth"})
        }
      };
  

    const handleEditClick = (kanji) => {
        setIsEdit(true);
        setKanjiToEdit(kanji);
        scrollToKanjiForm();
    }

    const handleBackToInsert = () => {
        setIsEdit(false);
        setKanjiToEdit(null);
    }

    const handleMutateKanjiTopicTitles = () => {
      mutateTopicTitles();
    }

    const handleMutateKanjis = () => {
      mutateKanjis();
    }


    return (
        <>
            <KanjiForm ref={formRef} kanjiTopicTitles={kanjiTopicTitles} isEdit={isEdit} kanjiToEdit={kanjiToEdit} handleBackToInsert={handleBackToInsert} handleMutateKanjiTopicTitles={handleMutateKanjiTopicTitles} handleMutateKanjis={handleMutateKanjis}/>
            <AdminKanjiList setIsEdit={setIsEdit} handleEditClick={handleEditClick} kanjiList={kanjiList} handleMutateKanjis={handleMutateKanjis} />
        </>
    )
}
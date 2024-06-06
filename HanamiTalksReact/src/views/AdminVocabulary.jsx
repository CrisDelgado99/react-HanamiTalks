import React, { useState } from "react";
import axiosClient from "../config/axios";
import useSWR from "swr";
import VocabularyForm from "../components/VocabularyForm";
import AdminVocabularyList from "../components/AdminVocabularyList";
import { useRef } from "react";

export default function AdminVocabulary() {
    const [isEdit, setIsEdit] = useState(false);
    const [vocabularyToEdit, setVocabularyToEdit] = useState(null);
    const formRef = useRef(null);

    // Fetcher function to get data from API
    const fetcherTopicTitles = async () => {
        const token = localStorage.getItem('AUTH_TOKEN');

        return axiosClient("/api/vocabularies/topicTitles", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => response.data);
    };

    // Using useSWR to fetch data
    const { data : dataTopicTitles, error: errorTopicTitles, isLoading: isLoadingTopicTitles, mutate: mutateTopicTitles} = useSWR("/api/vocabularies/topicTitles", fetcherTopicTitles);

    // Handle loading, error, and data states
    if (isLoadingTopicTitles) return <div><h1>Loading...</h1></div>;
    if (errorTopicTitles) return <div><h1>Error: {error.message}</h1></div>;

    // Assuming data is an array of topic titles with levels
    const vocabularyTopicTitles = dataTopicTitles;

        // Fetcher function to get data from API
        const vocabulariesFetcher = async (url) => {
          const token = localStorage.getItem("AUTH_TOKEN");
          return axiosClient(url, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }).then((response) => response.data);
      };
  
      // Using useSWR to fetch data
      const { data: dataVocabularies, error: errorVocabularies, isLoading: isLoadingVocabularies, mutate:mutateVocabularies } = useSWR("/api/vocabularies", vocabulariesFetcher);
  
      // Handle loading, error, and data states
      if (isLoadingVocabularies) return <div><h1>Loading...</h1></div>;
      if (errorVocabularies) return <div><h1>Error: {error.message}</h1></div>;
  
      // Assuming data is an array of topic titles with levels
      const vocabularyList = dataVocabularies.data;

      const scrollToVocabularyForm = () => {
        console.log("SCROLLING INTO VIEW")
        const {current} = formRef
        if (current !== null){
          current.scrollIntoView({behavior: "smooth"})
        }
      };
  

    const handleEditClick = (vocabulary) => {
        setIsEdit(true);
        setVocabularyToEdit(vocabulary);
        scrollToVocabularyForm();
    }

    const handleBackToInsert = () => {
        setIsEdit(false);
        setVocabularyToEdit(null);
    }

    const handleMutateVocabularyTopicTitles = () => {
      mutateTopicTitles();
    }

    const handleMutateVocabularies = () => {
      mutateVocabularies();
    }


    return (
        <>
            <VocabularyForm ref={formRef} vocabularyTopicTitles={vocabularyTopicTitles} isEdit={isEdit} vocabularyToEdit={vocabularyToEdit} handleBackToInsert={handleBackToInsert} handleMutateVocabularyTopicTitles={handleMutateVocabularyTopicTitles} handleMutateVocabularies={handleMutateVocabularies}/>
            <AdminVocabularyList setIsEdit={setIsEdit} handleEditClick={handleEditClick} vocabularyList={vocabularyList} handleMutateVocabularies={handleMutateVocabularies} />
        </>
    )
}
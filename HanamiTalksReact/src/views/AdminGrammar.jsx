import React, { useState } from "react";
import axiosClient from "../config/axios";
import useSWR from "swr";
import GrammarForm from "../components/GrammarForm";
import AdminGrammarList from "../components/AdminGrammarList";
import { useRef } from "react";

export default function AdminGrammar() {
    const [isEdit, setIsEdit] = useState(false);
    const [grammarToEdit, setGrammarToEdit] = useState(null);
    const formRef = useRef(null);

        // Fetcher function to get data from API
        const grammarsFetcher = async (url) => {
          const token = localStorage.getItem("AUTH_TOKEN");
          return axiosClient(url, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }).then((response) => response.data);
      };
  
      // Using useSWR to fetch data
      const { data: dataGrammars, error: errorGrammars, isLoading: isLoadingGrammars, mutate:mutateGrammars } = useSWR("/api/grammars", grammarsFetcher);
  
      // Handle loading, error, and data states
      if (isLoadingGrammars) return <div><h1>Loading...</h1></div>;
      if (errorGrammars) return <div><h1>Error: {error.message}</h1></div>;
  
      const grammarList = dataGrammars.data;

      const scrollToGrammarForm = () => {
        const {current} = formRef
        if (current !== null){
          current.scrollIntoView({behavior: "smooth"})
        }
      };
  

    const handleEditClick = (grammar) => {
        setIsEdit(true);
        setGrammarToEdit(grammar);
        scrollToGrammarForm();
    }

    const handleBackToInsert = () => {
        setIsEdit(false);
        setGrammarToEdit(null);
    }

    const handleMutateGrammars = () => {
      mutateGrammars();
    }


    return (
        <>
            <GrammarForm grammarList={grammarList} ref={formRef} isEdit={isEdit} grammarToEdit={grammarToEdit} handleBackToInsert={handleBackToInsert} handleMutateGrammars={handleMutateGrammars}/>
            <AdminGrammarList setIsEdit={setIsEdit} handleEditClick={handleEditClick} grammarList={grammarList} handleMutateGrammars={handleMutateGrammars} />
        </>
    )
}
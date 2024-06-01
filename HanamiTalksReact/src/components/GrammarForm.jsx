import React from 'react'
import { createRef, useState } from 'react'
import "./../assets/css/itemForm.css"

export default function GrammarForm({grammarTopicTitles}) {
  const topicTitleRef = createRef();
  const descriptionRef = createRef();


  const addNewGrammar = async () =>{

  }

  return (
    <div className='card--item-form'>
        <h2>Insert grammar</h2>

      <input type='submit' value="INSERT"/>
    </div>
  )
}

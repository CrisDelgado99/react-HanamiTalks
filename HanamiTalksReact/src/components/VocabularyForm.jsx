import React from 'react'
import { createRef, useState } from 'react'
import "./../assets/css/itemForm.css"

export default function VocabularyForm({vocabularyTopicTitles}) {
  const [isOther, setIsOther] = useState(false);
  const wordRef = createRef();
  const kanaRef = createRef();
  const romajiRef = createRef();
  const translationRef = createRef();

  const topicTitleSelectRef = createRef();
  const topicTitleInputRef = createRef();

  const checkIfOther = () => {
    setIsOther(topicTitleSelectRef.current.value == "other")
  }

  const addNewVocabulary = async () =>{

  }

  return (
    <div className='card--item-form'>
        <h2>Insert vocabulary</h2>
        <div className='item-form__div--input'>
          <label htmlFor="word">Word:</label>
          <input type="text" name="word" id="" ref={wordRef}/>
        </div>
        <div className='item-form__div--input'>
          <label htmlFor="kana">Kana:</label>
          <input type="text" name="kana" id="" ref={kanaRef}/>
        </div>
        <div className='item-form__div--input'>
          <label htmlFor="romaji">Romaji:</label>
          <input type="text" name="romaji" id="" ref={romajiRef}/>
        </div>
        <div className='item-form__div--input'>
          <label htmlFor="translation">Translation:</label>
          <input type="text" name="translation" id="" ref={translationRef}/>
        </div>

        <div className='item-form__div--topicTitles'>
          <label htmlFor="">Topic title:</label>
          <select name="" id="" onChange={checkIfOther} ref={topicTitleSelectRef}>
            {vocabularyTopicTitles.map((title, index) => (
              <option value={title.topicTitle} key={index}>{title.topicTitle}</option>
            ))}
            <option value="other">Other</option>
          </select>
          {isOther && <div className='item-form__div--newTopic'><label>New topic:</label><input type='text' ref={topicTitleInputRef}/></div> }
        </div>
      
      <input type='submit' value="INSERT"/>
    </div>
  )
}

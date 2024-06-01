import React from 'react'
import { createRef, useState } from 'react'
import "./../assets/css/itemForm.css"

export default function KanjiForm({kanjiTopicTitles}) {
  const [isOther, setIsOther] = useState(false);
  const symbolRef = createRef();
  const kunyomiRef = createRef();
  const onyomiRef = createRef();
  const translationRef = createRef();

  const topicTitleSelectRef = createRef();
  const topicTitleInputRef = createRef();

  const checkIfOther = () => {
    setIsOther(topicTitleSelectRef.current.value == "other")
  }

  const addNewKanji = async () =>{
    let topicTitle = '';
    let level = 1;

    if(isOther){
      topicTitle = topicTitleInputRef.current.value; 
      level = kanjiTopicTitles.length + 1;
    } else {
      topicTitle = topicTitleSelectRef.current.value; 
      const kanjiTopicItem = kanjiTopicTitles.find(item => item.topicTitle == topicTitle)
      level = kanjiTopicItem.level;
    }


    const newKanjiData = {
      symbol: symbolRef.current.value,
      kunyomi: kunyomiRef.current.value,
      onyomi: onyomiRef.current.value,
      translation: translationRef.current.value,
      topicTitle: topicTitle,
      level: level
    }

    console.log(newKanjiData)

    try{

    } catch(error){

    }
  }

  const updateKanji = async () => {

  }

  return (
    <div className='card--item-form'>
        <h2>Insert kanji</h2>
        <div className='item-form__div--input'>
          <label htmlFor="symbol">Symbol:</label>
          <input type="text" name="symbol" id="" ref={symbolRef}/>
        </div>
        <div className='item-form__div--input'>
          <label htmlFor="kunyomi">Kunyomi:</label>
          <input type="text" name="kunyomi" id="" ref={kunyomiRef}/>
        </div>
        <div className='item-form__div--input'>
          <label htmlFor="onyomi">Onyomi:</label>
          <input type="text" name="onyomi" id="" ref={onyomiRef}/>
        </div>
        <div className='item-form__div--input'>
          <label htmlFor="translation">Translation:</label>
          <input type="text" name="translation" id="" ref={translationRef}/>
        </div>

        <div className='item-form__div--topicTitles'>
          <label htmlFor="">Topic title:</label>
          <select name="" id="" onChange={checkIfOther} ref={topicTitleSelectRef}>
            {kanjiTopicTitles.map((title, index) => (
              <option value={title.topicTitle} key={index}>{title.topicTitle}</option>
            ))}
            <option value="other">Other</option>
          </select>
          {isOther && <div className='item-form__div--newTopic'><label>New topic:</label><input type='text' ref={topicTitleInputRef}/></div> }
        </div>
      
      <input type='submit' value="INSERT" onClick={addNewKanji}/>
    </div>
  )
}

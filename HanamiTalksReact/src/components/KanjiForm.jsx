import React from 'react'
import { useRef } from 'react'
import "./../assets/css/itemForm.css"

export default function KanjiForm() {
  return (
    <div className='card--item-form'>
        <h2>Insert kanji</h2>
        <div className='item-form__div--input'>
          <label htmlFor="symbol">Symbol:</label>
          <input type="text" name="symbol" id="" />
        </div>
        <div className='item-form__div--input'>
          <label htmlFor="kunyomi">Kunyomi:</label>
          <input type="text" name="kunyomi" id="" />
        </div>
        <div className='item-form__div--input'>
          <label htmlFor="onyomi">Onyomi:</label>
          <input type="text" name="onyomi" id="" />
        </div>
        <div className='item-form__div--input'>
          <label htmlFor="translation">Translation:</label>
          <input type="text" name="translation" id="" />
        </div>

        <div>
          <label htmlFor="">Topic title:</label>
          <select name="" id="">
            
          </select>
        </div>
      
    </div>
  )
}

import React from 'react'
import { useNavigate } from "react-router-dom";
export default function AdminModify({type}) {
    const navigate = useNavigate();
    const handleClick = () => {
        if(type == "Kanji"){
            navigate('/admin/adminKanji')
        } else if(type == "Vocabulary"){
            navigate('/admin/adminVocabulary')
        } else if(type == "Grammar"){
            navigate('/admin/adminGrammar')
        }
    }

  return (
    <input className='input--admin-modify' type="submit" value={"Modify " + type} onClick={handleClick}/>
  )
}

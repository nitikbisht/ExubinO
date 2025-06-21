import React from 'react';

export default function QuestionCard({ q, answer, onAnswer }) {
  return (
    <div style={{border:'1px solid #ccc', padding:10, marginBottom:10,width:'100%'}}>
      <p><strong>{q.question_text}</strong></p>
      {q.options.map((opt,ind)=> (
        <label key={opt} style={{display:'block', margin:'5px 0'}}>
          <input type="radio" name={q.id} value={ind+1} checked={answer===ind+1}
            onChange={()=>onAnswer(q.id, ind+1)} /> {opt}
        </label>
      ))}
    </div>
  );
}

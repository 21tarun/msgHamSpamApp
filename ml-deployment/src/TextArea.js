import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TextBox() {
    let [text,setText]=React.useState("")
    let [result,setResult]=React.useState("")
    function check(){
        if(!text)return alert("enter some text")
        fetch("http://localhost:4000/ml",{
            method:'POST',
            headers:{
              'Content-type': 'application/json',
              
            },
            body:JSON.stringify({text:text})
        }).then((result)=>result.json())
        .then(res=>{
            if(res.data[0]==0)setResult("Ham")
            else setResult("spam")
            
            console.log(res.data)
        })
    }
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h1 className="text-center mb-4">Check Message is Ham Or Spam</h1>
          
            <div className="form-group">
              <textarea className="form-control" rows="5" placeholder="Type something..."  onChange={(e)=>{setResult("");setText(e.target.value)}}></textarea>
            </div>
            <button className="btn btn-primary" type="submit" onClick={()=>check()}>Check</button>
          
        </div>
      </div>
    </div>
    {
        result=="Ham"?<h1 style={{color:"green", textAlign:"center"}}>{result}</h1>:<h1 style={{color:"red",textAlign:"center"}}>{result}</h1>
    }
    </>

  );
}

export default TextBox;
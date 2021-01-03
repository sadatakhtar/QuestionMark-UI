import React,{useState} from 'react';
import { Link } from "react-router-dom";
import './AskQuestionComponent.css'
import Modules from './Modules';

// quesObj.question_title,
//       quesObj.question,
//       quesObj.module_id,
//       quesObj.users_id,
//       quesObj.question_date,
//       quesObj.answers,

function RightSection()
{
    // This is a state variable which will store the value selected from drop down menu and then it will be sent to post request.
    // let [selectedModule,setSelectedModule]=useState("");
    let [displayForm,setDisplayForm]=useState(true);

    let today = new Date().toISOString().slice(0, 10)

    let [formTitle,setFormTitle]=useState("");
    let [formQues,setFormQues]=useState("");
    let [formModule_id,setFormModule_id]=useState("");
    let [formUsers_id,setFormUsers_id]=useState(""); // this I need to tale using react hook useParams.
    let [formQues_date,setFormQues_date]=useState(today); 
    let [formAnswers,setFormAnswers]=useState(0);

   

    console.log(today)


    const detailsOfQues={
        title:formTitle,
        question: formQues,
        module_id:formModule_id,
        users_id:formUsers_id,
        question_date:formQues_date,
        answers:formAnswers
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(detailsOfQues)
    }

    function askAnother()
    {
        setDisplayForm(true);
    }

    //in this function I should update all the values and call the fetch to submit the data.
    function submitted()
    {
        console.log("-------------------")
        console.log(detailsOfQues);
        console.log("-------------------")
        setFormAnswers(0);
        setDisplayForm(false);
    }

    function handleTitle(e)
    {
        setFormTitle(e.target.value);
    }

    function handleQuestion(e)
    {
        setFormQues(e.target.value)
    }


    return(
        <div className="right-section">
            <div className="first-section">
                <h1 className="heading">Ask Question</h1>
                
                <Link to="/allquestions"> 
                  <button className="logout-btn">Logout</button>
                </Link>
            </div>
            {displayForm?
                <form className="second-section" onSubmit={submitted}>
                    <div className="title-module">
                        <input className="title" name="title" type="text" placeholder="Title of the question" onChange={handleTitle} required />
                        <Modules setFormModule_id={setFormModule_id}/>
                    </div>

                    <div className="text-post">
                        <input className="ques-text"name="title" type="text" placeholder="Type your question here" onChange={handleQuestion} required/>
                        <input className="post-btn" type="submit" value="Post" />
                    </div>
                </form>
                :
                <div className="ask-another-question-container">
                    <h1 className="question-posted-heading">Congratulations! </h1>
                    <p className="question-posted-message">Your question has been posted! You Will recieve an email when someone responds to your question.</p>
                    <button className="ask-another-question-btn" onClick={askAnother}>Ask Another Question</button>
                </div>
            }
            
    
        </div>
    )

}

export default RightSection;

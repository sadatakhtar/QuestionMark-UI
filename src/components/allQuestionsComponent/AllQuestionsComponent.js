import React, {useState, useEffect} from 'react';
import '../allQuestionsComponent/AllQuestionsComponent.css';
import {Link, useHistory} from 'react-router-dom';
import SelectedQuestionPage
  from '../../pages/selectedQuestionPage/SelectedQuestionPage';
import pdf from '../allQuestionsComponent/download.png';
import jsPDF from 'jspdf';
import icon from '../allQuestionsComponent/click.jpg';
const AllQuestionsComponent = () => {
  const [list, setList] = useState ([]);
  const [filter, setFilter] = useState ([]);
  const [modulequestions, setModulequestions] = useState ([]);
  const [input, setInput] = useState ('');
  const [qAnswers, setQAnswers] = useState ([]);
  const history = useHistory ();
  useEffect (() => {
    fetch (`https://question-mark-api.herokuapp.com/allquestions`)
      .then (res => {
        console.log (res);
        if (!res.ok) {
          throw Error (res.status + ' _ ' + res.url);
        }
        return res.json ();
      })
      .then (data => {
        setModulequestions (data.allquestions);
        setList (data.allquestions);
        setFilter (data.filter);
        setQAnswers (data.q_answers);
      })
      .catch (error => {
        console.error (error);
      });
  }, []);

  const changeModulequestions = questionModuleId => {
    if (questionModuleId == 'default') {
      setModulequestions (list);
    } else {
      let filtered = [];
      for (let i = 0; i < list.length; i++) {
        if (list[i].module_id == questionModuleId) {
          filtered.push (list[i]);
        }
      }
      setModulequestions (filtered);
      // console.log (modulequestions);
    }
  };

  const changeHandler = event => {
    let key = event.target.value;
    switch (key) {
      case '1':
        changeModulequestions (1);
        break;
      case '2':
        changeModulequestions (2);

        break;
      case '3':
        changeModulequestions (3);

        break;
      case '4':
        changeModulequestions (4);
        break;
      case '5':
        changeModulequestions (5);

        break;
      case '6':
        changeModulequestions (6);
        break;
      case '7':
        changeModulequestions (7);
        break;
      case 'default':
        changeModulequestions ('default');
        break;
    }
  };

  const handleSearch = e => {
    e.preventDefault ();
    let key = e.target.value;
    setInput (key);
    let filtered = list.filter (question =>
      question.question.toLowerCase ().includes (key.toLowerCase ())
    );

    setModulequestions (filtered);
  };

  const jsPDFGenerator = () => {
    var doc = new jsPDF ('p', 'pt');

    var i = 1;
    var j = 2;
    qAnswers.map (question => {
      doc.text (20, 30 * i, question.question + '\n' + question.answer);
      i += 2;
    });

    doc.setFont ('courier');
    doc.save ('AllQuestions');
  };

  return (
    <div className="body-containerH">
      <div className="search-containerH">
        <a href="" onClick={jsPDFGenerator}>
          <img id="img-pdf" src={pdf} />
        </a>
        <div class="form1H">
          <form>
            <input
              class="searchbox-onlyH"
              name="search"
              type="text"
              onChange={handleSearch}
              placeholder="SEARCH HERE ... "
            />
            {/* <button class="searchbtn">SEARCH</button> */}
          </form>
        </div>
        <div class="form2H">
          <form>
            <button
              class="askq-btnH"
              onClick={() => {
                history.push ('/askquestion');
              }}
            >
              ASK QUESTION
            </button>
          </form>
        </div>
      </div>

      <div className="col-linksH"><img src={icon} /></div>
      <div className="to-divide-2divs">
        <div className="col-and-search-containerH">
          {' '}<h5 id="pdf-download">DOWNLOAD</h5>
          <ul className="ulH">
            <li className="liH">
              {' '}<Link to="/Answered"> ANSWERED QUESTIONS </Link>
            </li>
            |
            <li className="liH">
              {' '}<Link to="/UnAnswered"> UNANSWERED QUESTIONS </Link>
            </li>
            |
            <li className="liH">
              {' '}<Link to="/allquestions">ALL QUESTIONS</Link>
            </li>
            |
            <li className="liH">
              <Link to="/askquestion">ASK QUESTION</Link>
            </li>
          </ul>
        </div>
        <div className="bodyContentH">
          <h1 id="page-headingH">ALL QUESTIONS</h1>
          <div className="link-filterH">

            <select id="moduleSelectorH" onChange={changeHandler}>
              <option value="default">FILTER BY MODULE</option>
              {filter.map (item => {
                return <option value={item.id}>{item.module}</option>;
              })}
            </select>
          </div>
          <img src="" />
          <div class="allquestions-containerH">
            <div class="allquestions1H">
              {modulequestions.map (question => (
                <div class="question1H">
                  <Link to={`/selectedquestionpage/${question.id}`}>
                    {question.question_title}
                  </Link>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllQuestionsComponent;

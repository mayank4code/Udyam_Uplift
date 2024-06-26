import {React, useEffect, useState, useRef} from 'react'
import { server_origin } from '../../utilities/constants';

const AdminQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [clickedQuestion, setClickedQuestion] = useState({_id: "", questionText: "", options: []});
    const [editQuestion, setEditQuestion] = useState({question: "", option1: "", option2:"",option3:"",option4:""});
    const ref = useRef(null);
    const refClose = useRef(null);
    const ref2 = useRef(null);
    const refClose2 = useRef(null);
    const refAddOpen = useRef(null);
    const refAddClose = useRef(null);

    useEffect(() => {
        verifyUser();
        getQuestions();
    }, [])

    const verifyUser = async()=>{
        if(localStorage.getItem('token')){
            const userId = process.env.REACT_APP_USER_ID;
        const userPassword = process.env.REACT_APP_USER_PASSWORD;
        const basicAuth = btoa(`${userId}:${userPassword}`);
            const response = await fetch(`${server_origin}/api/user/verify-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                    "Authorization": `Basic ${basicAuth}`,
                },
            });
    
            const result = await response.json()
            if(result.isAdmin===true){
                setIsAdmin(true);
            }
        }
    }


    const getQuestions = async ()=>{
        const userId = process.env.REACT_APP_USER_ID;
        const userPassword = process.env.REACT_APP_USER_PASSWORD;
        const basicAuth = btoa(`${userId}:${userPassword}`);
        const response = await fetch(`${server_origin}/api/user/get-questions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
                "Authorization": `Basic ${basicAuth}`,
            },
        });
        const result = await response.json()
        const questions1 = result.questions;

        setQuestions(questions1);
        
    }

    const openAddQuestionModal = ()=>{
        refAddOpen.current.click();
    }

    const handleAddQuestion = async ()=>{
        console.log(editQuestion);
        const newQuestion = {
            questionText: editQuestion.question,
            options:[editQuestion.option1, editQuestion.option2, editQuestion.option3, editQuestion.option4]
        }

        //!TODO: Check if any question or options are empty or not entered by the admin
        const userId = process.env.REACT_APP_USER_ID;
        const userPassword = process.env.REACT_APP_USER_PASSWORD;
        const basicAuth = btoa(`${userId}:${userPassword}`);

        const response = await fetch(`${server_origin}/api/admin/add-question`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
                "Authorization": `Basic ${basicAuth}`,
            },
            body: JSON.stringify(newQuestion)
        });
        const result = await response.json();
        console.log(result);
        refAddClose.current.click();
        window.location.reload();
    }

    const handleView = (question)=>{
        console.log("question: ", question);
        setClickedQuestion(question);
        ref.current.click();
    }

    const handleEdit = (question)=>{
        setClickedQuestion(question);
        setEditQuestion({
            question: question.questionText, 
            option1:question.options[0],
            option2:question.options[1],
            option3:question.options[2],
            option4:question.options[3],
        });
        ref2.current.click();
    }

    const handleDelete = async (question)=>{
        if(window.confirm(`Are you sure to delete this question - ${question.questionText.length>50?question.questionText.substring(0,50)+"...":question.questionText}`)){
            const userId = process.env.REACT_APP_USER_ID;
        const userPassword = process.env.REACT_APP_USER_PASSWORD;
        const basicAuth = btoa(`${userId}:${userPassword}`);   
            const response = await fetch(`${server_origin}/api/admin/delete-question/${question._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                    "Authorization": `Basic ${basicAuth}`,
                },
                });
                const result = await response.json();
                console.log(result);
                window.location.reload();

        }
        
    }

    const onChange = (e)=>{
        console.log(editQuestion);
        setEditQuestion({...editQuestion, [e.target.name]: e.target.value})
    }

    const handleUpdateQuestion = async (e)=>{
        e.preventDefault();
        const updatedQuestion = {
            questionText: editQuestion.question,
            options:[
                editQuestion.option1,
                editQuestion.option2,
                editQuestion.option3,
                editQuestion.option4
            ]
        }
        console.log(clickedQuestion._id);
        const userId = process.env.REACT_APP_USER_ID;
        const userPassword = process.env.REACT_APP_USER_PASSWORD;
        const basicAuth = btoa(`${userId}:${userPassword}`);
        const response = await fetch(`${server_origin}/api/admin/update-question/${clickedQuestion._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
                "Authorization": `Basic ${basicAuth}`,
            },
            body: JSON.stringify(updatedQuestion)
        });
        const result = await response.json();
        console.log("result: ", result);
        refClose2.current.click();
    }


  return (
    <>

    {/* MODAL for Adding question */}
   <button
        ref={refAddOpen}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#addquestionmodal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="addquestionmodal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update question
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              {/* Form */}
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Question
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={editQuestion.question}
                    id="question"
                    name="question"
                    minLength={3}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Option 1
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={editQuestion.option1}
                    id="option1"
                    name="option1"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Option 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={editQuestion.option2}
                    id="option2"
                    name="option2"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Option 3
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={editQuestion.option3}
                    id="option3"
                    name="option3"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Option 4
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={editQuestion.option4}
                    id="option4"
                    name="option4"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button 
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref = {refAddClose}
              >
                Close
              </button>
              <button
                onClick={handleAddQuestion}
                type="button"
                className="btn btn-primary"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

{/* MODAL STARTING */}
<button
    ref={ref}
    type="button"
    className="btn btn-primary d-none"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    Launch demo modal
  </button>

  <div
    className="modal fade"
    id="exampleModal"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title" id="exampleModalLabel">
            <b>Question</b> 
          </h4>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="modal-body">
          <p style={{fontSize: "1.5rem"}}>{clickedQuestion.questionText}</p>
          <div style={{fontSize: "1.2rem"}}>
            <ol>
                <li>
                   {clickedQuestion.options[0]}
                </li>
                <li>
                   {clickedQuestion.options[1]}
                </li>
                <li>
                   {clickedQuestion.options[2]}
                </li>
                <li>
                   {clickedQuestion.options[3]}
                </li>
            </ol>
            

          </div>
          
        </div>
        <div className="modal-footer">
          <button 
            // ref={refClose}
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            ref = {refClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* MODAL for editing question */}
   <button
        ref={ref2}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update question
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              {/* Form */}
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Question
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={editQuestion.question}
                    id="question"
                    name="question"
                    minLength={3}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Option 1
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={editQuestion.option1}
                    id="option1"
                    name="option1"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Option 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={editQuestion.option2}
                    id="option2"
                    name="option2"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Option 3
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={editQuestion.option3}
                    id="option3"
                    name="option3"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Option 4
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={editQuestion.option4}
                    id="option4"
                    name="option4"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button 
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref = {refClose2}
              >
                Close
              </button>
              <button
                onClick={handleUpdateQuestion}
                type="button"
                className="btn btn-primary"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
    {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal3">
    Launch demo modal
    </button>

    <div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            ...
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
        </div>
    </div>
    </div> */}


    { isAdmin &&
        <div>
      <h1 className="my-5">Questions Information</h1>

      <div style={{textAlign: "center"}}>
        <button className='btn btn-primary' onClick={openAddQuestionModal}>Add new question</button>
      </div>
      

      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Question</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => {
            return (
              <tr key={question._id}>
                <td>{question.questionText.substring(0,120)}{question.questionText.length>120 && "...."}</td>
                <td>
                  <button
                    className="btn btn-success mx-3"
                    onClick={()=>{handleView(question)} }
                  >
                    View
                  </button>
                  <button
                    className="btn btn-success mx-3"
                    onClick={()=>{handleEdit(question)}}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger mx-3"
                    onClick={()=>{handleDelete(question)}}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    }
    
    </>
  )
}

export default AdminQuestions
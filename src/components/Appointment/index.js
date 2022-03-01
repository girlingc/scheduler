import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import { delayStatus } from "helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { bookInterview, id, interview, cancelInterview } = props;
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  const save = (name, interviewer) => {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(id, interview)
      .then(() => {transition(SHOW)})
      .catch((error)=> {
        console.log("Error while saving", error);
        transition(ERROR_SAVE, true);
      })
  };

  const deleteAppointment = (id) => {
    console.log("deleteAppointment:");
    transition(DELETING)
    cancelInterview(id)
      .then(() => {transition(DELETING)})
      .then(() => {transition(EMPTY)})
      .catch((error) => {
        console.log("Error while deleting", error);
        transition(ERROR_DELETE, true);
      })
  }

	return (
		<article className='appointment'>
			<Header time={props.time} />
        {mode === SHOW && <Show 
        student={interview.student} 
        interviewer={interview.interviewer} 
        cancelInterview={() => {transition(CONFIRM)}}
        onEdit={() => {transition(EDIT)}}
      />}
      {mode === EMPTY &&  <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form
        interviewers={props.interviewers} 
        onCancel={() => back(EMPTY)} 
        onSave={save}
      />}
      {mode === SAVING && <Status message={"Saving"} onComplete={() => delayStatus(transition, SHOW)}/>}
      {mode === DELETING && <Status message={"Deleting"} onComplete={() => delayStatus(transition, EMPTY)}/>}
      {mode === CONFIRM && 
        <Confirm message={"Confirm Messgae"} 
        onCancel={back}
        onDelete={() => deleteAppointment(id)}
        />}
      {mode === EDIT && <Form 
        onSave={save}
        onCancel={() => back()}
        interviewers={props.interviewers} 
        student={interview.student}
        interviewer={interview.interviewer.id}
      />}
      {mode === ERROR_SAVE && <Error message={"Error while saving"} onClose={()=>{back()}}/>}
      {mode === ERROR_DELETE && <Error message={"Error while deleting"} onClose={()=>{back()}}/>}
      
		</article>
	);
}
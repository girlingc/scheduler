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

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_EDIT = "ERROR_EDIT";

export default function Appointment(props) {
  const { bookInterview, id, interview, cancelInterview, editInterview } =
    props;
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Calls transition to book an interview
  const save = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer: interviewer.id,
    };
    bookInterview(id, interview)
      .then(() => {
        transition(SAVING);
      })
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        transition(ERROR_SAVE, true);
      });
  };

  const saveEdit = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer: interviewer.id,
    };
    editInterview(id, interview)
      .then(() => {
        transition(SAVING);
      })
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        transition(ERROR_EDIT, true);
      });
  };

  // Calls transition to delete an appointment
  const deleteAppointment = (id) => {
    transition(DELETING);
    cancelInterview(id)
      .then(() => {
        transition(DELETING);
      })
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          cancelInterview={() => {
            transition(CONFIRM);
          }}
          onEdit={() => {
            transition(EDIT);
          }}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Do you really want to delete?"}
          onCancel={back()}
          onDelete={() => deleteAppointment(id)}
        />
      )}
      {mode === EDIT && (
        <Form
          onSave={saveEdit}
          onCancel={() => back()}
          interviewers={props.interviewers}
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={"There was an error while attempting to save appointment"}
          onClose={() => {
            back();
          }}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"There was an error while attempting to delete appointment"}
          onClose={() => {
            back();
          }}
        />
      )}
      {mode === ERROR_EDIT && (
        <Error
          message={"There was an error while attempting to edit appointment"}
          onClose={() => {
            back();
          }}
        />
      )}
    </article>
  );
}

import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // Resets state for student, error and interviewer when cancel() in invoked
  const reset = () => {
    setStudent("");
    setError("");
    setInterviewer(null);
  };

  function cancel() {
    reset();
    props.onCancel();
  }

  // Stops page from re-rendering on each key stroke
  const onSubmit = (event) => {
    event.preventDefault();
  };

  // Error handling for blank student name or interviewer
  const validate = (student, interviewer) => {
    if (!student || !interviewer) {
      setError("Student name or Interviewer cannot be blank");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={onSubmit}>
          <input
            className="appointment__create-input text--semi-bold"
            name={props.student}
            type="text"
            placeholder={student || "Enter Student Name"}
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <div>{error}</div>
        <InterviewerList
          value={interviewer}
          interviewers={props.interviewers}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => validate(student, interviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

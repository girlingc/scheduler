import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
	const [student, setStudent] = useState(props.student || "");
	const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }

  const onSubmit = (event) => {event.preventDefault()};
  
	return (
		<main className='appointment__card appointment__card--create'>
			<section className='appointment__card-left'>
				<form autoComplete='off' onSubmit={onSubmit}>
					<input
						className='appointment__create-input text--semi-bold'
						name={props.student}
						type='text'
						placeholder={student || "Write your name here"}
						value={student}
            onChange={(event) => setStudent(event.target.value)}
					/>
				</form>
				<InterviewerList
					value={interviewer}
					interviewers={props.interviewers}
          onChange={setInterviewer}
				/>
			</section>
			<section className='appointment__card-right'>
				<section className='appointment__actions'>
					<Button danger onClick={props.onCancel}>
						Cancel
					</Button>
					<Button confirm onClick={() => props.onSave(student, interviewer)}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}
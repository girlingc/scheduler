import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import axios from "axios";

export default function Application(props) {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});

	const bookInterview = (id, interview) => {
		console.log(
			"bookInterview: ",
			id,
			interview
		);
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};
		return axios
			.put(`/api/appointments/${id}`, {
				interview,
			})
			.then(
				setState({
					...state,
					appointments,
				})
			);
	};


	const cancelInterview = (id) => {
		const appointment = {
			...state.appointments[id],
			interview: null,
		};
		return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointment
        })
		});
	};

	const dailyAppointments = getAppointmentsForDay(state, state.day);
	const appt = dailyAppointments.map((appointment) => {
		const interview = getInterview(state, appointment.interview);
		const interviewers = getInterviewersForDay(state, state.day);

		return (
			<Appointment
				key={appointment.id}
				id={appointment.id}
				time={appointment.time}
				interview={interview}
				interviewers={interviewers}
				bookInterview={bookInterview}
				cancelInterview={cancelInterview}
			/>
		);
	});

	const setDay = (day) => setState({ ...state, day });

	useEffect(() => {
		const getDaysURL = axios.get(`/api/days`);
		const getAppointmentsURL = axios.get(`/api/appointments`);
		const getInterviewersURL = axios.get(`/api/interviewers`);
		const promises = [getDaysURL, getAppointmentsURL, getInterviewersURL];

		Promise.all(promises).then((all) => {
			setState((prev) => {
				const days = all[0].data;
				const appointments = all[1].data;
				const interviewers = all[2].data;
				return {
					...prev,
					days,
					appointments,
					interviewers,
				};
			});
		});
	}, []);

	return (
		<main className='layout'>
			<section className='sidebar'>
				<img
					className='sidebar--centered'
					src='images/logo.png'
					alt='Interview Scheduler'
				/>
				<hr className='sidebar__separator sidebar--centered' />
				<nav className='sidebar__menu'>
					<DayList days={state.days} value={state.day} onChange={setDay} />
				</nav>
				<img
					className='sidebar__lhl sidebar--centered'
					src='images/lhl.png'
					alt='Lighthouse Labs'
				/>
			</section>
			<section className='schedule'>
				{appt}
				<Appointment key='last' time='5pm' />
			</section>
		</main>
	);
}
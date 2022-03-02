import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});

  const setDay = (day) => setState({ ...state, day });

  const bookInterview = (id, interview) => {
		console.log(
			"bookAppointment",
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
			.then(res => {
        const days = countSpots(id, false)
				setState({
					...state,
					appointments,
          days
				})
      });
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

  const countSpots = (id, increment = true) => {
    const day = state.days.filter(day =>
      day.appointments.includes(id)
    )[0]
    increment ? (day.spots += 1) : (day.spots -= 1)

    const days = [...state.days]
    const dayIndex = day.id - 1
    days[dayIndex] = day

    return days
  }

  return { state, setState, setDay, bookInterview, cancelInterview };
};
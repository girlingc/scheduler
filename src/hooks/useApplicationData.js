import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // Sets default state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Sets state for day
  const setDay = (day) => setState({ ...state, day });

  // Updates the number on sidebar to match actual spots available
  const updateSpots = (dayValue, day, variable) => {
    let spot = day.spots;

    if (dayValue === day.name && variable === "addSpots") {
      return spot - 1;
    }
    if (dayValue === day.name && variable === "removeSpots") {
      return spot + 1;
    }
    return spot;
  };

  // Books an interview and sets new state for appointments and days
  const bookInterview = (id, interview) => {
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
      .then(() => {
        const newDays = state.days.map((day) => {
          return {
            ...day,
            spots: updateSpots(state.day, day, "addSpots"),
          };
        });
        setState({
          ...state,
          appointments,
          days: newDays,
        });
      });
  };

  // Cancels an interview and sets new state for appointments and days
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const newDays = state.days.map((day) => {
        return {
          ...day,
          spots: updateSpots(state.day, day, "removeSpots"),
        };
      });
      setState({
        ...state,
        appointments,
        days: newDays,
      });
    });
  };

  // Acquires data and sets initial load state
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

  return { state, setState, setDay, bookInterview, cancelInterview };
}

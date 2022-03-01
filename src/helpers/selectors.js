export function getAppointmentsForDay(state, day) {
	const appointmentsOfMatchedDay = state.days.filter(
		(filteredDay) => filteredDay.name === day
	)[0];

	const matchedAppointments = [];
	if (appointmentsOfMatchedDay) {
		appointmentsOfMatchedDay.appointments.map((appointment) =>
			matchedAppointments.push(state.appointments[appointment])
		);
	}
	return matchedAppointments;
};

export function getInterviewersForDay(state, day) {
	const appointmentsOfMatchedDay = state.days.filter(
		(filteredDay) => filteredDay.name === day
	)[0];

	const matchedInterviewers = [];
	if (appointmentsOfMatchedDay) {
		appointmentsOfMatchedDay.interviewers.map((interviewer) =>
			matchedInterviewers.push(state.interviewers[interviewer])
		);
	}
	return matchedInterviewers;
};

export function getInterview(state, interview) {
	if (!interview) {
		return null;
	}
	if (interview.interviewer.id) {
    return interview;
  }
	interview.interviewer = state.interviewers[interview.interviewer];
	return interview;
};

export function delayStatus(hook, newMode) {
  setTimeout(()=> hook(newMode)
  , 2000);
};
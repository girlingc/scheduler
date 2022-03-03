// Returns an array matching the appointments for that day
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
}

// Returns an array matching the interviewers for that day
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
}

// Returns an object with the interviewer data
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  if (interview.interviewer.id) {
    return interview;
  }
  interview.interviewer = state.interviewers[interview.interviewer];
  return interview;
}

export function delayStatus(hook, newMode) {
  setTimeout(() => hook(newMode), 2000);
}

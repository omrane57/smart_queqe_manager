// events.js
module.exports = Object.freeze({
  APPOINTMENT_EVENTS: {
    BOOKED: "appointment.booked",
    CANCELLED: "appointment.cancelled",
    NO_SHOW: "appointment.no_show",
  },
  DOCTOR_EVENTS: {
    UNAVAILABLE: "doctor.unavailable",
    RUNNING_LATE: "doctor.running_late",
  },
});

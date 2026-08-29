"use server";

export async function updateAppointmentStatus(_id: string, _status: string) {
  // Mock mode: no-op. Backend will be implemented in the next phase.
  console.log("[MOCK] updateAppointmentStatus called — no backend connected.");
}

export async function deleteAppointment(_id: string) {
  // Mock mode: no-op. Backend will be implemented in the next phase.
  console.log("[MOCK] deleteAppointment called — no backend connected.");
}

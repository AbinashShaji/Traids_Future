"use server";

import db from "@/lib/db";
import { getSession } from "./auth";
import { revalidatePath } from "next/cache";

export async function updateAppointmentStatus(id: string, status: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await db.appointment.update({
    where: { id },
    data: { status }
  });

  revalidatePath("/appointments");
  revalidatePath("/dashboard");
}

export async function deleteAppointment(id: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await db.appointment.delete({
    where: { id }
  });

  revalidatePath("/appointments");
  revalidatePath("/dashboard");
}

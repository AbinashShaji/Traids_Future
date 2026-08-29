"use server";

// Authentication backend removed. These are mock stubs for the CMS UI.
// The backend will be rebuilt from scratch in the next phase.

export async function login(_formData: FormData) {
  // Mock mode: no-op.
  return { error: "Authentication is not configured. Backend will be implemented in the next phase." };
}

export async function logout() {
  // Mock mode: no-op.
}

export async function getSession() {
  // Mock mode: return null (no active session).
  return null;
}

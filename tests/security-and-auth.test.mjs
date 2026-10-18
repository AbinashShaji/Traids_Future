import test from "node:test";
import assert from "node:assert/strict";

import nextConfig from "../next.config.ts";
import { login, logout, getSession } from "../src/actions/auth.ts";

test("next.config.ts: security headers are configured and properly structured", async () => {
  assert.ok(typeof nextConfig.headers === "function", "next.config.ts must define an async headers() function");
  const headersConfig = await nextConfig.headers();
  assert.ok(Array.isArray(headersConfig), "headers() must return an array");

  const catchAll = headersConfig.find((h) => h.source === "/:path*");
  assert.ok(catchAll, "Catch-all security header rule '/:path*' must exist");

  const headerMap = new Map();
  for (const item of catchAll.headers) {
    headerMap.set(item.key, item.value);
  }

  assert.equal(headerMap.get("X-Frame-Options"), "DENY");
  assert.equal(headerMap.get("X-Content-Type-Options"), "nosniff");
  assert.equal(headerMap.get("Referrer-Policy"), "strict-origin-when-cross-origin");
  assert.equal(headerMap.get("Permissions-Policy"), "camera=(), microphone=(), geolocation=()");
  assert.equal(headerMap.get("X-DNS-Prefetch-Control"), "on");
});

test("auth boundaries: login stub returns explicit unconfigured error without faking authentication", async () => {
  const dummyFormData = new FormData();
  dummyFormData.set("email", "admin@triadsfuture.com");
  dummyFormData.set("password", "SuperSecret123!");

  const response = await login(dummyFormData);
  assert.ok(response && response.error, "login must return an error object");
  assert.equal(response.error, "Authentication is not configured. Backend will be implemented in the next phase.");
});

test("auth boundaries: getSession returns null preventing unauthorized session hijacking", async () => {
  const session = await getSession();
  assert.equal(session, null, "Mock session must return null until production authentication is configured");
});

test("auth boundaries: logout executes safely as no-op", async () => {
  await assert.doesNotReject(async () => {
    await logout();
  });
});

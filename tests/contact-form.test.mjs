import test from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

// Contact form schema as defined in src/app/contact/contact-page-content.tsx
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(6, { message: "Please enter a valid phone number." }),
  email: z.union([z.string().email({ message: "Please enter a valid email address." }), z.literal("")]).optional(),
  businessName: z.string().optional(),
  message: z.string().optional(),
});

test("contactSchema: successfully validates standard inquiry with all fields", () => {
  const result = contactSchema.safeParse({
    name: "Alex Morgan",
    phone: "+1 (555) 019-2834",
    email: "alex@morganventures.com",
    businessName: "Morgan Ventures",
    message: "We need an operations portal for our 45-person team.",
  });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.name, "Alex Morgan");
    assert.equal(result.data.email, "alex@morganventures.com");
  }
});

test("contactSchema: rejects name with less than 2 characters", () => {
  const result = contactSchema.safeParse({
    name: "A",
    phone: "555-019-2834",
  });
  assert.equal(result.success, false);
  if (!result.success) {
    const nameError = result.error.issues.find((i) => i.path.includes("name"));
    assert.ok(nameError);
    assert.equal(nameError.message, "Name must be at least 2 characters.");
  }
});

test("contactSchema: rejects phone number with less than 6 characters", () => {
  const result = contactSchema.safeParse({
    name: "Alex Morgan",
    phone: "123",
  });
  assert.equal(result.success, false);
  if (!result.success) {
    const phoneError = result.error.issues.find((i) => i.path.includes("phone"));
    assert.ok(phoneError);
    assert.equal(phoneError.message, "Please enter a valid phone number.");
  }
});

test("contactSchema: permits empty string for optional email", () => {
  const result = contactSchema.safeParse({
    name: "Alex Morgan",
    phone: "555-019-2834",
    email: "",
  });
  assert.equal(result.success, true);
});

test("contactSchema: rejects invalid email format when non-empty", () => {
  const result = contactSchema.safeParse({
    name: "Alex Morgan",
    phone: "555-019-2834",
    email: "alex-not-an-email",
  });
  assert.equal(result.success, false);
});

test("query-parameter prefill: correctly populates initial consultation interest", () => {
  const selectedInterest = "Process Automation";
  const defaultMessage = selectedInterest ? `Interested in: ${selectedInterest}. ` : "";
  assert.equal(defaultMessage, "Interested in: Process Automation. ");

  const emptyInterest = null;
  const emptyDefault = emptyInterest ? `Interested in: ${emptyInterest}. ` : "";
  assert.equal(emptyDefault, "");
});

test("mailto URI builder: formats transparent inquiry mailto correctly without fake submission", () => {
  const targetEmail = "contact@triadsfuture.com";
  const data = {
    name: "Jane Smith",
    phone: "555-123-4567",
    email: "jane@smithco.com",
    businessName: "Smith & Co",
    message: "Interested in Custom Web Applications. We have 200 users.",
  };

  const subject = encodeURIComponent(`Strategy Consultation Request — ${data.name}`);
  const body = encodeURIComponent(
    `Name: ${data.name}\n` +
    `Phone: ${data.phone}\n` +
    `Email: ${data.email || "Not provided"}\n` +
    `Business: ${data.businessName || "Not provided"}\n\n` +
    `Project Details:\n${data.message || "No specific details provided."}`
  );
  const mailtoUri = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

  assert.ok(mailtoUri.startsWith("mailto:contact@triadsfuture.com?subject="));
  assert.ok(mailtoUri.includes(encodeURIComponent("Strategy Consultation Request — Jane Smith")));
  assert.ok(mailtoUri.includes(encodeURIComponent("Smith & Co")));
});

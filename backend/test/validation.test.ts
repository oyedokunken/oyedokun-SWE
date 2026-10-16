import { describe, expect, it } from "vitest";
import { contactSchema } from "../src/validation";

const validContact = {
  name: "Ada Lovelace",
  email: "  Ada@Example.com ",
  subject: "Project enquiry",
  message: "I'd like to talk about a backend project.",
};

describe("contactSchema", () => {
  it("accepts a valid message and normalises the email", () => {
    const parsed = contactSchema.parse(validContact);
    expect(parsed.email).toBe("ada@example.com");
    expect(parsed.name).toBe("Ada Lovelace");
  });

  it("trims fields before checking length", () => {
    const result = contactSchema.safeParse({ ...validContact, name: "   A   " });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe("Name too short");
  });

  it.each([
    ["email", "not-an-email", "Invalid email"],
    ["subject", "Hi", "Subject too short"],
    ["message", "Too short", "Message too short"],
    ["message", "x".repeat(5001), "Message too long"],
    ["phone", "1".repeat(31), "Phone too long"],
  ])("rejects an invalid %s", (field, value, error) => {
    const result = contactSchema.safeParse({ ...validContact, [field]: value });
    expect(result.success).toBe(false);
    expect(result.error?.errors[0].message).toBe(error);
  });

  it("rejects a missing required field", () => {
    const { subject: _subject, ...rest } = validContact;
    expect(contactSchema.safeParse(rest).success).toBe(false);
  });
});


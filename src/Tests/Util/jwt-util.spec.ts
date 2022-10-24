import { it, expect, describe, vi, beforeEach, afterEach } from "vitest";
import { getEnv } from "../../Config";
import { generateToken } from "../../Utils/jwt-util";

beforeEach(() => {
  process.env.JWT_SECRET = "something"; // Make a copy
});
afterEach(() => {
  vi.resetModules();
});

const body = { email: "some@mail" };

describe("generateToken()", () => {
  it("should return a token string", async () => {
    const expiry = "5d";
    const token = await generateToken(body, expiry);
    expect(token).toBeTypeOf("string");
  });

  it("should not throw if no expiry time is provided", async () => {
    const token = await generateToken(body, "");
    expect(token).toBeTypeOf("string");
  });
});

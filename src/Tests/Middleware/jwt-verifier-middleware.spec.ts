import { NextFunction, Request, Response } from "express";
import { it, expect, describe, beforeEach, vi, afterEach } from "vitest";
import { isAuth } from "../../Middleware";
import { generateToken } from "../../Utils/jwt-util";
import { RequestError } from "../../Utils/request-error";

let mockRequest = { headers: {} } as Request;
let mockResponse = {} as Response;
let mockNextFunction = () => {};

beforeEach(() => {
  process.env.JWT_SECRET = "some_secret";
  mockRequest = { body: {}, headers: {} } as Request;
  mockResponse = {} as Response;
  mockNextFunction = () => {};
});

afterEach(() => {
  vi.resetModules();
});

describe("isAuth()", () => {
  it("should set the request body with the decoded tokenised data", async () => {
    const body = { email: "some@email" };
    const token = (await generateToken(body)) as string;

    mockRequest.headers.authorization = `Bearer ${token}`;

    isAuth(mockRequest, mockResponse, mockNextFunction);

    expect(mockRequest.body.user.email).toEqual(body.email);
  });

  it("should throw Request Error if no authorised header is provided", () => {
    const fn = () => isAuth(mockRequest, mockResponse, mockNextFunction);
    let err: RequestError;
    try {
      isAuth(mockRequest, mockResponse, mockNextFunction);
    } catch (error) {
      err = error as RequestError;
    }

    expect(fn).toThrowError(RequestError);
    expect(err!.statusCode).toBe(401);
  });

  it("should throw unauthorized error for a invalid token", () => {
    mockRequest.headers.authorization = "some token";
    const fn = () => isAuth(mockRequest, mockResponse, mockNextFunction);
    let err: RequestError;
    try {
      isAuth(mockRequest, mockResponse, mockNextFunction);
    } catch (error) {
      err = error as RequestError;
    }

    expect(fn).toThrowError(RequestError);
    expect(err!.statusCode).toBe(401);
  });

  it("should call next function", async () => {
    const body = { email: "some@email" };
    const token = (await generateToken(body)) as string;

    mockRequest.headers.authorization = `Bearer ${token}`;

    const fn = vi.fn();

    isAuth(mockRequest, mockResponse, fn as NextFunction);

    expect(fn).toBeCalled();
  });
});

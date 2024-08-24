export const AUTHENTICATION_ERROR_MESSAGE = "You must be logged in to view this content";

export const AuthenticationError = class AuthenticationError extends Error {
  constructor() {
    super(AUTHENTICATION_ERROR_MESSAGE);
    this.name = "AuthenticationError";
  }
};

export const NotFoundError = class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
};
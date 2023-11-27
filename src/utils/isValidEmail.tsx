/**
 * Validate the customer's email.
 * We use a simple validation regex here and rely on a confirmation email for more robust validation.
 */
export const isValidEmail = (str: string) => /^\S+@\S+\.\S+$/.test(str)

export class InputValidator {
  static validatePassword(password: string) : boolean {
    return password.length > 5;
  }

  static validateEmail(email: string) : boolean {
    const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  static validateName(name: string) : boolean {
    return name.length > 0 && name.length < 255;
  }

  static validatePhone(phone: string) : boolean {
    const phoneNumberPattern: RegExp = /^[\+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/;
    return phoneNumberPattern.test(phone);
  }
}

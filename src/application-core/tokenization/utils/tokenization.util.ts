import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/index';
import { CreateCardDTO } from 'src/infrastructure/persistence/dto/card.dto';

@Injectable()
export class TokenizationUtil {
  constructor(private readonly jwtService: JwtService) {}

  validationCard = (card: CreateCardDTO): string[] => {
    const { card_number, cvv, expiration_month, expiration_year, email } = card;
    const responseError: string[] = [];
    if (!this.isValidCardNumber(card_number)) {
      responseError.push('Invalid card number');
    }
    if (!this.isValidCvv(cvv)) {
      responseError.push('Invalid cvv');
    }
    if (!this.isValidExpirationMonth(expiration_month)) {
      responseError.push('Invalid expiration month');
    }
    if (!this.isValidExpirationYear(expiration_year)) {
      responseError.push('Invalid expiration year');
    }
    if (!this.isValidEmail(email)) {
      responseError.push('Invalid email');
    }

    return responseError;
  };

  private isValidEmail = (email: string): boolean => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  private isValidCardNumber = (cardNumber: number): boolean => {
    const cardStr = cardNumber.toString();
    if (cardStr.length < 13 || cardStr.length > 16) return false;

    return this.luhnAlgorithm(cardStr);
  };

  private isValidCvv = (cvv: number): boolean => {
    const cvvStr = cvv.toString();
    return cvvStr.length >= 3 && cvvStr.length <= 4;
  };

  private isValidExpirationMonth = (expiration_month: string): boolean => {
    if (expiration_month.length < 1 || expiration_month.length > 2)
      return false;
    const month = parseInt(expiration_month);

    return month >= 1 || month <= 12;
  };

  private isValidExpirationYear = (expiration_year: string): boolean => {
    const year = parseInt(expiration_year);
    if (expiration_year.length !== 4) return false;
    const yearNow = new Date().getFullYear();
    return year <= yearNow + 5;
  };

  private luhnAlgorithm = (cardNumber: string): boolean => {
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));
      if (shouldDouble) {
        if ((digit *= 2) > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 == 0;
  };

  getJwtToken = (payload: JwtPayload): string => {
    const token = this.jwtService.sign(payload, { expiresIn: '60s' });
    return token;
  };

  verifyJwtToken = (token: string): JwtPayload => {
    const payload = this.jwtService.verify(token);
    return payload;
  };
}

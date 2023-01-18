export class ResponseDTO {
  constructor(
    public readonly data?: any,
    public readonly error?: any,
    public readonly message?: string,
  ) {}
}

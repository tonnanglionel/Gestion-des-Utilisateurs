export interface ILoginData {
  username?: string;
  password?: string;
}

export class LoginData implements ILoginData {
  constructor(
    public username?: string,
    public password?: string
  ) { }
}

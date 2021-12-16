export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  photoUrl: string;
  description?: string;
}

export class RegisterDTO implements Partial<IUser> {
  firstName!: string;
  lastName!: string;
  email!: string;
  password?: string;
}

export class LoginDTO implements Partial<IUser> {
  email!: string;
  password!: string;
}

export interface IAuthentication {
  accessToken: string;
  idToken: string;
}

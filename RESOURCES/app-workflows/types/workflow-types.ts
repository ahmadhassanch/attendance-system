import { ApiClient } from '../lib/api-client';
import { LoginData } from './login-data';

export class AppUser {
  userName: string;
  mobile: string;
  password: string;
  loginData: LoginData;

  constructor(userName: string, mobile: string, password: string) {
    this.userName = userName;
    this.mobile = mobile;
    this.password = password;
    App.addUser(this);
  }

  get patientId() {
    return this.loginData.profile.patientId;
  }

  get employeeId() {
    return this.loginData.profile.employeeId;
  }

  get userId() {
    return this.loginData.profile.userId;
  }

  setActive() {
    if (this.loginData === undefined) {
      console.log(`========== User:${this.userName} not logged in`);
      process.exit(0);
    } else {
      ApiClient.token = this.loginData.auth_token;
    }
  }

  async login() {
    this.loginData = await ApiClient.login(this.mobile, this.password);
  }
}

export class App {
  public static users: { [key: string]: AppUser } = {};
  public static perferences: { [key: string]: any } = {};

  static helloWorld() {
    console.log('Hello');
  }

  static addUser(user: AppUser) {
    App.users[user.userName] = user;
  }

  static getUser(userName: string): AppUser {
    return App.users[userName];
  }

  static setActive(userName: string) {
    App.users[userName].setActive();
  }

  static getPatientId(userName: string): string {
    return App.users[userName].patientId;
  }

  static getEmployeeId(userName: string): string {
    return App.users[userName].employeeId;
  }

  static getUserId(userName: string): string {
    return App.users[userName].userId;
  }
}

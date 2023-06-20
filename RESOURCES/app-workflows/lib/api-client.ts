import axios, { AxiosResponse } from 'axios';
import { LoginData } from '../types/login-data';

(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

export class ApiClient {
  public static token: string | null = null;
  private static baseURL: string | undefined = 'http://localhost:3000/rms/v1';

  private constructor() {
    // private constructor to prevent external instantiation
  }

  public static create(): void {
    ApiClient.baseURL = ApiClient.baseURL;
  }

  public static async login(
    mobile: string,
    password: string,
  ): Promise<LoginData> {
    try {
      const response = await axios.post(
        `${ApiClient.baseURL}/auth/login`,
        {
          mobile,
          password,
          // enc_password: '9789KqX7LEoQgbHe/HSiqQ==.I9KhRQF1lFypGalmMsYbjg==',
          fcmToken: 'FCM --- string',
          // deviceId: 'Sarfraz Device',
        },
        {
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        },
      );
      // console.log(response);
      ApiClient.token = response.data['auth_token'];
      // console.log(ApiClient.token);
      return response.data;
    } catch (error) {
      console.error('Error while logging in:');
      console.log('===========login error start ====');
      console.dir(error.response.data, { depth: Infinity });
      console.log('====login error end ======');
      throw error;
    }
  }

  public static async get<T>(
    url: string,
    params: { [key: string]: any },
  ): Promise<T> {
    const fullUrl = `${ApiClient.baseURL}${url}`;
    console.log('GET:', url);
    // process.exit();
    try {
      const response = await axios.get<T>(fullUrl, {
        params: params,
        headers: { Authorization: `${ApiClient.token}` },
      });
      return response.data;
    } catch (error) {
      // console.error('Error while making GET request:', error);
      console.log('===========login error start ====');
      console.dir(error.response.data, { depth: Infinity });
      console.log('====login error end ======');

      throw error;
    }
  }

  public static async post<Rq, Rs>(url: string, data: Rq): Promise<Rs> {
    const fullUrl = `${ApiClient.baseURL}${url}`;
    console.log('POST:', url);
    // console.log(this.token);
    try {
      const response = await axios.post<Rq, AxiosResponse<Rs>>(fullUrl, data, {
        headers: { Authorization: `${ApiClient.token}` },
        maxContentLength: 100000000,
        maxBodyLength: 100000000,
      });
      return response.data;
    } catch (error: any) {
      // console.error(
      //   'Error while making POST request:' + url,
      //   error.response.data.statusCode,
      //   error.response.data.message,
      // );

      console.log('===========post error start ====');
      console.log('POST:', url);
      console.dir(error.response.data, { depth: Infinity });
      console.log('====post error end ======');

      process.exit();
    }
  }

  public static async patch<T>(url: string, data: unknown): Promise<T> {
    const fullUrl = `${ApiClient.baseURL}${url}`;
    console.log('PATCH:', url);
    try {
      const response = await axios.patch<T>(fullUrl, data, {
        headers: { Authorization: `${ApiClient.token}` },
      });
      return response.data;
    } catch (error: any) {
      console.error(
        'Error while making PATCH request:',
        error.response.data.statusCode,
        error.response.data.message,
      );
      process.exit();
    }
  }

  public static async delete<T>(url: string): Promise<T> {
    const fullUrl = `${ApiClient.baseURL}${url}`;
    console.log('PATCH:', url);
    try {
      const response = await axios.delete<T>(fullUrl, {
        headers: { Authorization: `${ApiClient.token}` },
      });
      return response.data;
    } catch (error: any) {
      console.error(
        'Error while making PATCH request:',
        error.response.data.statusCode,
        error.response.data.message,
      );
      process.exit();
    }
  }
}

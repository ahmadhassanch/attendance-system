import { HttpService } from '@nestjs/axios';
import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { Observable, firstValueFrom, lastValueFrom, map } from 'rxjs';
import { EnvironmentVars } from './common.types';

@Injectable()
export class CommonService {
  notificationUrl = this.configService.getOrThrow(
    EnvironmentVars.NOTIFICATION_SERVER_URL,
  );

  CALL_SERVER_URL = this.configService.getOrThrow(
    EnvironmentVars.CALL_SERVER_URL,
  );

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getExternalApi<T>(url: string) {
    console.log('getExternalApi @' + url);
    const data = (await firstValueFrom(this.httpService.get<T>(url))).data;
    return data;
  }

  async postExternalApi<Rq, Rs>(url: string, data: Rq) {
    console.log('postExternalApi @' + url);
    const res = (await firstValueFrom(this.httpService.post<Rs>(url, data)))
      .data;
    return res;
  }

  async getCallApi(requestUrl: string, queryParams = {}) {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: queryParams,
    };

    const url: string = requestUrl;

    const responseData = await lastValueFrom(
      this.httpService.get(url, requestConfig).pipe(
        map((response) => {
          return response.data;
        }),
      ),
    );

    return responseData;
  }

  async postCallApi<Rq, Rs>(
    requestUrl: string,
    data: Rq,
    queryParams = {},
    headers: AxiosRequestHeaders = {},
  ) {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      params: queryParams,
    };

    const url: string = requestUrl;

    try {
      const responseData: Rs = await lastValueFrom(
        this.httpService.post(url, data, requestConfig).pipe(
          map((response) => {
            return response.data;
          }),
        ),
      );
      return responseData;
    } catch (error) {
      console.error(error);
      console.error(error.message, error.code);
      throw new InternalServerErrorException(
        'EXTERNAL API call failed. Databases may be out of sync, or request body may be malformed. THIS ERROR SHOULD NOT BE SHOWING IN PRODUCTION',
      );
    }
  }

  async postNotificationServer<Rq, Rs>(reqPath: string, data: Rq) {
    if (
      this.configService.get<number>(EnvironmentVars.SEND_NOTIFICATIONS) != 1
    ) {
      return null;
    }

    console.log(data);
    try {
      return await this.postCallApi<Rq, Rs>(
        this.notificationUrl + reqPath,
        data,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not send notification! See error logs for more info',
      );
    }
  }

  async postCallServer<Rq, Rs>(reqPath: string, data: Rq, host: string) {
    if (this.configService.get<number>(EnvironmentVars.SEND_CALL_DATA) != 1) {
      return null;
    }

    console.log(data);
    try {
      return await this.postCallApi<Rq, Rs>(
        this.CALL_SERVER_URL + reqPath,
        data,
        {},
        { PublicHost: host },
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not get data from call server! See error logs for more info',
      );
    }
  }
}

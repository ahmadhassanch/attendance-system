import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotImplementedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommonService } from 'src/common/common.service';
import { EnvironmentVars } from 'src/common/common.types';
import * as twilio from 'twilio';

export type Masking = 'eclinic' | 'bizsms' | 'twilio';

@Injectable()
export class SmsService {
  private client: twilio.Twilio;
  constructor(
    private readonly commonService: CommonService,
    private readonly configService: ConfigService,
  ) {
    this.client = twilio(
      this.configService.get<string>(EnvironmentVars.TWILIO_ACCOUNT_SID),
      this.configService.get<string>(EnvironmentVars.TWILIO_AUTH_TOKEN),
    );
  }

  private async sendUsingBizsms(mobile: string, content: string) {
    const info = {
      username: 'coghealth@bizsms.pk',
      pass: 'c9gnt1v3',
      text: content, //'hello test sms',
      destinationnum: mobile,
    };

    console.log('Sending SMS! bizsms');
    const smsResponse = await this.commonService.getExternalApi<string>(
      `http://api.bizsms.pk/api-send-branded-sms.aspx?username=${info.username}&pass=${info.pass}&text=${info.text}&masking=CHI%20CHARMS&destinationnum=${info.destinationnum}&language=English`,
    );

    const regex = /lblmessage(">)?((\w|\s)*)/;
    const match = smsResponse.match(regex)?.[0];
    const resp = match?.replace('lblmessage">', '') ?? undefined;

    if (resp !== 'SMS Sent Successfully') {
      throw new InternalServerErrorException(resp);
    }

    console.log('Sms sent', content, 'bizsms', mobile);
    console.log(resp);
    return resp;
  }

  private async sendUsingEclinic(mobile: string, content: string) {
    const url = 'https://cbs.zong.com.pk/reachrestapi/home/SendQuickSMS';

    const payload = {
      loginId: this.configService.getOrThrow<string>(
        EnvironmentVars.SMS_LOGIN_ID,
      ),
      loginPassword: this.configService.getOrThrow<string>(
        EnvironmentVars.SMS_PASSWORD,
      ),
      Destination: mobile,
      Mask: 'E-Clinic',
      Message: content,
      UniCode: '0',
      ShortCodePrefered: 'n',
    };

    const smsResponse: string = await this.commonService.postExternalApi(
      url,
      payload,
    );
    const resp = smsResponse.split('|')[1];
    console.log(smsResponse, resp);

    if (resp !== 'success') {
      throw new InternalServerErrorException(resp);
    }

    return resp;
  }

  private async sendUsingTwilio(mobile: string, content: string) {
    await this.client.messages.create({
      body: content,
      to: '+' + mobile,
      from: this.configService.get<string>(EnvironmentVars.TWILIO_PHONE_NUMBER),
    });
  }

  private async sendSms(mobile: string, content: string, masking: Masking) {
    if (this.configService.get<string>(EnvironmentVars.SMS_ENABLED) != '1') {
      console.log('Sms disabled', content, masking, mobile);
      return;
    }

    try {
      if (masking === 'bizsms') {
        return await this.sendUsingBizsms(mobile, content);
      } else if (masking === 'eclinic') {
        return await this.sendUsingEclinic(mobile, content);
      } else if (masking === 'twilio') {
        return await this.sendUsingTwilio(mobile, content);
      } else {
        throw new NotImplementedException(
          `"${masking}" masking is not supported!`,
        );
      }
    } catch (err) {
      if (err instanceof NotImplementedException) {
        throw err;
      } else {
        console.error(err);
        throw new BadRequestException(
          'Unable to send SMS. ' + (err.message ?? ''),
        );
      }
    }
  }

  async sendAccountVerificationCode(
    mobile: string,
    verificationCode: string,
    masking: Masking,
    appSignature?: string,
  ) {
    const message = `Account verification code: ${verificationCode}${
      appSignature ? '\n' + appSignature : ''
    }`;
    return await this.sendSms(mobile, message, masking);
  }

  async sendForgotPasswordCode(
    mobile: string,
    verificationCode: string,
    masking: Masking,
    appSignature?: string,
  ) {
    const message = `Forgot password: ${verificationCode}${
      appSignature ? '\n' + appSignature : ''
    }`;
    return await this.sendSms(mobile, message, masking);
  }

  async sendResetPasswordMsg(
    mobile: string,
    fullName: string,
    masking: Masking,
  ) {
    const message = `Password reset complete`;
    return await this.sendSms(mobile, message, masking);
  }
}

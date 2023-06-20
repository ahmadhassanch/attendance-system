import { ApiClient } from '../lib/api-client';

export async function login() {
  ApiClient.create();
  const req = {
    mobile: '090078601',
    password: 'Testing@1',
  };
  let data: { [key: string]: any };
  await ApiClient.login(req.mobile, req.password);
}

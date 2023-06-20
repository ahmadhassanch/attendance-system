// import axios from 'axios';

// export async function post(url: string, req: { [key: string]: any }) {
//   try {
//     const response = await axios.post(url, req);
//     return response.data;
//   } catch (error) {
//     console.error(`Error calling API: ${error}`);
//     console.log('URL:', url);
//     console.log('request:', req);
//     // process.exit();
//   }
// }
// // req: { [key: string]: any },
// export async function get(url: string, token: string) {
//   try {
//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `${token}`,
//       },
//     });
//     // console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error(`Error calling API: ${error}`);
//     console.log('URL:', url);
//     console.log('request:');
//     console.error(`Error calling API: ${error}`);
//   }
// }
//======================================================
// loginResp = response.json();

//     token = loginResp['data']['Token'];

//     response = requests.get(baseURL + '/patient', (headers = { Authorization: token }));
//     print(response.json());
//     path = '';
//     name = 'Patients';
//     apiArray = [];

//     writeModel(name, token, path, req, response.json());

//     response = requests.get(baseURL + '/user', (headers = { Authorization: token }));

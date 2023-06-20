import * as readline from 'readline/promises';
export const cin = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// export let input = rl.question;
// export { input };

export function startLine() {
  console.log('=======================================start');
}

export async function input(prompt: string) {
  let answer = await cin.question(prompt);
  console.log('=======================================end');
  return answer;
}

// export async function input(prompt: string) {
//   console.log(prompt);
//   return 'answer';
// }

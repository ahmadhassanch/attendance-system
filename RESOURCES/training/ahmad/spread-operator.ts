function main() {
  let student = { name: 'Abdul', age: 25, city: 'Multan' };

  let { name, ...otherInfo } = student;

  console.log(student);
  console.log(name);
  console.log(otherInfo);

  let newStudent = { name: 'Clone of Abdul', ...otherInfo };
  console.log(newStudent);
}

main();

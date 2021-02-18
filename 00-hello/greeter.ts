interface Person {
  firstName: string;
  lastName: string;
}

class Student {
  fullName: string;

  constructor (public firstName, public middleInitial, public lastName) {
    this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
  }
}

// function greeter (person: string) {
//   return `Hello, ${ person }`;
// }

function greeter (person: Person) {
  return `Hello, ${ person.firstName } ${ person.lastName }`;
}

// let user = 'Jane User';

// let user = [ 0, 1, 2 ];

// let user = {
//   firstName: 'Jane',
//   lastName: 'User'
// };

let user = new Student('Jane', 'M.', 'User');
console.log(user);
document.body.innerHTML = greeter(user);

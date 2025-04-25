export interface User {
  email: string;
  password: string;
  username: string;
}

export const dummyUsers: User[] = [
  {
    email: "test@example.com",
    password: "password123",
    username: "demoUser",
  },
];

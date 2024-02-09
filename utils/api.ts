import axios from "axios";

type User = {
  name: string;
  email: string;
  image: string;
};

export async function checkUser(email: string) {
  let userExists = false;

  await axios
    .get(`https://paguei-back-end.onrender.com/users/user/${email}`)
    .then(function (response) {
      const result = response.data.result;
      userExists = result ? true : false;
    })
    .catch(function (error) {
      console.error("Error", error.message);
    });

  return userExists;
}

export async function Registration(user: User) {
  let tokenAcess = "";

  await axios
  .post("https://paguei-back-end.onrender.com/auth/register", user)
  .then(function (response) {
    tokenAcess = response.data.result.token;
  })
  .catch(function (error) {
    console.error("Registration error", error.message);
  });

  return tokenAcess;
}

export async function Login(user: User) {
  let tokenAcess = "";

  await axios
    .post("https://paguei-back-end.onrender.com/auth/login", user)
    .then(function (response) {
      tokenAcess = response.data.result.token;
    })
    .catch(function (error) {
      console.error("Login error", error.message);
    });

  return tokenAcess;
}
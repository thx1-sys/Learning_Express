import DBLocal from "db-local";
const { Shema } = new DBLocal();
{
  path: "./db";
}

const User = Shema("user", {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export class UserRepository {
  static create({ username, password }) {
    if (typeof username !== "string")
      throw new Error("username must be a string");

    if (username.length < 4)
      throw new Error("username must be at least 4 characters");

    if (typeof password !== "string")
      throw new Error("password must be a string");

    if (password.length < 4)
      throw new Error("password must be at least 4 characters");

    const user = User.findOne({ username });
  }
}

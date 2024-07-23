import { Request, Response } from "express";
import { IUser } from "../types/users";
import fs from "fs";

export const getUsers = (req: Request, res: Response) => {
  const users: IUser[] = JSON.parse(
    fs.readFileSync("./src/data/users.json", "utf-8")
  );
  res.status(200).send({
    status: "ok",
    users,
  });
};
export const getUserId = (req: Request, res: Response) => {
  const users: IUser[] = JSON.parse(
    fs.readFileSync("./src/data/users.json", "utf-8")
  );
  // console.log(req.params);
  const data = users.find((item) => item.id == parseInt(req.params.id));
  if (!data) {
    res.status(400).send({
      status: "error",
      message: "user not found",
    });
  }
  res.status(200).send({
    status: "ok",
    user: data,
  });
};

export const createUser = (req: Request, res: Response) => {
  const users: IUser[] = JSON.parse(
    fs.readFileSync("./src/data/users.json", "utf-8")
  );
  console.log(req.body);
  const id = Math.max(...users.map((item) => item.id)) + 1;
  const newUser = {
    id,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  users.push(newUser);
  console.log(users);

  fs.writeFileSync("./src/data/users.json", JSON.stringify(users), "utf-8");

  res.status(201).send({
    status: "ok",
    msg: "user created",
  });
};

export const deleteUser = (req: Request, res: Response) => {
  const users: IUser[] = JSON.parse(
    fs.readFileSync("./src/data/users.json", "utf-8")
  );
  const { id } = req.params;
  const idx = users.find((item) => item.id == parseInt(id));
  if (idx) {
    const del: IUser[] = users.filter((item) => item.id != idx.id);
    fs.writeFileSync("./src/data/users.json", JSON.stringify(del), "utf-8");

    res.status(201).send({
      status: "oke",
      msg: "user deleted",
    });
  } else {
    res.status(201).send({
      status: "not oke",
      msg: "user not found",
    });
  }
};

export const editUser = (req: Request, res: Response) => {
  const users: IUser[] = JSON.parse(
    fs.readFileSync("./src/data/users.json", "utf-8")
  );
  const idx = users.findIndex((item) => item.id == parseInt(req.params.id));
  users[idx] = { ...users[idx], ...req.body };

  if (idx < 0) {
    res.status(400).send({
      status: "Error !",
      message: "User Not Found",
    });
  }

  fs.writeFileSync("./src/data/users.json", JSON.stringify(users), "utf-8");
  res.status(200).send({
    status: "OKE",
    message: "User Edited",
  });
};

// export const editUserAll = (req: Request, res: Response) => {
//   const users: IUser[] = JSON.parse(
//     fs.readFileSync("./src/data/user.json", "utf-8")
//   );

//   const idx = users.findIndex((item) => item.id == parseInt(req.params.id));

//   const newUser: IUser = { id: users[idx].id, ...req.body };
//   if (!newUser.name || !newUser.age) {
//     res.status(400).send({
//       status: "error",
//       message: "user must have name and age",
//     });
//   } else {
//     users[idx] = newUser;
//     fs.writeFileSync("./src/data/user.json", JSON.stringify(users), "utf-8");
//     console.log(newUser);

//     if (idx < 0) {
//       res.status(404).send({
//         status: "error",
//       });
//     }

//     res.status(200).send({
//       status: "Success",
//       message: "User All Edited",
//     });
//   }
// };

export const loginUser = (req: Request, res: Response) => {
  const users: IUser[] = JSON.parse(
    fs.readFileSync("./src/data/users.json", "utf-8")
  );
  const user = users.find((item) => item.email == req.body.email);
  if (!user) {
    return res.status(400).send({
      status: "ERROR",
      msg: "user not found",
    });
  }
  if (user.password !== req.body.password) {
    return res.status(400).send({
      status: "ERROR",
      msg: "Incorrect Password",
    });
  }
  res.status(200).send({
    status: "OK",
    msg: "login success",
    user,
  });
};

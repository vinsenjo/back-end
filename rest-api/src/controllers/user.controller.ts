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
    name: req.body.name,
    age: req.body.age,
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

// export const editUser = (req:Request,res:Response)=>{
//   const users: IUser[] = JSON.parse(
//     fs.readFileSync("./src/data/users.json", "utf-8")
//   );
//   const { id } = req.params;
//   const idx = users.find((item) => item.id == parseInt(id));
//   const edit = 
// }

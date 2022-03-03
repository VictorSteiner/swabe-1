import { compare, hash } from "bcrypt";
import { Request, RequestHandler, Response } from "express";
import { send } from "process";
import { DecodedToken, generateToken } from "../authentication/token";
import { UserModel } from "../models/user";

export const login = async (req: Request, res: Response) => {
  let { mail, psw } = req.body;
  UserModel.findOne({ mail })
    .exec()
    .then(async (value) => {
      try {
        if (!(await compare(psw, value.psw.toString()))) {
          throw new Error();
        }
        const user: DecodedToken = {
          _id: value.id,
          mail: value.mail,
          name: value.name,
          role: value.role,
        };
        const token = generateToken(user);
        res.status(200).json({ token });
      } catch (error) {
        res.status(401).json(error);
      }
    });
};

export const getUsers: RequestHandler = (req, res) => {
  UserModel.find()
    .exec()
    .then((value) => {
      res.status(200).json({ ids: value.map(({ _id }) => _id) });
    })
    .catch((reason) => {
      res.status(400).json(reason);
    });
};

export const getUserById: RequestHandler = (req, res) => {
  const { uid } = req.params;
  console.log("id", uid);
  UserModel.findById(uid)
    .exec()
    .then((value) => {
      res.status(200).json({
        _id: value.id,
        mail: value.mail,
        name: value.name,
        role: value.role,
      });
    })
    .catch((reason) => {
      res.status(400).json(reason);
    });
};

export const createUser: RequestHandler = async (req, res) => {
  let user = req.body;
  user.psw = await hash(req.body.psw, 12);
  UserModel.create(user, (error, result) => {
    if (error) {
      res.sendStatus(400).json({ ...error });
    } else {
      res.status(201).json({ _id: result.id });
    }
  });
};

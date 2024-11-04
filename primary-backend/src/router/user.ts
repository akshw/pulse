import { Router, Request, Response } from "express";
import { SignUpSchema, SignInSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
import { authmiddleware } from "../middleware";

const router = Router();

//@ts-ignore
router.post("/signup", async (req, res) => {
  const body = req.body;
  const parsedData = SignUpSchema.safeParse(body);
  if (!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const userExists = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
    },
  });

  if (userExists) {
    return res.status(403).json({
      message: "user already exists",
    });
  } else {
    await prismaClient.user.create({
      data: {
        username: parsedData.data.username,
        email: parsedData.data.email,
        password: parsedData.data.password,
      },
    });
  }

  console.log("signup");

  //await sendemail()

  return res.json({
    msg: "Please verify",
  });
});

//@ts-ignore
router.post("/signin", async (req, res) => {
  const body = req.body;
  const parsedData = SignInSchema.safeParse(body);
  if (!parsedData.success) {
    return res.status(411).json({
      message: "incorrect inputs",
    });
  }

  const userExists = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.email,
    },
  });

  if (!userExists) {
    return res.status(411).json({
      message: "user not found",
    });
  } else {
    const token = jwt.sign(
      {
        id: userExists.id,
      },
      JWT_PASSWORD
    );
    res.json({
      token,
    });
  }
});

//@ts-ignore
router.get("/user", authmiddleware, async (req, res) => {
  //@ts-ignore
  const id = req.id;
  const user = await prismaClient.user.findFirst({
    where: {
      id,
    },
    select: {
      username: true,
      email: true,
    },
  });
  return res.json({
    user,
  });
});

export const userRouter = router;

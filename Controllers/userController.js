import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SecretKey = process.env.JWT_SECRET;



const allusers = async (req, res) => {
  const data = await prisma.user.findMany();
  if (!data) {
    return res.status(400).send({
      message: "data not fond ofuser",
    });
  }
  console.log(req.user);
  res.status(200).send({ data });
};

//Register Route
const registerController = async (req, res) => {
  try {
    const { name, lastname, email, type, password } = req.body;
    //validation
    if (!name || !lastname || !email || !type || !password) {
      return res.status(500).send({
        message: "please provide all Fields",
      });
    }
    //password hash
    const hashpassword = await bcrypt.hash(password, 10);

    //check user
    const existing = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existing) {
      return res.status(500).send({
        message: " Email is already Registerd Please Loging",
      });
    }

    //create new user

    const user = await prisma.user.create({
      data: { name, lastname, email, type, password: hashpassword },
    });

    res.status(201).render(
      "register",
      //   {
      //   message: "Registerd User",
      // }

      {
        success: "User registered successfully!",
        error: null,
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "register controller and the regiuster route NOT WORKING",
      err: err,
    });
  }
};

//Login logic
const loginController = async (req, res) => {
  // console.log(req.body);
  try {
    const { us_id, email, password, type } = req.body;

    //validiation
    if (!email || !password) {
      return res.status(500).send({
        message: "Please Provide Email , Password",
      });
    }

    //check user
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      return res.status(404).send({
        message: "User Not",
      });
    }

    // hashpassword compaire
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        message: "password not matched PASSWORD MISMATCHED !!",
      });
    }

    //token
    const token = jwt.sign(
      { email: user.email, type: user.type, us_id: us_id },
      SecretKey,
      {
        expiresIn: "1h",
      }
    );
    console.log(token);
    // res.status(200).send({
    //   message: "Login Done",
    //   token,
    //   user,
    // });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,       //use false for localhost
    maxAge: 3600000,
  });

    res.render("login", { success: "Login successful!", error: null });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "login api error is their",
      error,
    });
  }
};

//
const userbydataid = async (req, res) => {
  try {
    // find user
    const data = await prisma.user.findUnique({
      // where: { id: Number(req.user.us_id) },
      where: { email: req.user.email },
    });

    if (!data) {
      return res.status(404).send({
        message: "user not found",
      });
    }

    res.status(200).send({
      message: "user get data ",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500),
      send({
        message: "error is get user API ",
        error,
      });
  }
};

const updateuser = async (req, res) => {
  try {
    // console.log("he");
    //find user
    // const userdata = await prisma.user.findUnique({
    //   where: { email: req.user.email },
    // });

    // if(!userdata){
    //   return res.status(404).send({  message :"user not found" })
    // }

    const { name, lastname, email, type, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({ message: "data not found" });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const data = await prisma.user.update({
      data: { name, lastname, email, type, password: hashpassword },
      where: { email: req.user.email },
    });

    if (!data) {
      return res.status(404).send({ message: "user data not updated " });
    }

    res.status(200).send({
      message: "User Updated",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error is get user API ",
      error,
    });
  }
};

const deleteuser = async (req, res) => {
  try {
    const email = req.user.email;
    const datauserdelete = await prisma.user.delete({
      where: { email: email },
    });
    if (!datauserdelete) {
      return res.status(400).send({
        message: "data not deletedfor id",
      });
    }

    res.status(200).send({
      message: "user deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in delete UserAPI",
    });
  }
};

export {
  allusers,
  registerController,
  loginController,
  userbydataid,
  updateuser,
  deleteuser,
};

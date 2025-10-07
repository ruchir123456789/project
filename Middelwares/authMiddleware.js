import jwt from "jsonwebtoken";
const SecretKey = process.env.JWT_SECRET;

const authuser = async (req, res, next) => {
  try {
    //get token
    // const token = req.headers["authorization"].split(" ")[1];
    const token = req.cookies.token;
<<<<<<< Updated upstream
if(!token){
  return res.status(400).send({
    message : "tocken nottheir"
  })
}

    jwt.verify(token, SecretKey, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unautherised User",
        });
      } else {
        req.user = decoded;
        req.user.email = decoded.email;

        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in auth API",
      error,
    });
  }
};

const userrole = async (req, res, next) => {
  if ("admin" !== req.user.type) {
    return res.status(402).send({
      message: "user denied Access ",
    });
  }
  next();
};

const isuser = async (req, res, next) => {
  if ("user" !== req.user.type) {
    return res.status(402).send({
      message: "user denied Access ",
    });
  }
  next();
};

export { authuser, userrole , isuser };

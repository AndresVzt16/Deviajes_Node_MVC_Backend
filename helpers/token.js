import jwt from "jsonwebtoken";

const generarJWT = (id) => jwt.sign({id}, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

const generarId = () =>
  Math.random().toString(32).substring(2) + Date.now().toString(32);

export { 
    generarId,
    generarJWT
 };

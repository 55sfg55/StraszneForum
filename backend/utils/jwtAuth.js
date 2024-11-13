import jwt from "jsonwebtoken";

const SECRET = "secret"

const SESSION_TIME = 60 * 10; // 10 minutes

export function verifyToken(argToken) {
    return jwt.verify(argToken, SECRET)
}

export function signLoginToken(argUserID) {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + SESSION_TIME,
        userId: argUserID
      }, SECRET);
}
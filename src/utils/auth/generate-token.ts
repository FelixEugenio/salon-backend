import  jwt  from "jsonwebtoken";

async function generateToken(userId: string): Promise<string> {

   const payload = {
        userId
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    return token;
}

export default generateToken;
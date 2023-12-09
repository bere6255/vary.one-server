
import jwt from "jsonwebtoken";
import path from "path"
import fs from "fs"

export default (id: string)=>{
    const privateKey = fs.readFileSync(path.join(__dirname, "../varyone.key"));

    const token = jwt.sign(
        { id, created_at: new Date() },
        privateKey,
        {
            algorithm: "RS256",
            expiresIn: "31d",
        }
    );

    return token;
}
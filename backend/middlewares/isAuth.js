import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({message:"Unauthorized"});
        }
        const verifyToken = await jwt.verify(token,process.env.JWT_SECRET);
        req.userId = verifyToken.userId;
        next();
    }
    catch(error)
    {
        console.error("Auth Middleware Error:", error);
        return res.status(500).json({message:"Unauthorized"});
    }
}

export default isAuth;
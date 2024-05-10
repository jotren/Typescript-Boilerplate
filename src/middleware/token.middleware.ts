
import { Request, Response, NextFunction } from "express";

import tokenService from "../services/token.service";
import ErrorMessage from "../util/ErrorMessage";
import { HttpCode } from "../util/HttpCodes";

/**
 * Authenticates IF a header is provided. 
 * This does not reject requests without authentication
 */
async function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        
        const authHeader: string = req.get("Authorization");
    
        if (!authHeader) return next();
    
        if (!authHeader.startsWith("Bearer ")) throw new ErrorMessage(HttpCode.unauthorized, "The Authorization Bearer header is malformed");
    
        const token = authHeader.slice("Bearer ".length);
    
        try {
            const payload = await tokenService.verifyToken(token);
            res.locals.userId = payload.subject;
            res.locals.authenticated = true;
            res.locals.authentication_type = 'token';
    
            return next();
        } catch (error) {
            throw new ErrorMessage(HttpCode.unauthorized, "Invalid token");
        }
    } catch (error) {
        next(error)
    }
}

export default {
    authenticate
}
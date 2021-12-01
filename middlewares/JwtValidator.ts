import type {NextApiRequest, NextApiResponse, NextApiHandler} from 'next';
import {DefaultResponseMsg} from "../types/DefaultResponseMessage";
import jwt, {JwtPayload} from "jsonwebtoken";

export const JwtValidator = (handler: NextApiHandler) =>
    async (req: NextApiRequest, res : NextApiResponse<DefaultResponseMsg>) => {

    const{PRIVATE_ENCRYPTION_KEY} = process.env;

    if(!PRIVATE_ENCRYPTION_KEY){
        return res.status(500).json({error : 'PRIVATE ENCRYPTION KEY não informada'});
    }

    if(!req || !req.headers){
        return res.status(400).json({error : 'Não foi possivel validar o token'});
    }

    if(req.method !== 'OPTIONS'){
        try{
            const authorization = req.headers['authorization']
            if(!authorization){
                return res.status(400).json({error : 'Não foi possivel validar o token'});
            }

            const token = authorization.substr(7);
            if(!token){
                return res.status(400).json({error : 'Token de segurança não informado'});
            }

            const decode = await jwt.verify(token, PRIVATE_ENCRYPTION_KEY) as JwtPayload;
            if(!decode){
                return res.status(400).json({error : 'Não foi possivel validar o token'});
            }

            if(req.body){
                req.body.userId = decode._id;
            }else if(req.query){
                req.query.userId = decode._id;
            }
        } catch(e){
            return res.status(400).json({error : 'Não foi possivel validar o token'});
        }
    }
     return handler(req, res);
    }
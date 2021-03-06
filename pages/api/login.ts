import type {NextApiRequest, NextApiResponse} from 'next';
import {DefaultResponseMsg} from "../../types/DefaultResponseMessage";
import {LoginRequest} from '../../types/LoginRequest';
import {UserModel} from "../../models/UserModel";
import md5 from "md5";
import {connectDb} from "../../middlewares/connectDb";
import jwt from 'jsonwebtoken'
import {LoginResponse} from "../../types/LoginResponse";

const userLogin = async (req : NextApiRequest, res : NextApiResponse<DefaultResponseMsg | LoginResponse>) => {

    const {PRIVATE_ENCRYPTION_KEY } = process.env;
    if(!PRIVATE_ENCRYPTION_KEY){
        return res.status(500).json({ error : "ENV Chave JWT não informada"});
    }

    if(req.method === 'POST'){
        const body =req.body as LoginRequest;
        if(!body || !body.login || !body.password){
            res.status(400).json({error : 'Invalid user/password'})
        }
        const userFound = await UserModel.find({email : body.login, password : md5(body.password)})
        if(userFound && userFound.length > 0){
            const user = userFound[0]
            const token = jwt.sign({_id : user._id}, PRIVATE_ENCRYPTION_KEY)

            const result = {
                name : user.name,
                email : user.email,
                token
            }

            return res.status(200).json(result);
        }
        return res.status(400).json({msg: 'Invalid user/password'});
    }
    return res.status(405).json({msg : 'Invalid method'});
}

export default connectDb(userLogin)

import type {NextApiRequest, NextApiResponse} from 'next';
import {DefaultResponseMsg} from "../../types/DefaultResponseMessage";
import {LoginRequest} from '../../types/LoginRequest';
import {UserModel} from "../../models/UserModel";
import md5 from "md5";
import {connectDb} from "../../middlewares/connectDb";

const userLogin = async (req : NextApiRequest, res : NextApiResponse<DefaultResponseMsg>) => {
    if(req.method === 'POST'){
        const body = req.body as LoginRequest;

        if(!body || !body.login || !body.password){
            res.status(400).json({error : 'Invalid user/password'})
        }
        const userFound = await UserModel.find({email : body.login, password : md5(body.password)})
        if(userFound && userFound.length > 0){
            return res.status(200).json({msg: 'Autenticated Successfuly'});
        }
        return res.status(400).json({msg: 'Invalid user/password'});
    }
    return res.status(405).json({msg : 'Invalid method'});
}

export default connectDb(userLogin)

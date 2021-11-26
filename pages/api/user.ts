import type {NextApiRequest, NextApiResponse} from 'next';
import { DefaultResponseMsg } from '../../types/DefaultResponseMessage';
import {UserRequest} from "../../types/UserRequest";
import {connectDb} from "../../middlewares/connectDb"
import md5 from "md5";
import {UserModel} from "../../models/UserModel";

const user_endpoint = async (req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg>) => {

    if (req.method === 'POST') {
        const body = req.body as UserRequest
        if (body && !body.name || body.name.length < 2) {
            return res.status(400).json({error: 'Nome é obrigatorio'})
        }

        if (body && !body.email || body.email.length < 5) {
            return res.status(400).json({error: 'Email é obrigatorio'})
        }

        if (body && !body.password || body.password.length < 4) {
            return res.status(400).json({error: 'Senha é obrigatorio'})
        }
        const user = {
            name: body.name,
            email: body.email,
            password: md5(body.password)
        }

        await UserModel.create(user);
        return res.status(200).json({msg: 'Usuário Criado'});
    }
    return res.status(405).json({error: 'Metodo infomado não é valido'});
}

export default connectDb(user_endpoint)
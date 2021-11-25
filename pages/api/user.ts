import type {NextApiRequest, NextApiResponse} from 'next';
import { DefaultResponseMsg } from '../../types/DefaultResponseMessage';
import {UserRequest} from "../../types/UserRequest";

export default (req : NextApiRequest, res : NextApiResponse<DefaultResponseMsg>) => {

    if(req.method === 'POST'){
        const body = req.body as UserRequest
        if(body && !body.name || body.name.length < 2){
            return res.status(400).json({error: 'Nome é obrigatorio'})
        }

        if(body && !body.email || body.email.length < 5){
            return res.status(400).json({error: 'Email é obrigatorio'})
        }

        if(body && !body.password || body.password.length < 4){
            return res.status(400).json({error: 'Senha é obrigatorio'})
        }

        return res.status(200).json({ msg : 'Usuário Criado'});
    }
    return res.status(405).json({ error : 'Metodo infomado não é valido'});
}
import type {NextApiRequest, NextApiResponse} from 'next';
import {DefaultResponseMsg} from "../../types/DefaultResponseMessage";
import {LoginRequest} from '../../types/LoginRequest';

export default (req : NextApiRequest, res : NextApiResponse<DefaultResponseMsg>) => {
    if(req.method === 'POST'){
        const body = req.body as LoginRequest;
        if(body && body.login === 'admin@admin.com' && body.password === 'Admin@123'){
            return res.status(200).json({msg: 'Autenticado com sucesso'});
        }
        return res.status(400).json({msg: 'Usuário ou senha inválidos'});
    }
    return res.status(405).json({msg : 'Metodo inválido'});
}


import type {NextApiRequest, NextApiResponse, NextApiHandler} from 'next';
import mongoose from "mongoose";
import {DefaultResponseMsg} from "../types/DefaultResponseMessage";

export const connectDb = (handler: NextApiHandler) =>
    async (req: NextApiRequest, res : NextApiResponse<DefaultResponseMsg>) => {
     console.log('MongDb readystate', mongoose.connections[0].readyState)
     if(mongoose.connections[0].readyState){
       return handler(req, res);
     }
     const {DB_CONNECTION_STRING} = process.env;
     if(!DB_CONNECTION_STRING){
         return res.status(500).json({error : 'Database connection is null'})
     }
     await mongoose.connect(DB_CONNECTION_STRING)
     mongoose.connection.on('connected', () => console.log('Database connection successfull'))
     mongoose.connection.on('error', error => console.log('Error connecting to database ' + error))
     return handler(req, res);
    }
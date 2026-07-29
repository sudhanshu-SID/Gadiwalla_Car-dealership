import {Request, Response} from "express";

const getHealth = (req:Request, res:Response) => { 
   return res.json({
    status: "success"
});
};

export default getHealth;
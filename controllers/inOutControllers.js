import joi from "joi";
import dayjs from 'dayjs';
import db from "../database/db.js";

const registersSchema = joi.object({
    value: joi.string().required().min(1),
    description: joi.string().required().min(1),
    type: joi.string().valid("In", "Out").required().min(1)
});

async function postRegisters (req, res) {
    const movimentation = req.body;
    const {authorization} = req.headers;
    const token  = authorization?.replace('Bearer ', '');

    const validation = registersSchema.validate(movimentation);
    if (validation.error){
        res.status(422).send("error");
        return;
    };

    if (!token){
        return res.sendStatus(401);
    };

    try{
        const session = await db.collection("sessions").findOne({ token });
        if (!session){
            return res.sendStatus(401)
        };
        const register = await db.collection("registers").insertOne({
            ...movimentation,
            date: dayjs().format("DD/MM"),
            userId: session.userId
        });
        res.sendStatus(201);
    } catch {
        res.sendStatus(422);
    };
};

async function getRegisters (req, res) {
    const {authorization} = req.headers;
    const token  = authorization?.replace('Bearer ', '');

    if (!token){
        return res.sendStatus(401);
    };

    try{
        const session = await db.collection("sessions").findOne({ token });
        if (!session){
            return res.sendStatus(401)
        };
        const registers = await db.collection("registers").find({userId: session.userId}).toArray();

        res.send(registers).status(200);
    } catch {
        res.sendStatus(422);
    };
}

export { postRegisters, getRegisters };
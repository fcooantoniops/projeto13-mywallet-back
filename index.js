import { express } from "express";
import { cors } from "cors";

import { postSignUp, postSignIn } from "./controllers/signUpInControllers.js";
import { postRegisters, getRegisters } from "./controllers/inOutControllers.js";

const server = express();
server.use(express.json());
server.use(cors());

server.post('/sign-up', postSignUp);

server.post('/', postSignIn);

server.post('/registers', postRegisters);

server.get('/registers', getRegisters);

server.listen(5000);
import { express } from "express";
import { cors } from "cors";

import { postSignUp, postSignIn } from "./controllers/signUpInControllers.js";
import { postRegisters } from "./controllers/inOutControllers.js";

const server = express();
server.use(express.json());
server.use(cors());

server.post('/sign-up', postSignUp);

server.post('/', postSignIn);

server.post('/new-entry', postRegisters);
server.post('/new-output', postRegisters);

server.listen(5000);
import { express } from "express";
import { cors } from "cors";

import { postSignUp, postSignIn } from './Controllers/authController.js';

const server = express();
server.use(express.json());
server.use(cors());

server.post('/sign-up', postSignUp);

server.post('/', postSignIn);

server.listen(5000);
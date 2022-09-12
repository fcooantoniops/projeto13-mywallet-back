import { express } from "express";
import { cors } from "cors";

import { postSignUp } from './Controllers/authController.js';

const server = express();
server.use(express.json());
server.use(cors());

server.post('/sign-up', postSignUp);

server.listen(5000);
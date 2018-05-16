import { Request, Response, Router } from 'express';

import { AuthController } from '../controllers/auth.controller';

export class AuthRoutes {
    public static create(router: Router) {
        router.post('/login', (req: Request, res: Response) => AuthController.login(req, res));
        router.post('/register', (req: Request, res: Response) => AuthController.register(req, res));
        router.get('/testAuth', (req: Request, res: Response) => AuthController.testAuth(req, res));
    }
}

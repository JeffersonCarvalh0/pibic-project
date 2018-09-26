import { Request, Response, Router } from 'express';

import { UserController } from '../controllers/user.controller';

export class UserRoutes {
    public static create(router: Router) {
        router.post('/login', (req: Request, res: Response) => UserController.login(req, res));
        router.post('/user', (req: Request, res: Response) => UserController.register(req, res));
        router.get('/user', (req: Request, res: Response) => UserController.getUser(req, res));
        router.delete('/user', (req: Request, res: Response) => UserController.remove(req, res));
    }
}

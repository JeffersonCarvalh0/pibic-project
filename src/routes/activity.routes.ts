import { Request, Response, Router } from 'express';

import { ActivityController } from '../controllers/activity.controller';

export class ActivityRoutes {
    public static create(router: Router) {
        router.get("/activity", (req: Request, res: Response) => ActivityController.getAll(req, res));
        router.get("/activity/:id", (req: Request, res: Response) => ActivityController.getById(req, res));
        router.post("/activity/", (req: Request, res: Response) => ActivityController.create(req, res));
        router.put("/activity/:id", (req: Request, res: Response) => ActivityController.update(req, res));
        router.delete("/activity/:id", (req: Request, res: Response) => ActivityController.remove(req, res));
    }
}

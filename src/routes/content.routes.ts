import { Request, Response, Router } from 'express';

import { ContentController } from '../controllers/content.controller';

export class ContentRoutes {
    public static create(router: Router) {
        router.get("/content", (req: Request, res: Response) => ContentController.getAll(req, res));
        router.get("/content/:id", (req: Request, res: Response) => ContentController.getById(req, res));
        router.post("/content", (req: Request, res: Response) => ContentController.create(req, res));
        router.put("/content/:id", (req: Request, res: Response) => ContentController.update(req, res));
        router.delete("/content/:id", (req: Request, res: Response) => ContentController.remove(req, res));
    }
}

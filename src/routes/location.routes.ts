import { Request, Response, Router } from 'express'

import { LocationController } from '../controllers/location.controller'

export class LocationRoutes {
  public static create(router: Router) {
    router.get('/location', (req: Request, res: Response) => LocationController.getAll(req, res))
    router.get('/location/:id', (req: Request, res: Response) => LocationController.getById(req, res))
    router.put('/location/:id', (req: Request, res: Response) => LocationController.update(req, res))
    router.post('/location', (req: Request, res: Response) => LocationController.create(req, res))
    router.delete('/location/:id', (req: Request, res: Response) => LocationController.remove(req, res))
  }
}

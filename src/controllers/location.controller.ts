import { Request, Response } from 'express';

import { LocationModel, ILocation } from '../db/location.db';

export class LocationController {
    public static getAll(req: Request, res: Response) {
        LocationModel.find({}, (err: Error, docs: ILocation[])=> {
            res.status(200).json({data: docs, errors: err});
        });
    }

    public static getById(req: Request, res: Response) {
        let locationId = req.params.id;
        let data: ILocation;

        LocationModel.findById(locationId, (err: Error, location: ILocation) => {
            res.statusCode = err || location == null ? 404 : 200;
            if (location) data = location;
            res.json({data: data, errors: err});
        });
    }

    public static async create(req: Request, res: Response) {
        let location = req.body;
        let data: ILocation | null = null;
        let errors: Object | null = null;

        location = new LocationModel(location);

        location.save((err: Error, location: ILocation) => {
            errors = err;
            res.statusCode = err || location == null ? 401 : 201;
            if (location) { data = location; res.location(`/location/${location._id}`); }
            res.json({data: data, errors: errors});
        });
    }

    public static async remove(req: Request, res: Response) {
        let errors: Object | null = null;
        res.statusCode = 404;

        try {
            let location = await LocationModel.findById(req.params.id);
            if (location) { await location.remove(); res.statusCode = 204; }
            else res.statusCode = 401;
            res.json({data: null, errors: errors});
        } catch (err) { errors = err; }
    }
}

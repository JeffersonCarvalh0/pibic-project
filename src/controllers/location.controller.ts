import { Request, Response } from 'express';

import { LocationModel, ILocation, ILocationUser } from '../db/location.db';
import { ContentModel } from '../db/content.db';

async function toUser(doc: ILocation): Promise<ILocationUser> {
    doc = await doc.populate('content').execPopulate();

    let data: ILocationUser = {
        _id: doc._id,
        name: doc.name,
        content: doc.content,
        latitude: doc.coord.coordinates[1],
        longitude: doc.coord.coordinates[0]
    };

    return new Promise<ILocationUser>((resolve) => resolve(data));
}

export class LocationController {
    public static async getAll(req: Request, res: Response) {
        LocationModel.find({}, async(err: Error, docs: ILocation[]) => {
            res.status(200).json({ data: await Promise.all(docs.map(toUser)), errors: err });
        });
    }

    public static getById(req: Request, res: Response) {
        let locationId = req.params.id;
        let data: ILocationUser;

        LocationModel.findById(locationId, async(err: Error, location: ILocation) => {
            res.statusCode = err || location == null ? 404 : 200;
            if (location) data = await toUser(location);
            res.json({data: data, errors: err});
        });
    }

    public static async create(req: Request, res: Response) {
        let data: ILocationUser | null = null;
        let errors: Object | null = null;

        let location = {
            name: req.body.name,
            coord: { type: "Point", coordinates: [req.body.longitude, req.body.latitude] }
        };

        let locationDocument = new LocationModel(location);

        locationDocument.save(async(err: Error, location: ILocation) => {
            errors = err;
            res.statusCode = err || location == null ? 406 : 201;
            if (location) {
                data = await toUser(location);
                res.location(`/location/${location._id}`);
            }
            res.json({data: data, errors: errors});
        });
    }

    public static async setContent(req: Request, res: Response) {
        let errors: Object | null = null;
        let data: ILocationUser | null = null;
        let statusCode = 406;

        try {
            let location = await LocationModel.findById(req.params.locationId);
            let content = await ContentModel.findById(req.params.contentId);

            if (location && content) {
                location.content = req.params.contentId;
                await location.save();
                statusCode = 201;
                location = await location.populate('content').execPopulate();
                data = await toUser(location);
            } else statusCode = 404;
        } catch (err) { errors = err; }
        res.json({ data: data, errors: errors });
    }

    public static async remove(req: Request, res: Response) {
        let errors: Object | null = null;
        res.statusCode = 404;

        try {
            let location = await LocationModel.findById(req.params.id);
            if (location) { await location.remove(); res.statusCode = 204; }
            else res.statusCode = 401;
        } catch (err) { errors = err; }
        res.json({data: null, errors: errors});
    }
}

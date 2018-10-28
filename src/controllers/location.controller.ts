import { Request, Response } from 'express';

import { LocationModel, ILocation, ILocationUser } from '../db/location.db';
import { ContentModel } from '../db/content.db';

async function toUser(doc: ILocation): Promise<ILocationUser> {
    await doc.populate('content').execPopulate();

    let data: ILocationUser = {
        _id: doc._id,
        name: doc.name,
        description: doc.description,
        coord: [doc.coord.coordinates[0], doc.coord.coordinates[1]]
    };

    return new Promise<ILocationUser>((resolve) => resolve(data));
}

function toDB(obj: ILocationUser) {
    let location: any = {}
    for (let key of Object.keys(obj)) location[key] = obj[key];

    if (location.coord !== undefined)
        location.coord = { type: "Point", coordinates: location.coord }

    // console.log(location);

    return location;
}

export class LocationController {
    public static async getAll(req: Request, res: Response) {
        LocationModel.find({}, async(err: Error, docs: ILocation[]) => {
            res.status(200).json({ data: await Promise.all(docs.map(toUser)), errors: err });
        });
    }

    public static getById(req: Request, res: Response) {
        let locationId = req.params.id;
        let data: ILocationUser | null = null;

        LocationModel.findById(locationId, async(err: Error, location: ILocation) => {
            res.statusCode = err || location == null ? 404 : 200;
            if (location) data = await toUser(location);
            res.json({data: data, errors: err});
        });
    }

    public static async create(req: Request, res: Response) {
        let data: ILocationUser | null = null;
        let errors: Object | null = null;

        let locationDocument = new LocationModel(toDB(req.body));

        res.statusCode = 406;
        try {
            locationDocument = await locationDocument.save();
            if (locationDocument) {
                res.statusCode = 201;
                data = await toUser(locationDocument);
            }
        } catch (err) { errors = err; }
        res.json({ data: data, errors: errors });
    }

    public static async update(req: Request, res: Response) {
        let data: ILocationUser | null = null;
        LocationModel.findByIdAndUpdate(req.params.id, toDB(req.body), { new: true }, async (err: Error, location: ILocation | null) => {
            res.statusCode = err || location == null ? 406 : 200;
            if (location) data = await toUser(location);
            res.json({ data: data, errors: err });
        });
    }

    public static async remove(req: Request, res: Response) {
        let errors: Object | null = null;
        res.statusCode = 406;

        try {
            let location = await LocationModel.findById(req.params.id);
            if (location) await location.remove(), res.statusCode = 204;
            else res.statusCode = 404;
        } catch (err) { errors = err; }
        if (res.statusCode == 204) res.json();
        else res.json({data: null, errors: errors});
    }
}

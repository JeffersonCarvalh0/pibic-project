import { Model } from 'mongoose';

import { server } from '../server';
import { ICatModel, CatSchema } from './cat';

/** Models to be exported and used by the app */
export const CatModel: Model<ICatModel> = server.app.db.model<ICatModel>("Cat", CatSchema);

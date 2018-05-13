import { suite, test } from 'mocha-typescript';
import { assert } from 'chai';
import mongoose from 'mongoose';

import { server } from '../server';
import { ICat } from '../db/cat';
import { CatModel } from '../db/models';

let mockCat = {
    name: "Bolinha",
    color: "Gray and Black",
    age: 2
}

@suite
class CatsTest {
    @test("Should save a new cat to the database.")
    public create() {
        let bolinha = new CatModel(mockCat);
        bolinha.save();
        CatModel.findOne({ name: 'Bolinha' }, (err: Error, cat: ICat) => {
            assert.typeOf(err, 'null', `The following error ocurred: ${err}` );
            assert.equal(cat.name, mockCat.name, 'The names dos not match.');
            assert.equal(cat.color, mockCat.color, 'The clors do not match.')
            assert.equal(cat.age, mockCat.age, 'The ages do not match.');
        });
    }

    public static after() {
        server.shutdown();
    }
}

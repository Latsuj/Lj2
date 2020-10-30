'use strict';

require('dotenv').config({path: './env/.env.production'});
const path = require('path');
const { Seeder } = require('mongo-seeding');

module.exports = {
	get_seeder: (config) => {
		return new Seeder(config);
	},
	seed: async () => {
		const seeder = module.exports.get_seeder({
			database: process.env.DB_URI_DATA + process.env.DB_NAME,
			dropDatabase: true,
		})

		const collectionReadingOptions = {
		    transformers: [
		        Seeder.Transformers.replaceDocumentIdWithUnderscoreId,
		    ]
		}

		const collections = seeder.readCollectionsFromPath(
		    path.resolve("./seeding/datas"),
		    collectionReadingOptions
		);

		await seeder.import(collections);
	}
}

import { DBConfig } from "ngx-indexed-db";

export const dbConfig : DBConfig = {
    name: 'nucalLocalDb',
    version: 1,
    objectStoresMeta: [{
        store: 'nucal',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
            { name: 'date', keypath: 'date', options: { unique: true }},
            { name: 'userId', keypath: 'userId', options: { unique: false }},
            { name: 'plates', keypath: 'plates', options: { unique: false }}
        ]
    }]
}
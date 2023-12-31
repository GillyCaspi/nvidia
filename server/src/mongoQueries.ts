import {Db, MongoClient} from 'mongodb';
import {createObjectCsvWriter} from "csv-writer";

const url = 'mongodb://mongodb_container:27017';
const dbName = 'data';
// const url = 'mongodb://localhost:27017';

export async function getRecordsByFilters(filters?: any): Promise<any> {
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        const collection = db.collection('mnf_data');
        return await collection.find(filters, {
            projection: {
                'PASS': 1,
                'TEST_DATE': 1
            }
        }).sort({'TEST_DATE': 1}).toArray();
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}


export async function createCsvFileByFilter(filters: any) {
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        const collection = db.collection('mnf_data');
        const cursor = collection.find(filters).sort({'TEST_DATE': 1});
        const writer = createObjectCsvWriter({
            path: 'data.csv',
            header: [{title: 'PN', id: 'PN'},
                {title: 'TEST_DATE', id: 'TEST_DATE'},
                {title: 'TEST_TYPE', id: 'TEST_TYPE'},
                {title: 'PASS', id: 'PASS'}]
        });
        let doc = await cursor.next();
        while (doc !== null) {
            await writer.writeRecords([{PN: doc.PN, TEST_DATE: doc.TEST_DATE, TEST_TYPE: doc.TEST_TYPE, PASS : doc.PASS }])
            doc = await cursor.next();
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}


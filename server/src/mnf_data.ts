import {MongoClient} from 'mongodb';
import {createObjectCsvWriter} from 'csv-writer';

const url = 'mongodb://mongodb_container:27017';
const dbName = 'data';
// const url = 'mongodb://localhost:27017';

async function getRecordsByFilters(filters?: any): Promise<any> {
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const db = client.db(dbName);
        const collection = db.collection('mnf_data');
        return await collection.find(filters, {projection: {'PASS': 1, 'TEST_DATE': 1}}).sort({'TEST_DATE': 1}).toArray();
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

export async function createCsvFile(queryString: any) {
    const filters = createFilters(queryString);
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
                {title: 'TEST_TYPE' ,id: 'TEST_TYPE'},
                {title: 'PASS' ,id: 'PASS'}]
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


export async function getRecords(queryString: any): Promise<any> {
    const filters = createFilters(queryString);
    const itemList = await getRecordsByFilters(filters);
    return {
        statusCode: 200,
        json: itemList
    };
}

const createFilters = (queryString: any) => {
    console.log(queryString);
    let filters = {};
    if (queryString.pn) {
        filters = {PN: queryString.pn}
    }
    if (queryString.type) {
        filters = {...filters, TEST_TYPE: queryString.type}
    }
    if (queryString.start_date || queryString.end_date) {
        let dateFilter = {};
        if (queryString.start_date) {
            dateFilter = {$gte: new Date(queryString.start_date)};
        }
        if (queryString.end_date) {
            dateFilter = {...dateFilter, $lte: new Date(queryString.end_date)}
        }
        filters = {...filters, TEST_DATE: {...dateFilter}};
    }
    console.log(filters);
    return filters;
}
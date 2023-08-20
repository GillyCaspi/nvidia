import {createCsvFileByFilter, getRecordsByFilters} from "./mongoQueries";

export async function getRecords(queryString: any): Promise<any> {
    const filters = createFilters(queryString);
    const itemList = await getRecordsByFilters(filters);
    return {
        statusCode: 200,
        json: itemList
    };
}

export async function createCsvFile(queryString: any): Promise<any> {
    const filters = createFilters(queryString);
    await createCsvFileByFilter(filters);
    return {
        statusCode: 200
    };
}

const createFilters = (queryString: any) => {
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
    return filters;

}

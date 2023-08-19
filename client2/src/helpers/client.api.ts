import axios from "axios";
import {Filter, TestRow} from "../models";

const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
});

const clientApi = {
    getRecordsByFilters: (filters: Filter): Promise<TestRow[]> => {
        return instance.get(buildQuery(filters)).then(res => res.data);
    },
    downloadCsv: (filters: Filter): Promise<any> => {
        return instance.get("/csv" + buildQuery(filters), {responseType: 'blob'});
    }
}

const buildQuery = (filter: Filter) => {
    let query = '?';
    Object.entries(filter).map(([key, value]) => query += value!=='' ? key+"="+value+"&" : "");
    return query;
}



export default clientApi;
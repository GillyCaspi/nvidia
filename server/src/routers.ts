import {Router} from "express";
import {getRecords, createCsvFile} from "./mnf_data";
import * as path from "path";

export default function getRouter(): Router {
    const router = Router();

    router.get('/', async (req, res) => {
        const {json, statusCode} = await getRecords(req.query);
        res.status(statusCode);
        res.json(json);
    });

    router.get('/csv',  async (req, res) => {
        await createCsvFile(req.query);
        console.log(path.resolve('./data.csv'));
        res.download(path.resolve('./data.csv'));
    });

    return router;
}
import React, {ChangeEvent, useState, FormEvent} from 'react';
import {MDBBtn, MDBInput} from "mdb-react-ui-kit";
import {Filter} from "../models";
import clientApi from "../helpers/client.api";

export default function Filters({sendFilters} : {sendFilters : (filters: Filter) => void}) {

    const [filters, setFilters] = useState<Filter> ({pn: 'Fuji', type : 'Durability', start_date : '', end_date: ''});

    const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        sendFilters(filters);
    }

    const handleDownload = () => {
        clientApi.downloadCsv(filters).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'data.csv');
            document.body.appendChild(link);
            link.click();
        });
    };

    const onChange = (ev: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const {name, value} = ev.currentTarget;
        setFilters(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }


    return (
        <div>
            <form className="d-grid gap-3 w-50" onSubmit={handleSubmit}>
                <MDBInput size='lg' label="PN" name="pn" value={filters.pn} onChange={onChange}/>
                <MDBInput size='lg' label="TEST TYPE" name="type" value={filters.type} onChange={onChange} />
                <MDBInput size='lg' label="START DATE" name="start_date" type="date" value={filters.start_date} onChange={onChange} />
                <MDBInput size='lg' label="END DATE" name="end_date" type="date" value={filters.end_date} onChange={onChange} />
                <MDBBtn type="submit">GO</MDBBtn>
                <label>*'Fuji' and 'Durability' display for tests*</label>
            </form>
            <MDBBtn  className="mt-4" onClick={handleDownload}>Download File</MDBBtn>
        </div>
    );
}


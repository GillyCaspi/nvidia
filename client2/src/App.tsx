import {MDBContainer} from "mdb-react-ui-kit";
import Filters from "./components/Filters";
import {Filter, TestRow} from "./models";
import clientApi from "./helpers/client.api";
import PassRateChart from "./components/PassRateChart";
import {useState} from "react";

export default function App() {

    const[testRows, setTestRow] = useState<TestRow[]>([]);

    const sendFilters = async (filter : Filter) => {
        const d = await clientApi.getRecordsByFilters(filter);
        setTestRow(d);
        console.log(d);
    }

  return (
      <MDBContainer className="pt-2">
          <Filters sendFilters={sendFilters} />
          {testRows.length > 0 && <PassRateChart TestData={testRows}/>}
      </MDBContainer>
  );
}


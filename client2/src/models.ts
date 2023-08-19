export interface Filter {
    pn: string,
    type: string,
    start_date: string,
    end_date: string
}

export interface TestRow {
    PASS: number,
    TEST_DATE: string
}


export interface GroupedData {
    intervalStart: number,
    intervalEnd: number,
    passedTests: number,
    allTests: number
}

export interface LineChartObj {
    date: string,
    passRate: number,
    totalTests: number
}

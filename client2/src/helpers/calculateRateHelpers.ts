import {GroupedData, TestRow} from "../models";

 const groupTestDataByInterval = (data: TestRow[], interval: number) => {
    let groupedData : GroupedData[] = [];
    let currentIntervalStart = 0;
    data.forEach(item => {
        const itemTime = new Date(item.TEST_DATE).getTime();
        if (currentIntervalStart === 0 || itemTime - currentIntervalStart >= interval) {
            currentIntervalStart = itemTime;
            groupedData.push({
                intervalStart: currentIntervalStart,
                intervalEnd: currentIntervalStart + interval,
                passedTests: 0,
                allTests: 0
            });
        }
        groupedData[groupedData.length - 1].allTests++;
        if (item.PASS === 1) {
            groupedData[groupedData.length - 1].passedTests++;
        }
    });
    return groupedData;
};

export const calculatePassRate = (data: TestRow[], interval: number) => {
    const groupedData: GroupedData[] =  groupTestDataByInterval(data, interval);
    return groupedData.map(group => ({
        date: new Date(group.intervalStart).toISOString(),
        passRate: group.passedTests /  group.allTests,
        totalTests: group.allTests
    }));
};
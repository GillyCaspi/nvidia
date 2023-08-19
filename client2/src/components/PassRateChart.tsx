import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React, { useState, useEffect } from 'react';
import {TestRow, LineChartObj} from "../models";
import {calculatePassRate} from "../helpers/calculateRateHelpers";

export default function PassRateChart({TestData} : {TestData : TestRow[]})  {

    const [timeInterval, setTimeInterval] = useState(3600000);
    const [chartData, setChartData] = useState<LineChartObj[]>();

    const TimeIntervalOptions = [
        { label: 'Hour', value: 3600000 },
        { label: 'Day', value: 86400000 },
        { label: 'Week', value: 604800000 },
        { label: 'Month', value: 2592000000 },
    ];

    useEffect(() => {
        setChartData(calculatePassRate(TestData, timeInterval));
    }, [TestData, timeInterval]);

    const onChange = (ev : React.ChangeEvent<HTMLSelectElement>) => {
        setTimeInterval(Number(ev.target.value));
        setChartData(calculatePassRate(TestData, Number(ev.target.value)));
    }

    return (
        <div className="pt-5">
            <h2 className='mb-3'>Yield-Over-Time Chart</h2>
            <div className='mb-3'>
                Select Time Interval:
                <select value={timeInterval} onChange={onChange}>
                    {TimeIntervalOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis  dataKey="date"/>
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="passRate" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};


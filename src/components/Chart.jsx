import React, { useContext, useState } from "react";
import { AppContext } from '../App'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function Chart(props) {
    const fetchedData = useContext(AppContext);

    const [data, setData] = useState([])

    const chartDate = ["2020-1-22", "2020-5-24", "2020-8-14", "2021-1-25", "2021-5-1", "2022-1-1", "2022-3-10"]

    function calcCases(date) {
        let confirmed = 0, infected = 0, recovered = 0, death = 0

        if (props.name === 'Thế giới') {
            fetchedData.countriesName.forEach((name) => {
                const countryData = fetchedData.data[name]
                var i = 0
                while (countryData[i]["date"] !== date) {
                    ++i;
                }
                
                
                confirmed += countryData[i]["confirmed"]
                recovered += countryData[i]["recovered"]
                death += countryData[i]["deaths"]
            })
        }
        else {
            const countryData = fetchedData.data[props.name]
            var i = 0
            while (countryData[i]["date"] !== date) {
                ++i;
            }

                confirmed += countryData[i]["confirmed"]
                recovered += countryData[i]["recovered"]
                death += countryData[i]["deaths"]
        }

        infected = confirmed - (recovered + death)
    }

    chartDate.map((date) => 
        calcCases(date)
    )

    return (
        <div className="linechart">
            <h3>Biểu đồ {props.name}</h3>
            <LineChart
                width={1120}
                height={500}
                data={data}
                margin={{
                    top: 5,
                    right: 10,
                    left: 0,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#6666fa96"
                    name="Tổng ca nhiễm"
                />
                <Line
                    type="monotone"
                    dataKey="active"
                    stroke="#dd641396"
                    name="Đang được chữa"
                />
                <Line
                    type="monotone"
                    dataKey="recovered"
                    stroke="#36ded1"
                    name="Khỏi"
                />
                <Line
                    type="monotone"
                    dataKey="death"
                    stroke="#fa8181"
                    name="Tử vong"
                />
            </LineChart>
        </div>
    )
}

export default Chart;
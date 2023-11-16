import React, { useEffect, useState } from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"
import { StatisticHttp } from "../../../http/statistic-http"
import { AxiosResponse } from "axios"

interface CountUserOneDayInterface {
    createdStatisticDate: Date
    totalUsers: number
    newUsers: number
    activeUsers: number
    nonActiveUsers: number
}

const dataMock = [
    {
        name: "All Users",
        value: 0,
        fill: "#FF6633",
    },
    {
        name: "New Users",
        value: 0,
        fill: "#3361FF",
    },
    {
        name: "Active Users",
        value: 0,
        fill: "#8833FF",
    },
    {
        name: "Non Active Users",
        value: 0,
        fill: "#2EE6CA",
    },
]

export const AdminPanelStatisticBar1 = () => {
    const [data, setData] = useState(dataMock)
    const [maxValue, setMaxValue] = useState(0)
    const [coordX,setCoordX] = useState(0)
    
    useEffect(() => {
        const effectBody = async () => {
            const res: CountUserOneDayInterface[] =
                await StatisticHttp.getStatisticUsersOne()
            const dataServer = [
                res[0]?.totalUsers || 0,
                res[0]?.newUsers || 0,
                res[0]?.activeUsers || 0,
                res[0]?.nonActiveUsers || 0,
            ].map((item, index) => ({ ...dataMock[index], value: item }))
            console.log(dataServer)

            setMaxValue(res[0]?.totalUsers || 0)
            setData(dataServer)
        }
        effectBody()
    }, [])

    console.log("------>", coordX*((window.innerWidth - 80)/maxValue), window.innerWidth);
    console.log(maxValue, coordX);
    

    return (
        <div className="admin__panel__statistic-barchar">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} layout="vertical" margin={{ top: 50 }}>
                    <XAxis
                        type="number"
                        tickLine={false}
                        axisLine={{ stroke: "#F5F6F7", strokeWidth: "2", }}
                        height={20}
                    />
                    <YAxis dataKey="name" type="category" hide />
                    <Bar
                        dataKey="value"
                        shape={(props) => {
                            const { x, y, width, name, fill } = props
                            return (
                                <g>
                                    <rect
                                        x={x - 7}
                                        y={y}
                                        width={width}
                                        height={5}
                                        fill={fill}
                                        rx={5}
                                        ry={5}
                                    />
                                    <text
                                        x={x}
                                        y={y - 10}
                                        textAnchor="start"
                                        className="admin__panel__statistic-barchar-text"
                                    >
                                        {name}
                                    </text>
                                </g>
                            )
                        }}
                        barSize={15}
                    />
                    <Tooltip
                        position={{  x: coordX*((window.innerWidth - 80)/maxValue)}}
                        allowEscapeViewBox={{ y: true, x: true }}
                        content={(payload) => {
                            console.log(payload);
                            
                            if (
                                payload?.coordinate?.x !== coordX
                            ){
                                 console.log(payload)
                                 console.log(coordX);

                                setCoordX(Number(payload?.payload?.[0]?.value))
                            }
                            return (
                                <div className="admin__panel__statistic-tooltip admin__panel__statistic-tooltip-vertical">
                                    <p>{`${coordX}`}</p>
                                    <div className="admin__panel__statistic-tooltip-triangle" />
                                </div>
                            )
                        }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

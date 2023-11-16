import React, { PureComponent, useEffect, useState } from "react"
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts"
import { StatisticHttp } from "../../../http/statistic-http"

interface CountUserOneDayInterface {
    createdStatisticDate: Date
    totalUsers: number
    newUsers: number
    activeUsers: number
    nonActiveUsers: number
}

export const AdminPanelStatisticBar2 = () => {
    const [coord, setCoord] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

    const [maxValue, setMaxValue] = useState(0)

    const [data, setData] = useState<CountUserOneDayInterface[]>([])

    useEffect(() => {
        const value = [...data]
        const sortedData = value.sort(
            (a, b) =>
                b?.totalUsers +
                b?.newUsers +
                b?.nonActiveUsers +
                b?.activeUsers -
                (a?.totalUsers + a?.newUsers + a?.nonActiveUsers + a?.activeUsers)
        )

        if (sortedData.length > 0) {
            setMaxValue(
                sortedData[0]?.totalUsers +
                    sortedData[0]?.newUsers +
                    sortedData[0]?.nonActiveUsers +
                    sortedData[0]?.activeUsers
            )
        }
    }, [data])

    useEffect(() => {
        const effectBody = async () => {
            const res: CountUserOneDayInterface[] =
                await StatisticHttp.getStatisticUsersTen()

            setData(
                res.map((item) => ({
                    ...item,
                    createdStatisticDate: new Date(
                        item.createdStatisticDate
                    ).getDate() as any,
                }))
            )
        }
        effectBody()
    }, [])

    console.log(maxValue);
    

    return (
        <div className="admin__panel__statistic-barchar">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    
                >
                    <XAxis
                        dataKey="createdStatisticDate"
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        orientation="right"
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip
                        position={{  y: (232 - (coord.y*223)/maxValue) - 30, x: coord.x }}
                        allowEscapeViewBox={{ y: true, x: true }}
                        content={(payload) => {
                    
                            if (
                                payload?.coordinate?.x !== coord.x &&
                                payload?.coordinate?.y !== coord.y
                            ){
                
                                 
                                setCoord({
                                    y:  payload?.payload?.reduce((s,p) => s + Number(p?.value) ,0) || 0,
                                    x:  payload?.coordinate?.x || 0,
                                })
                             
                            }
                            return (
                                <div className="admin__panel__statistic-tooltip">
                                    <p>{`${coord.y} Users`}</p>
                                    <div className="admin__panel__statistic-tooltip-triangle"/>
                                </div>
                            )
                        }}
                    />
                    <Bar
                        dataKey="nonActiveUsers"
                        stackId="a"
                        fill="#2EE6CA"
                        barSize={5}
                        
                    />
                    <Bar
                        dataKey="activeUsers"
                        stackId="a"
                        fill="#8833FF"
                        barSize={5}
                    />
                    <Bar
                        dataKey="newUsers"
                        stackId="a"
                        fill="#3361FF"
                        barSize={5}
                    />
                    <Bar
                        dataKey="totalUsers"
                        stackId="a"
                        fill="#FF6633"
                        barSize={5}
                        radius={[5, 5, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

import React from 'react'
import { Chart, Axis, Tooltip, Legend, Geom } from 'bizcharts';

export default props => {
    const { chart, dataList } = props
    const dl = dataList.map(d => {
        let data = []
        for (const k in chart.title) {
            data.push({ x: d[chart.x], title: k, y: d[chart.title[k]] })
        }
        return data
    }).flat()

    return (
        <Chart height={300} data={dl} forceFit={true}
            filter={[['title', (t) => (!chart.filter.includes(t))]]}
        >
            <Legend />
            <Axis name="x" />
            <Axis name="y" />
            <Tooltip crosshairs={{ type: "y" }} shared={true} />
            <Geom
                type="line"
                position="x*y"
                size={1}
                color={"title"}
                shape={"smooth"}
            />
            <Geom
                type="point"
                position="x*y"
                size={3}
                shape={"circle"}
                color={"title"}
                style={{
                    stroke: "#fff",
                    lineWidth: 1
                }}
            />
        </Chart>
    )
}
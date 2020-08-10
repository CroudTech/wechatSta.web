import React from "react";
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";

export default props => {
    const { chart, dataList } = props

    const dl = dataList.map(d => {
        let data = { x: d[chart.x] }
        for (const k in chart.fields) {
            let dvalue = d[chart.fields[k]]
            dvalue = dvalue && dvalue.toString().replace('%', '')
            data[k] = dvalue * 1 || 0
        }
        return data
    })

    const dv = new DataSet().createView().source(dl);
    dv.transform({
        type: "fold",
        fields: Object.keys(chart.fields),
        key: "xk",
        value: "y"
    });
    return (
        <div>
            <Chart height={300} data={dv} forceFit>
                <Axis name="xk" />
                <Axis name="y" />
                <Legend />
                <Tooltip crosshairs={{ type: "y" }} shared={true} />
                <Geom
                    type="interval"
                    position="xk*y"
                    color={"x"}
                    adjust={[
                        {
                            type: "dodge",
                            marginRatio: 1 / 32
                        }
                    ]}
                />
            </Chart>
        </div>
    );
}

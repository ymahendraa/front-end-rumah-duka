import React from "react";
import { AxisOptions, Chart } from "react-charts";

type LineChartDatum = {
    primary: string;
    secondary: number;
};

type LineChartDatumProps = {
    data: {
        label: string;
        data: LineChartDatum[];
    }[]
}

const LineChart: React.FC<LineChartDatumProps> = ({
    data
}) => {

    const primaryAxis = React.useMemo<AxisOptions<LineChartDatum>>(
        () => ({
            getValue: (datum) => datum.primary as unknown as Date,
        }),
        []
    );

    const secondaryAxes = React.useMemo<
        AxisOptions<LineChartDatum>[]
    >(
        () => [
            {
                getValue: (datum) => datum.secondary,
                elementType: "line",
                showDatumElements: true
            },
        ],
        []
    );

    console.log(data);

    return (
        <Chart
            options={{
                data: data,
                primaryAxis,
                secondaryAxes,
                dark: true,
            }}
        />
    );
}

export default LineChart

import React from "react";
import Chart from "react-apexcharts";

interface PropsInterface {
}

export default class ChartSaleDelivery extends React.Component<PropsInterface, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            options: {
                chart: {
                    type: 'bar',
                    height: 350,
                    stacked: true,
                    toolbar: {
                        show: true
                    },
                    zoom: {
                        enabled: true
                    }
                },
                responsive: [{
                    breakpoint: 400,
                    options: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }],
                plotOptions: {
                    bar: {
                        horizontal: false,
                    },
                },
                xaxis: {
                    type: 'datetime',
                    categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT', '01/05/2011 GMT', '01/06/2011 GMT'],
                },
                legend: {
                    position: 'right',
                    offsetY: 40
                },
                fill: {
                    opacity: 1
                }
            },
            series: [
                {
                    name: 'OW',
                    data: [44, 55, 41, 67, 22, 43]
                },
                {
                    name: 'inna firma',
                    data: [22, 54, 91, 88, 43, 67]
                }
            ]
        };
    }

    render() {
        return (
            <div className="basicContainerStyle containerNoBorder">
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    height={230}
                    type="bar"/>
            </div>
        );
    }
}

import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const StoriesBarChart = ({ id, storiesBarChart }) => {
    // console.log(storiesBarChart, "storiesBarChart")
    useEffect(() => {
        const chartDom = document.getElementById(id);
        if (!chartDom) {
            console.error(`DOM element with id '${id}' not found.`);
            return;
        }
        const myChart = echarts.init(chartDom);
        const grid = {
            left: 70,
            right: 10,
            top: 10,
            bottom: 10
        };

        const option = {
            tooltip: {
                trigger: 'item',
                textStyle: {
                    color: "white"
                },
                backgroundColor: '#1e1e1e', // Set background color to black with opacity
                extraCssText: 'box-shadow:2px 4px 10px 10px #171616', // Add box shadow
                // position: [0, 150],
                formatter: (params) => {
                    const colorDot = `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:${params.color};"></span>`;
                    return `${colorDot}${params.name} : ${params.value} % `;
                }
            },
            yAxis: {
                type: 'category',
                data: ['Work Done', 'Time Taken',], // Categories on Y-axis
                axisLabel: {
                    color: 'white', // Change the color of the yAxis label here
                    fontSize: 8
                }
            },
            xAxis: {
                type: 'value',
                show: false
            },
            grid,
            series: [

                {
                    name: 'Time Taken',
                    type: 'bar',
                    top: 0,
                    barWidth: '55%',
                    data: [null, storiesBarChart?.timeTaken], // Data for 'Time Taken' bar
                    itemStyle: {
                        color: "#5c407e",
                        shadowBlur: 15,
                        shadowColor: '#0c0c0c',
                        shadowOffsetX: 5,
                        shadowOffsetY: 8
                    },
                    label: {
                        show: true,
                        formatter: '{c} %', // Customize label to display days,
                        fontSize: 8
                    }
                },
                {
                    name: 'Work Done',
                    type: 'bar',
                    barWidth: '55%', // Adjust bar width as needed
                    data: [storiesBarChart?.workDone, null], // Data for 'Work Done' bar
                    itemStyle: {
                        color: storiesBarChart.colorCode,
                        shadowBlur: 15,
                        shadowColor: '#0c0c0c',
                        shadowOffsetX: 5,
                        shadowOffsetY: 8
                    },
                    label: {
                        show: true,
                        formatter: '{c} %', // Customize label to display percentage
                        fontSize: 8
                    }
                },


            ],
            barGap: '-100%',
            barCategoryGap: '50%'
        };



        option && myChart.setOption(option);

        return () => {
            myChart.dispose();
        };
    }, [id, storiesBarChart]);

    return <div id={id} style={{ width: '100%', height: '65%' }}></div>;
};

export default StoriesBarChart;

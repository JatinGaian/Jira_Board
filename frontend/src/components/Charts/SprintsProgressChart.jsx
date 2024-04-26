import React, { useContext, useEffect } from 'react';
import * as echarts from 'echarts';
import { SrdpContext } from '../../Context/SrdpContext';
import { useNavigate } from 'react-router-dom';

const SprintsProgressChart = ({ id }) => {

    const { sprintBarChart, setSelectedSprintFromSummary, setSelectedSprint, filterSprintBarChart, searchValue } = useContext(SrdpContext)
    const navigate = useNavigate()

    const filteredData = sprintBarChart.filter((sprint) =>
        sprint.sprintName.toLowerCase().split('-')[0].trim().includes(searchValue.toLowerCase())).filter((item) => (
            item.workDone >= filterSprintBarChart.greaterThan && item.workDone <= filterSprintBarChart.lessThan
        ))

    useEffect(() => {
        const chartDom = document.getElementById(id);
        if (!chartDom) {
            console.error(`DOM element with id '${id}' not found.`);
            return;
        }

        const myChart = echarts.init(chartDom);
        let option;

        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow', // Use axis to trigger tooltip
                },
                
            },
            grid: {
                top: 10,
                bottom: 20,
                left: 105,
                right: 20
            },
            xAxis: {
                max: 100, // Set the maximum value of the x-axis to 100%
                axisLabel: {
                    formatter: '{value}%', // Format the axis label to show percentage
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'category',
                axisLabel: {
                    show: true,
                    fontSize: 8,
                    position: 'left', // Adjust label position
                    color: 'white',
                    formatter: function (value) {
                        const maxCharactersPerLine = 15; // Maximum characters per line
                        if (value.length > maxCharactersPerLine) {
                            // Insert a line break after every maxCharactersPerLine characters
                            return value.match(new RegExp(`.{1,${maxCharactersPerLine}}`, 'g')).join('\n');
                        } else {
                            return value;
                        }
                    }
                },
                animationDuration: 300,
                animationDurationUpdate: 300,
                data: filteredData
                    .map((item) => item.sprintName), // Use the same filtered data for yAxis labels
            },
            series: [
                {
                    name: 'Percentage of Work Done',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                        position: 'insideLeft', // Adjust label position
                        formatter: '{c}%',
                        fontSize: 8,
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: filteredData.map(item => ({
                        value: item.percentageOfWork,
                        name: item.sprintName,
                        itemStyle: {
                            color: (item.workDone > 0 && item.workDone <= 20) ? '#28801a' : (item.workDone > 20 && item.workDone <= 30) ? '#bea130' : (item.workDone > 30) ? '#630606' : '#bb86fc'
                        }
                    }))
                },
                {
                    name: 'Percentage of Time Elapsed',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                        position: 'insideRight', // Adjust label position
                        formatter: '{c}%',
                        fontSize: 8,
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: filteredData.map(item => ({
                        value: item.percentageOfTimeElapsed,
                        name: item.sprintName,
                        // Additional properties for color mapping based on percentageOfTimeElapsed
                        itemStyle: {
                            color: '#0f0f0f'
                        }
                    }))
                }
            ],
            barGap: '200%', // Increase the gap between bars
            barCategoryGap: '20%', // Adjust the gap between categories if needed
            animationDuration: 0,
        };


        myChart.on('click', (params) => {
            if (params.seriesType === 'bar') {
                const selectedItem = filteredData[params.dataIndex];
                const boardId = selectedItem.boardId;
                const boardName = selectedItem.boardName;
                const selectedSprint = selectedItem.sprintName.split('-')[0].trim();
                const selectedSprintId = selectedItem.sprintId
                if (boardId && boardName) {
                    setSelectedSprintFromSummary(selectedSprintId);
                    setSelectedSprint(selectedSprint);
                    navigate(`/BoardSummary/${boardId}/${boardName}`);
                } else {
                    console.error('boardId or boardName is undefined.');
                }
            }
        });

        option && myChart.setOption(option);
        return () => {
            myChart.dispose();
        };
    }, [id, sprintBarChart, filterSprintBarChart, searchValue]); // Add barData as a dependency if it changes dynamically

    return (
        <div id={id} style={{ width: "100%", height: `${filteredData.length == 1 ? "10vh" : filteredData.length == 2 ? "20vh" : filteredData.length == 3 ? "25vh" : filteredData.length == 4 ? "35vh" : (filteredData.length > 4 && filteredData.length < 10) ? "65vh" : (filteredData.length > 10 && filteredData.length < 15) ? "70vh" : (filteredData.length > 15 && filteredData.length < 20) ? "100vh" : (filteredData.length > 20 && filteredData.length < 30) ? "130vh" : filteredData.length == 0 ? "0vh" :"300vh"}` }}></div>
    );
}

export default SprintsProgressChart
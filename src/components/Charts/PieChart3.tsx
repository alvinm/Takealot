import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts';
import React from "react";
function generateBluePalette(n: number) {
  const colors: string[] = [];
  for (let i = 0; i < n; i++) {
    const hue = 200 + (i % 20); // around blue range (200–220° in HSL)
    const saturation = 60 + (i % 3) * 10; // 60–80%
    const lightness = 35 + Math.floor(i / 3) * 2; // gradually lighter
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
}

const pieColors = generateBluePalette(54);
// Example ids (you would have your own dataset)
const ids = Array.from({ length: 54 }, (_, i) => i + 1);


// Map ids → colors
// Map numeric ids → colors
const colorMap: Record<number, string> = ids.reduce((acc, id:any, index) => {
  acc[id] = pieColors[index];
  return acc;
}, {} as Record<number, string>);
const PieChart3 = (props:any) =>{
    const chartData = props.data.map((item: any) => ({
        name: item.name,   // label
        y: item.y,     // numeric value
        //color: colorMap[item.id] || "#cccccc" // fallback grey if id not in map
    }));

    const options = {
        chart: {
            type: "pie",
        },
        title: {
            text:  props.chart_name,
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)",
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                enabled: true,
                format: "<b>{point.name}</b>: {point.y}",
                },
            },
        },
        series: [
            {
                name: "Count",
                data: chartData,
            },
        ],
    };

    return(
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    )

}
export default PieChart3
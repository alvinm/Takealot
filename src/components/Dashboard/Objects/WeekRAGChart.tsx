import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

type DayData = { day: number | null; status: 'G' | 'A' | 'R' | 'N' };
type WeekData = { weekNo: number; days: DayData[] };

const colorMap: Record<string, string> = {
  G: '#2ecc71', // green
  A: '#f1c40f', // amber
  R: '#e74c3c', // red
  N: '#bdc3c7', // grey
};

export default function WeekRAGChart() {
  const [weeks, setWeeks] = useState<WeekData[]>([]);

  useEffect(() => {
    fetch('/api/milkrun')
      .then(res => res.json())
      .then(data => {
        const parsed = data.map((w: any) => ({
          weekNo: w.weekNo,
          days: JSON.parse(w.days),
        }));
        setWeeks(parsed);
      });
  }, []);

  const options = {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) =>
        `Week ${params.seriesName}<br/>Day ${params.data.day ?? '-'}<br/>Status: ${params.data.status}`,
    },
    grid: { top: 40, bottom: 40, left: 40, right: 40 },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: { show: false },
      axisLine: { show: false },
    },
    yAxis: {
      type: 'category',
      data: weeks.map(w => `Week ${w.weekNo}`),
      axisTick: { show: false },
      axisLine: { show: false },
    },
    series: weeks.map(week => ({
      name: week.weekNo,
      type: 'bar',
      stack: 'week',
      barWidth: 20,
      data: week.days.map(d => ({
        value: 1,
        day: d.day,
        status: d.status,
        itemStyle: { color: colorMap[d.status] },
      })),
    })),
  };

  return (
    <div style={{ height: 400 }}>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </div>
  );
}

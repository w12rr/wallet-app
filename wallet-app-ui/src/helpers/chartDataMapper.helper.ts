import { ToMoneyChartDto } from '../models/dtos/toMoneyChartDto';
import { ToPieChartDto } from '../models/dtos/toPieChartDto';

export const areaChartData = (
  labels: string[],
  label: string,
  data: any,
  borderColor: string,
  backgroundColor: string,
) => {
  return {
    labels,
    dataset: [
      {
        fill: true,
        label,
        data,
        borderColor,
        backgroundColor,
      },
    ],
  };
};

export const pieChartMapper = (data: ToPieChartDto[]) => {
  return {
    labels: data.map((x) => x.name),
    datasets: [
      {
        data: data.map((x) => x.value),
        backgroundColor: [
          'rgba(255,99,132,0.2)',
          'rgba(99,255,132,0.2)',
          'rgba(132,255,99,0.2)',
          'rgba(132,99,255,0.2)',
          'rgba(99,132,255,0.2)',
        ],
        borderColor: ['#FF6384', '#63FF84', '#84FF63', '#8463FF', '#6384FF'],
      },
    ],
    options: {
      plugins: {
        legend: {
          position: 'bottom',
        },
        filler: {
          propagate: true,
        },
      },
    },
  };
};

export const lineChartMapper = (data: ToMoneyChartDto[]) => {
  return {
    data: {
      labels: data.map((x) => new Date(x.name).toLocaleDateString()),
      datasets: [
        {
          data: data.map((x) => x.value),
          fill: true,
          borderColor: '#2196f3',
          backgroundColor: 'rgba(33,150,243,0.2)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
          position: 'bottom',
        },
        filler: {
          propagate: true,
        },
      },
    },
  };
};

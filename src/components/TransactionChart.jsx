import {Bar} from 'react-chartjs-2';
import {Skeleton} from '@mantine/core';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const TransactionChart = ({data, isLoading}) => {
  // Xử lý dữ liệu JSON
  const labels = data?.dayAnalysis.map(day => `Ngày ${day.day}`);
  const totalTransactions = data?.dayAnalysis.map(day => day.totalTransactions);
  const totalInMoney = data?.dayAnalysis.map(day => day.totalInMoney);
  const totalOutMoney = data?.dayAnalysis.map(day => day.totalOutMoney);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Tổng tiền nhận',
        data: totalInMoney,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Tổng tiền chuyển',
        data: totalOutMoney,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Số tiền (VND)',
        },
      },
    },
  };

  return (
      <div className={'w-full bg-white'}>
        {isLoading ? (
            <Skeleton height={400} radius="md"/>
        ) : (
             <Bar className={'w-full'} data={chartData} options={options}/>
         )}
      </div>
  );
};

export default TransactionChart;

//
// import { AreaChart } from '@mantine/charts';
// import {BarChart} from '@mantine/charts';
//
// export const data = [
//     { date: 'Mar 22', "Sân 5": 2890, "Sân 7": 2338, "Sân 11": 2452 },
//     { date: 'Mar 23', "Sân 5": 2756, "Sân 7": 2103, "Sân 11": 2402 },
//     { date: 'Mar 24', "Sân 5": 3322, "Sân 7": 986, "Sân 11": 1821 },
//     { date: 'Mar 25', "Sân 5": 3470, "Sân 7": 2108, "Sân 11": 2809 },
//     { date: 'Mar 26', "Sân 5": 3129, "Sân 7": 1726, "Sân 11": 2290 },
// ];
// export const data1 = [
//     { month: 'January', "Sân 5": 1200, "Sân 7": 900, "Sân 11": 200 },
//     { month: 'February', "Sân 5": 1900, "Sân 7": 1200, "Sân 11": 400 },
//     { month: 'March', "Sân 5": 400, "Sân 7": 1000, "Sân 11": 200 },
//     { month: 'April', "Sân 5": 1000, "Sân 7": 200, "Sân 11": 800 },
//     { month: 'May', "Sân 5": 800, "Sân 7": 1400, "Sân 11": 1200 },
//     { month: 'June', "Sân 5": 750, "Sân 7": 600, "Sân 11": 1000 },
// ];
//
// const StatisticChart2 = () => {
//     return (
//         <div>
//             <div className="p-4 bg-white rounded-lg shadow-md mb-8">
//                 <h2 className="text-lg font-semibold mb-4">Doanh Thu Các Loại Sân</h2>
//                 <AreaChart
//                     h={300}
//                     data={data}
//                     dataKey="date"
//                     series={[
//                         {name: 'Sân 5', color: 'indigo.6'},
//                         {name: 'Sân 7', color: 'blue.6'},
//                         {name: 'Sân 11', color: 'teal.6'},
//                     ]}
//                     curveType="linear"
//                 />
//             </div>
//             <div className="p-4 bg-white rounded-lg shadow-md">
//                 <h2 className="text-lg font-semibold mb-4">Số Lượng Đặt Sân</h2>
//                 <BarChart
//                     h={300}
//                     data={data1}
//                     dataKey="month"
//                     series={[
//                         { name: 'Sân 5', color: 'indigo.5' },
//                         { name: 'Sân 7', color: 'blue.5' },
//                         { name: 'Sân 11', color: 'teal.5' },
//                     ]}
//                     tickLine="y"
//                 />
//             </div>
//         </div>
//     );
// }
//
// export default StatisticChart2;

import {createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable} from '@tanstack/react-table';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import StatusDot from '../StatusDot.jsx';
import {formatCurrency} from '../../util/currency.util.js';

function TransactionTable({list}) {
  const columnHelper = createColumnHelper();
  const navigate = useNavigate();
  const [sorting, setSorting] = useState();

  const columns = [
    columnHelper.accessor('id', {
      header: 'Mã giao dịch',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('type', {
      header: 'Loại giao dịch',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('amount', {
      header: 'Số tiền',
      cell: (info) => formatCurrency(info.getValue()),
      enableSorting: true,
    }),
    columnHelper.accessor('created', {
      header: 'Thời gian tạo',
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor('status', {
      header: 'Trạng thái',
      cell: (info) => StatusDot({status: info.getValue()}),
    }),
  ];

  const tableInstance = useReactTable({
    data: list || [],
    columns,
    state: sorting,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: true,
  });

  function redirectToTransactionDetail(id) {
    navigate(`/transaction/${id}`);
  }

  return (
      <table className="min-w-full bg-white border rounded-lg overflow-hidden">
        <thead className="bg-orange-50 text-black text-center">
        {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                  <th
                      key={header.id}
                      className="py-4 cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted()] ?? null}
                  </th>
              ))}
            </tr>
        ))}
        </thead>
        <tbody>
        {tableInstance.getRowModel().rows.map((row) => (
            <tr
                key={row.id}
                onClick={() => redirectToTransactionDetail(row.original.id)}
                className="hover:bg-gray-100 text-center"
            >
              {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-3 cursor-pointer">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
              ))}
            </tr>
        ))}
        </tbody>
      </table>
  );
}

export default TransactionTable;

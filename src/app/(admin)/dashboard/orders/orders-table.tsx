"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import orderApi from "~/apis/order-api";
import { IOrder } from "~/common/model/order.model";
import { ProductUtil } from "~/common/utility/product.util";
import OrderDetail from "./order-detail";
import { OrderStatus } from "~/components/order-status";
import { orderStatus, statusClasses } from "~/static";
import { BaseUtil } from "~/common/utility/base.util";
import IconTextLoading from "~/components/icon-text-loading";
import { UpdateStatus } from "./update-status";
import { cn } from "~/lib/utils";

export const GetDataAndColumns = () => {
  const [data, setData] = useState<IOrder[]>([]);
  const [status, setStatus] = useState<string>(orderStatus[0].type);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result =
        status === "ALL"
          ? await orderApi.getAll()
          : await orderApi.getByStatus(status);

      setData(result.payload.data);
      // console.log(result.payload.data);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  }, [status]);
  useEffect(() => {
    fetchData();
  }, [status, fetchData]);

  const customFilterFn = (
    row: Row<IOrder>,
    id: string,
    filterValue: string
  ) => {
    if (filterValue === "") return true;
    return parseInt(row.getValue(id)) === parseInt(filterValue);
  };

  const columns: ColumnDef<IOrder>[] = [
    {
      accessorKey: "orderId",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-center w-full p-0"
          >
            Mã
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase text-center">{row.getValue("orderId")}</div>
      ),
      filterFn: customFilterFn,
    },
    {
      id: "client",
      enableHiding: false,
      header: () => <div className="text-center">Khách hàng</div>,

      cell: ({ row }) => <div className="text-center">{row.original.name}</div>,
    },
    {
      accessorKey: "orderStatus",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 w-full"
          >
            Trạng thái đơn hàng
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const status: string = row.getValue("orderStatus");
        return (
          <div
            className={`w-3/4 mx-auto py-1 capitalize font-semibold text-xs text-center rounded-full ${statusClasses[status]} `}
          >
            {row.getValue("orderStatus")}
          </div>
        );
      },
    },
    {
      accessorKey: "paymentMethod",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 w-full"
          >
            Phương thức thanh toán
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="capitalize text-center">
            {row.getValue("paymentMethod")}
          </div>
        );
      },
    },
    {
      accessorKey: "totalPrice",
      header: ({ column }) => {
        return (
          <Button variant="ghost" className="p-0 w-full">
            Tổng tiền
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="capitalize text-center">
            {ProductUtil.formatPrice(row.getValue("totalPrice"))}
          </div>
        );
      },
    },
    {
      accessorKey: "orderDetail",
      header: ({ column }) => {
        return (
          <Button variant="ghost" className="p-0">
            Chi tiết đơn hàng
          </Button>
        );
      },
      cell: ({ row }) => {
        return <OrderDetail order={row.original} />;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <UpdateStatus
            status={status}
            orderStatus={row.original.orderStatus}
            orderId={row.original.orderId}
            fetchData={fetchData}
          />
        );
      },
    },
  ];
  return { data, columns, status, setStatus, loading };
};

export function OrdersTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const { data, columns, status, setStatus, loading } = GetDataAndColumns();

  const table = useReactTable({
    data,
    columns,
    initialState: { pagination: { pageSize: 5 } }, // add
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <OrderStatus status={status} setStatus={setStatus} />
      <div className="flex items-center py-4">
        <Input
          placeholder="Tìm đơn hàng"
          value={(table.getColumn("orderId")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            const filterValue = parseInt(event.target.value) || "";
            table.getColumn("orderId")?.setFilterValue(filterValue);
          }}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Cột <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: any) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex justify-center">
                    <IconTextLoading />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không có kết quả.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {table.getRowModel().rows?.length > 5 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Tiếp
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

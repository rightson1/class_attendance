"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  Table as TTable,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { DropdownMenu } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Cross2Icon } from "@radix-ui/react-icons";
import { LiaFileDownloadSolid } from "react-icons/lia";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  title?: string;
  Filters?: React.FC<{
    table: TTable<TData>;
  }>;
  //seachField is the accessorKey of the column to be used for searching
  searchField?: keyof TData;
  hideToolbar?: boolean;
  onRowClick?: (row: TData) => void;
  columnVisibilitySelector?: boolean;
}
export const Table_Wrapper = <TData, TValue>({
  columns,
  data,
  loading,
  Filters,
  searchField,
  hideToolbar = false,
  onRowClick,
  columnVisibilitySelector = true,
  title,
}: DataTableProps<TData, TValue>) => {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [windowLoaded, setWindowLoaded] = React.useState(false);
  const [minWidth, setMinWidth] = React.useState(0);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    defaultColumn: {
      size: 100,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  React.useEffect(() => {
    setWindowLoaded(true);
  }, []);
  React.useEffect(() => {
    let width = 0;
    {
      table.getHeaderGroups().map((headerGroup) => {
        {
          headerGroup.headers.map((header) => {
            let columnWidth = header.getSize();
            width += columnWidth;
            setMinWidth(width);
          });
        }
      });
    }
  }, [table]);

  if (!windowLoaded) return null;
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="space-y-3">
      {!hideToolbar && (
        <div className="fbc px-4">
          {title && <h4 className="h4">{title}</h4>}
          <div
            className="gap-2 hidden flex-1 justify-end md:flex items-center py-4 w-full
        "
          >
            <Input
              placeholder="Search.."
              value={
                (table
                  .getColumn(searchField as string)
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) => {
                return table
                  .getColumn(searchField as string)
                  ?.setFilterValue(event.target.value);
              }}
              className="max-w-[250px]"
            />
            <div className="hidden md:flex justify-between gap-2">
              {Filters && (
                <div className="flex gap-2 w-full mb:flex-col  ">
                  <Filters table={table} />
                  {isFiltered && (
                    <Button
                      variant="ghost"
                      onClick={() => table.resetColumnFilters()}
                      className="h-8 px-2 lg:px-3"
                    >
                      Reset
                      <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
              {columnVisibilitySelector && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Columns <ChevronDown className="ml-2 h-4 w-4" />
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
                            onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                          >
                            {column.id}
                          </DropdownMenuCheckboxItem>
                        );
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <Button variant={"outline"} className="bg-card">
              <LiaFileDownloadSolid className="mr-2 text-xl" />
              <span>Export</span>
            </Button>
          </div>
        </div>
      )}
      <div className="border w-full">
        <Table>
          <TableHeader className="bg-accent">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        minWidth: `${header.getSize()}px`,
                      }}
                    >
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
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    className="cursor-pointer"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => onRowClick?.(row.original)}
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
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
};

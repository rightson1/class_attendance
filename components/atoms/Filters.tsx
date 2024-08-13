import { ColumnDef, Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./databa-table-filters";

interface DataTableToolbarProps<TData, TValue> {
  table: Table<TData>;
  filterField: keyof TData;
  title: string;
  user_options?: { label: string; value: string }[];
}

export function FieldFilter<TData, TValue>({
  table,
  filterField,
  title,
  user_options,
}: DataTableToolbarProps<TData, TValue> & {}) {
  const field: string = filterField as string;

  const data = table.getColumn(field)?.getFacetedUniqueValues();

  let options: { label: string; value: string }[] = [];
  for (let [key, value] of data || []) {
    options.push({ label: key, value: key });
  }

  return (
    table.getColumn(field) && (
      <DataTableFacetedFilter
        column={table.getColumn(field)}
        title={title}
        options={user_options ?? options}
      />
    )
  );
}

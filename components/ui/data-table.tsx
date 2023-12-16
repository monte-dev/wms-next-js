import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	onRowClick?: (row: TData) => void;
	selectedProduct?: TData | null;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	onRowClick,
	selectedProduct,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="flex items-center rounded-md border">
			<Table>
				<TableHeader className="border-2 border-b-slate-500">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead
									key={header.id}
									className="bg-gray-200 text-center font-bold"
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody className="text-center">
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row, index) => {
							const isSelected = row.original === selectedProduct;

							return (
								<TableRow
									key={row.id}
									data-state={
										row.getIsSelected() ? 'selected' : ''
									}
									onClick={() =>
										onRowClick && onRowClick(row.original)
									}
									className={cn(
										index % 2 === 1 && 'bg-gray-200',
										isSelected && 'bg-black text-white',
										'hover:bg-slate-500 hover:text-white'
									)}
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
	);
}

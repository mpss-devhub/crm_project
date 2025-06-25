import React, { useState } from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

export type ColumnDefinition<T> = {
    key: keyof T;
    header: string;
    render?: (item: T, index?: number) => React.ReactNode;
    sortable?: boolean;
    width?: string;
    align?: 'left' | 'center' | 'right';
};

export type TableProps<T> = {
    columns: ColumnDefinition<T>[];
    data: T[];
    itemsPerPage?: number;
    className?: string;
    rowClassName?: string | ((item: T, index: number) => string);
    onRowClick?: (item: T) => void;
    emptyState?: React.ReactNode;
};

export function Table<T>({
    columns,
    data,
    itemsPerPage = 10,
    className = '',
    rowClassName = '',
    onRowClick,
    emptyState = <div className="py-8 text-center text-gray-500">No data available</div>,
}: TableProps<T>) {
    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: 'asc' | 'desc';
    } | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const sortedData = React.useMemo(() => {
        if (!sortConfig || !data.length) return data;

        const data0 = data[0];
        if (typeof data0 !== 'object' || data0 === null) return data;

        const isDataKey = sortConfig.key in data0;
        if (!isDataKey) return data;
        return [...data].sort((a, b) => {
            const aValue = a[sortConfig.key as keyof T];
            const bValue = b[sortConfig.key as keyof T];

            if (aValue === bValue) return 0;
            if (aValue === null || aValue === undefined) return 1;
            if (bValue === null || bValue === undefined) return -1;

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortConfig.direction === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            return sortConfig.direction === 'asc'
                ? aValue < bValue ? -1 : 1
                : aValue < bValue ? 1 : -1;
        });
    }, [data, sortConfig]);

    const paginatedData = React.useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedData, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const requestSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        setCurrentPage(1);
    };

    const getRowClass = (item: T, index: number) => {
        const baseClass = 'hover:bg-gray-50 transition-colors';
        const customClass = typeof rowClassName === 'function'
            ? rowClassName(item, index)
            : rowClassName;

        return `${baseClass} ${customClass} ${onRowClick ? 'cursor-pointer' : ''}`;
    };

    return (
        <div className={`flex flex-col ${className}`}>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr className='bg-[#71CCE8]'>
                            {columns.map((column) => (
                                <th
                                    key={column.key as string}
                                    scope="col"
                                    style={{ width: column.width }}
                                    className={`px-6 py-3 text-${column.align || 'left'} text-xs font-bold  text-gray-500 tracking-wider ${column.sortable ? 'cursor-pointer hover:bg-gray-100 hover:text-[#71CCE8]' : ''
                                        }`} onClick={() => column.sortable && requestSort(column.key as string)}

                                >
                                    <div className="flex justify-between items-center w-full">
                                        <div className="truncate pr-2">{column.header}</div>
                                        {column.sortable && (
                                            <span className="shrink-0">
                                                {sortConfig?.key === column.key ? (
                                                    sortConfig.direction === 'asc' ? (
                                                        <FaSortUp className="w-3 h-3" />
                                                    ) : (
                                                        <FaSortDown className="w-3 h-3" />
                                                    )
                                                ) : (
                                                    <FaSort className="w-3 h-3 text-gray-300" />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedData.length > 0 ? (
                        paginatedData.map((item, index) => (
                            <tr
                                key={index}
                                className={getRowClass(item, index)}
                                onClick={() => onRowClick && onRowClick(item)}
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.key as string}
                                        className={`px-6 py-4 whitespace-nowrap text-sm ${column.align === 'right' ? 'text-right' :
                                            column.align === 'center' ? 'text-center' : 'text-left'
                                            }`}
                                    >
                                        {column.render
                                            ? column.render(item, index)
                                            : (item[column.key as keyof T] as React.ReactNode)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-4">
                                {emptyState}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

            {
        totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 px-4">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                        <span className="font-medium">
                            {Math.min(currentPage * itemsPerPage, sortedData.length)}
                        </span>{' '}
                        of <span className="font-medium">{sortedData.length}</span> results
                    </p>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded-md text-sm disabled:opacity-50 hover:bg-gray-50"
                    >
                        Previous
                    </button>
                    <span className="px-3 py-1 text-sm">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded-md text-sm disabled:opacity-50 hover:bg-gray-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        )
    }
        </div >
    );
}

import React from 'react';


export interface ColumnDef<T> {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode); 
}

interface TableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
    isLoading?: boolean;
    emptyMessage?: string;
}

export function Table<T>({ 
    columns, 
    data, 
    isLoading = false, 
    emptyMessage = "No data available." 
    }: TableProps<T>) {

    if (isLoading) {
        return (
            <div className="w-full h-64 flex items-center justify-center border border-white/5 rounded-3xl bg-white/2 backdrop-blur-sm">
                <div className="relative">
                    <div className="absolute inset-0 rounded-full blur-[10px] bg-[#FFC229]/30 animate-pulse"></div>
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#FFC229] relative z-10"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-3xl border border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md shadow-2xl custom-scrollbar selection:bg-[#FFC229] selection:text-[#4A2B5E]">
            <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-white/5">
                    <tr>
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                scope="col"
                                className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest"
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-transparent">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="px-6 py-12 text-center text-sm font-medium text-gray-500 bg-white/[0.01]">
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-white/3 transition-colors duration-300 group">
                                {columns.map((col, colIndex) => {
                                    let cellContent;
                                    if (typeof col.accessor === 'function') {
                                        cellContent = col.accessor(row);
                                    } else {
                                        const value = row[col.accessor];
                                        
                                        // Handle null/undefined first
                                        if (value === null || value === undefined) {
                                            cellContent = '-';
                                        }
                                        // Handle Firestore Timestamps
                                        else if (value && typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
                                            try {
                                                const date = (value.toDate as () => Date)();
                                                cellContent = date ? date.toLocaleString() : '-';
                                            } catch (e) {
                                                console.error('Error converting Firestore Timestamp:', e);
                                                cellContent = '-';
                                            }
                                        }
                                        // Handle Date objects
                                        else if (value instanceof Date) {
                                            cellContent = value.toLocaleString();
                                        }
                                        // Handle everything else
                                        else {
                                            cellContent = String(value);
                                        }
                                    }
                                    
                                    return (
                                        <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                                            {cellContent}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
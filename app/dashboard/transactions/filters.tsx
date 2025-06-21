'use client';

import { format } from 'date-fns';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Filters({
                                    year,
                                    month,
                                    yearsRange
                                }: {
    year: number,
    month: number,
    yearsRange: number[]
}) {

    const [selectedMonth, setSelectedMonth] = useState(month);
    const [selectedYear, setSelectedYear] = useState(year);

    return (
        <div className={'flex gap-1'}>
            <Select onValueChange={(newValue) => setSelectedMonth(Number(newValue))} value={selectedMonth.toString()}>
                <SelectTrigger>
                    <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                    {
                        Array.from({ length: 12 }).map((_, i) => (
                            <SelectItem value={`${i + 1}`} key={i}>
                                {format(new Date(selectedYear, i, 1), 'MMM')}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
            <Select onValueChange={(newValue) => setSelectedYear(Number(newValue))} value={selectedYear.toString()}>
                <SelectTrigger>
                    <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                    {
                        yearsRange.map((year) => (
                            <SelectItem value={year.toString()} key={year}>
                                {year}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
            <Button asChild>
                <Link href={`/dashboard/transactions?year=${selectedYear}&month=${selectedMonth}`}>Go</Link>
            </Button>
        </div>
    );
}
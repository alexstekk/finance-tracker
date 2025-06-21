'use client';

import { useRouter } from 'next/navigation';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CashflowFiltersProps {
    year: number,
    yearsRange: number[]
}

export default function CashflowFilters({ year, yearsRange }: CashflowFiltersProps) {

    const router = useRouter();

    return (
        <div>
            <Select defaultValue={year.toString()} onValueChange={(newValue) => {
                router.push(`/dashboard?cfyear=${newValue}`);
            }}>
                <SelectTrigger>
                    <SelectValue></SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {yearsRange.map((year) => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );

}
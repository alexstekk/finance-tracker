'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { ChartContainer } from '@/components/ui/chart';

export function CashflowContent({ annualCashflow }: {
    annualCashflow: { month: number; income: number, expenes: number }[]
}) {
    return (
        <ChartContainer
            config={{
                income: {
                    label: 'Income',
                    color: '#84cc16'
                },
                expenses: {
                    label: 'Expenses',
                    color: '#f97316'
                }
            }}
            className={'w-full h-[300px]'}
        >
            <BarChart data={annualCashflow}>
                <CartesianGrid vertical={false}/>
                <XAxis/>
                <YAxis/>
                <Bar dataKey={'income'} radius={4} fill={'var(--color-income)'}/>
                <Bar dataKey={'expenses'} radius={4} fill={'var(--color-expenses)'}/>
            </BarChart>
        </ChartContainer>
    );

}
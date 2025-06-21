'use client';

import { format } from 'date-fns';
import numeral from 'numeral';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export function CashflowContent({ annualCashflow }: {
    annualCashflow: { month: number; income: number, expenes: number }[]
}) {

    const today = new Date();

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
                <XAxis tickFormatter={(value) => {
                    return format(new Date(today.getFullYear(), value, 1), 'MMM');
                }}/>
                <YAxis tickFormatter={(value) => {
                    return `$${numeral(value).format('0,0')}`;
                }}/>
                <ChartTooltip content={
                    <ChartTooltipContent labelFormatter={(value, payload) => {
                        const month = payload[0]?.payload?.month;
                        return (
                            <div>{format(new Date(today.getFullYear(), month - 1, 1), 'MMM')}</div>
                        );
                    }}/>
                }/>
                <ChartLegend verticalAlign={'top'} align={'right'} height={30} iconType={'circle'}
                             formatter={(value) => {
                                 return <span className={'capitalize text-primary'}>{value}</span>;
                             }}/>
                <Bar dataKey={'income'} radius={4} fill={'var(--color-income)'}/>
                <Bar dataKey={'expenses'} radius={4} fill={'var(--color-expenses)'}/>
            </BarChart>
        </ChartContainer>
    );

}
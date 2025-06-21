import { format } from 'date-fns';
import { PencilIcon } from 'lucide-react';
import Link from 'next/link';
import numeral from 'numeral';
import { z } from 'zod';

import Filters from '@/app/dashboard/transactions/filters';
import { Badge } from '@/components/ui/badge';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getTransactionYearsRange } from '@/data/getTransactionYearsRange';
import { getTransactionsByMonth } from '@/data/getTransactionsByMonth';


const today = new Date();

const searchParamsSchema = z.object({
    year: z.coerce.number().min(today.getFullYear() - 100).max(today.getFullYear() + 1).catch(today.getFullYear()),
    month: z.coerce.number().min(1).max(12).catch(today.getMonth()),
});

export default async function TransactionPage({ searchParams }: {
    searchParams: Promise<{ year?: string; month?: string }>
}) {

    const searchParamsValue = await searchParams;

    const { year, month } = searchParamsSchema.parse(searchParamsValue);

    const selectedDate = new Date(year, month - 1, 1);

    const transactions = await getTransactionsByMonth({ month, year });

    const yearsRange = await getTransactionYearsRange();

    return (
        <div className={'max-w-screen-xl mx-auto py-10'}>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={'/dashboard'}>Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Transactions</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Card className={'mt-4'}>
                <CardHeader>
                    <CardTitle className={'flex justify-between'}>
                        <span>{format(selectedDate, 'MMM yyyy')} Transactions</span>
                        <div>
                            <Filters year={year} month={month} yearsRange={yearsRange ?? []}/>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href={'/dashboard/transactions/new'}>
                            New Transaction
                        </Link>
                    </Button>
                    {!transactions?.length &&
                        <p className={'text-center p-10 text-lg text-muted-foreground'}>There are no transactions for
                            this month</p>}
                    {
                        !!transactions?.length &&
                        <Table className={'mt-4 '}>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        Date
                                    </TableHead>
                                    <TableHead>
                                        Description
                                    </TableHead>
                                    <TableHead>
                                        Type
                                    </TableHead>
                                    <TableHead>
                                        Category
                                    </TableHead>
                                    <TableHead>
                                        Amount
                                    </TableHead>
                                    <TableHead/>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map(t => (
                                    <TableRow key={t.id}>
                                        <TableCell>
                                            {format(t.transactionDate, 'do MMM yyyy')}
                                        </TableCell>
                                        <TableCell>
                                            {t.description}
                                        </TableCell>
                                        <TableCell className={'capitalize'}>
                                            <Badge
                                                className={t.transactionType === 'income' ? 'bg-lime-500' : 'bg-orange-500'}>
                                                {t.transactionType}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {t.category}
                                        </TableCell>
                                        <TableCell>
                                            {numeral(t.amount).format('$0,0[.]00')}
                                        </TableCell>
                                        <TableCell className={'text-right'}>
                                            <Button variant={'outline'} asChild size={'icon'}
                                                    aria-label={'Edit transaction'}>
                                                <Link href={`/dashboard/transactions/${t.id}`}>
                                                    <PencilIcon/>
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    }
                </CardContent>
            </Card>
        </div>
    );
}
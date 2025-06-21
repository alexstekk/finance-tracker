import { format } from 'date-fns';
import Link from 'next/link';
import numeral from 'numeral';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getRecentTransactions } from '@/data/getRecentTransactions';


export default async function RecentTransactions() {

    const transactions = await getRecentTransactions();

    return (
        <Card>
            <CardHeader>
                <CardTitle className={'flex justify-between'}>
                    <span>Recent Transactions</span>
                    <div className={'flex gap-2'}>
                        <Button asChild variant={'outline'}>
                            <Link href={'/dashboard/transactions'}>
                                View all
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={'/dashboard/transactions/new'}>
                                Create new
                            </Link>
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {!transactions?.length &&
                    <p className={'text-center p-10 text-lg text-muted-foreground'}>There are no transactions</p>}
                {!!transactions?.length &&
                    <Table className={'mt-4'}>
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
            </CardContent>
        </Card>
    );
}
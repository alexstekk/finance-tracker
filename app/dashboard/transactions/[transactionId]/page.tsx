import { notFound } from 'next/navigation';

import DeleteTransactionDialog from '@/app/dashboard/transactions/[transactionId]/delete-transaction-dialog';
import EditTransactionForm from '@/app/dashboard/transactions/[transactionId]/edit-transaction-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCategories } from '@/data/getCategories';
import { getTransaction } from '@/data/getTransaction';

export default async function EditTransactionPage({
                                                      params
                                                  }: {
    params: Promise<{ transactionId: string }>
}) {

    const paramsValues = await params;

    const transactionId = Number(paramsValues.transactionId);

    if (isNaN(transactionId)) {
        notFound();
    }

    const categories = await getCategories();
    const transaction = await getTransaction(transactionId);

    if (!transaction) {
        notFound();
    }

    return (
        <div className={'max-w-screen-xl mx-auto py-10'}>
            <Card className={'mt-4 max-w-screen-md'}>
                <CardHeader>
                    <CardTitle className={'flex justify-between'}>
                        <span>Edit Transaction</span>
                        <DeleteTransactionDialog transactionDate={transaction.transactionDate}
                                                 transactionId={transaction.id}/>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <EditTransactionForm categories={categories} transaction={transaction}/>
                </CardContent>
            </Card>
        </div>
    );
}
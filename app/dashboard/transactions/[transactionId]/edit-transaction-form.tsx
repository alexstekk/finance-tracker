'use client';

import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';

import { createTransaction } from '@/app/dashboard/transactions/new/actions';
import TransactionForm, { transactionFormSchema } from '@/components/transaction-form';
import { type Category } from '@/types/Category';

export default function EditTransactionForm({
                                                categories,
                                                transaction
                                            }: {
    categories: Category[],
    transaction: {
        id: number,
        categoryId: number;
        amount: string;
        description: string;
        transactionDate: string;
    }
}) {

    const router = useRouter();

    const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
        const result: any = {};

        if (result.error) {
            toast.error(result.message);
            return;
        }

        toast.success('Transaction updated');

        router.push(`/dashboard/transactions?month=${data.transactionDate.getMonth() + 1}&year=${data.transactionDate.getFullYear()}`);
    };

    return <TransactionForm defaultValues={{
        amount: Number(transaction.amount),
        categoryId: transaction.categoryId,
        description: transaction.description,
        transactionDate: new Date(transaction.transactionDate),
        transactionType: categories.find((c) => c.id === transaction.categoryId)?.type ?? 'income',
    }} categories={categories} onSubmit={handleSubmit}/>;
}
'use client';

import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';

import { createTransaction } from '@/app/dashboard/transactions/new/actions';
import TransactionForm, { transactionFormSchema } from '@/components/transaction-form';
import { type Category } from '@/types/Category';

export default function NewTransactionForm({
                                               categories
                                           }: {
    categories: Category[]
}) {

    const router = useRouter();

    const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
        const result = await createTransaction({
            ...data,
            transactionDate: format(data.transactionDate, 'yyyy-MM-dd'),
        });

        if (result.error) {
            toast.error(result.message);
            return;
        }

        toast.success('Transaction created');

        // new Date('2025-1-1') -> 1st jan 2025
        // new Date(2025,1,1) -> 1st feb 2025

        router.push(`/dashboard/transactions?month=${data.transactionDate.getMonth() + 1}&year=${data.transactionDate.getFullYear()}`);
    };

    return <TransactionForm categories={categories} onSubmit={handleSubmit}/>;
}
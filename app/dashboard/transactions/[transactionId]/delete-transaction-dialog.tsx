'use client';

import { Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { deleteTransaction } from '@/app/dashboard/transactions/[transactionId]/actions';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export default function DeleteTransactionDialog({ transactionId, transactionDate }: {
    transactionId: number;
    transactionDate: string;
}) {

    const router = useRouter();

    const handleDeleteConfirm = async () => {
        const result = await deleteTransaction(transactionId);

        if (result?.error) {
            toast.error(result.message);
            return;
        }

        toast.success('Transaction deleted');

        const [year, month] = transactionDate.split('-');

        router.push(`/dashboard/transactions?year=${year}&month=${month}`);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size={'icon'} variant={'destructive'}>
                    <Trash2Icon/>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your transaction from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button variant={'destructive'} onClick={handleDeleteConfirm}>
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
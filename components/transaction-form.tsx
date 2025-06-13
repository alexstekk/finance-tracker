'use client'

import {z} from "zod";
import {addDays} from "date-fns";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const transactionFormShema = z.object({
    transactionType: z.enum(['income', 'expense']),
    categoryId: z.coerce.number().positive('Please select a category'),
    transactionDate: z.coerce.date().max(addDays(new Date(), 1), 'Transactions day cannot be in the future'),
    amount: z.coerce.number().positive('Amount must be greater then 0'),
    description: z.string().min(3, 'Description must contain at least 3 characters').max(300, 'Description must contain a max of 300 characters')
})

export default function TransactionForm() {

    const form = useForm<z.infer<typeof transactionFormShema>>({
        resolver: zodResolver(transactionFormShema),
        defaultValues: {
            amount: 0,
            categoryId: 0,
            description: '',
            transactionDate: new Date(),
            transactionType: 'income',
        }
    })

    return <div>transaction form</div>
}
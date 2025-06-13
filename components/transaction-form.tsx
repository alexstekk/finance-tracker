'use client'

import {z} from "zod";
import {addDays} from "date-fns";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const transactionFormSchema = z.object({
    transactionType: z.enum(['income', 'expense']),
    categoryId: z.coerce.number().positive('Please select a category'),
    transactionDate: z.coerce.date().max(addDays(new Date(), 1), 'Transactions day cannot be in the future'),
    amount: z.coerce.number().positive('Amount must be greater then 0'),
    description: z.string().min(3, 'Description must contain at least 3 characters').max(300, 'Description must contain a max of 300 characters')
})

export default function TransactionForm() {

    const form = useForm<z.infer<typeof transactionFormSchema>>({
        resolver: zodResolver(transactionFormSchema),
        defaultValues: {
            amount: 0,
            categoryId: 0,
            description: '',
            transactionDate: new Date(),
            transactionType: 'income',
        }
    })

    const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
        console.log(data);
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <fieldset className={'grid grid-cols-2 gap-y-5 gap-x-2'}>
                <FormField
                    control={form.control}
                    name='transactionType'
                    render={({field}) => {
                        return (
                            <FormItem>
                                <FormLabel>Transaction Type</FormLabel>
                                <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={'income'}>
                                                Income
                                            </SelectItem>
                                            <SelectItem value={'expense'}>
                                                Expense
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                    }}/>
                <FormField
                    control={form.control}
                    name='categoryId'
                    render={({field}) => {
                        return (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Select value={field.value.toString()} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue/>
                                        </SelectTrigger>
                                        <SelectContent>
                                             
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                    }}/>
            </fieldset>
        </form>
    </Form>
}
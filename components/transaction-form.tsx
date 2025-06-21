'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type Category } from '@/types/Category';

export const transactionFormSchema = z.object({
    transactionType: z.enum(['income', 'expense']),
    categoryId: z.coerce.number().positive('Please select a category'),
    transactionDate: z.coerce.date().max(addDays(new Date(), 1), 'Transactions day cannot be in the future'),
    amount: z.coerce.number().positive('Amount must be greater then 0'),
    description: z.string().min(3, 'Description must contain at least 3 characters').max(300, 'Description must contain a max of 300 characters')
});

interface TransactionFormProps {
    categories: Category[],
    onSubmit: (data: z.infer<typeof transactionFormSchema>) => Promise<void>,
    defaultValues?: {
        transactionType: 'income' | 'expense',
        amount: number;
        categoryId: number;
        description: string;
        transactionDate: Date;
    }
}

export default function TransactionForm({
                                            categories,
                                            onSubmit,
                                            defaultValues
                                        }: TransactionFormProps) {

    const form = useForm<z.infer<typeof transactionFormSchema>>({
        resolver: zodResolver(transactionFormSchema),
        defaultValues: {
            amount: 0,
            categoryId: 0,
            description: '',
            transactionDate: new Date(),
            transactionType: 'income',
            ...defaultValues,
        }
    });

    // const handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    //     onSubmit(data);
    // };

    const filteredCategories = categories.filter(category => category.type === form.getValues('transactionType'));

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset disabled={form.formState.isSubmitting} className={'grid grid-cols-2 gap-y-5 gap-x-2'}>
                <FormField
                    control={form.control}
                    name='transactionType'
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Transaction Type</FormLabel>
                                <FormControl>
                                    <Select value={field.value} onValueChange={(newValue) => {
                                        field.onChange(newValue);
                                        form.setValue('categoryId', 0);
                                    }}>
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
                        );
                    }}/>
                <FormField
                    control={form.control}
                    name='categoryId'
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Select value={field.value.toString()} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {filteredCategories.map(c =>
                                                (
                                                    <SelectItem value={c.id.toString()} key={c.id}>
                                                        {c.name}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        );
                    }}/>
                <FormField
                    control={form.control}
                    name='transactionDate'
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Transaction Date</FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                data-empty={!field.value}
                                                className="w-full  data-[empty=true]:text-muted-foreground  justify-start text-left font-normal"
                                            >
                                                <CalendarIcon/>
                                                {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" selected={field.value} onSelect={field.onChange}
                                                      disabled={{
                                                          after: new Date(),
                                                      }}/>
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        );
                    }}/>

                <FormField
                    control={form.control}
                    name='amount'
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input  {...field} type={'number'}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        );
                    }}/>
            </fieldset>
            <fieldset disabled={form.formState.isSubmitting} className={'mt-5 flex flex-col gap-5'}>
                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        );
                    }}/>
                <Button type={'submit'}>Submit</Button>
            </fieldset>
        </form>
    </Form>;
}
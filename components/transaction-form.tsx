'use client'

import {z} from "zod";
import {addDays, format} from "date-fns";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Popover, PopoverContent, PopoverTrigger} from "./ui/popover";
import {Button} from "./ui/button";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "./ui/calendar";
import {Input} from "@/components/ui/input";

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
        console.log({data});
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
                <FormField
                    control={form.control}
                    name='transactionDate'
                    render={({field}) => {
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
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
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
                        )
                    }}/>

                <FormField
                    control={form.control}
                    name='amount'
                    render={({field}) => {
                        return (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input  {...field} type={'number'}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                    }}/>
            </fieldset>
            <fieldset className={'mt-5 flex flex-col gap-5'}>
                <FormField
                    control={form.control}
                    name='description'
                    render={({field}) => {
                        return (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input  {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                    }}/>
                <Button type={'submit'}>Submit</Button>
            </fieldset>
        </form>
    </Form>
}
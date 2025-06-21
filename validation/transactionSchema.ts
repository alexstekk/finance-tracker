import { addDays, subYears } from 'date-fns';
import { z } from 'zod';

export const transactionSchema = z.object({
    amount: z.number().positive(''),
    description: z.string().min(3, 'Description must contain at least 3 characters')
        .max(300, 'Description must contain a max of 300 characters'),
    categoryId: z.coerce.number().positive('Category ID is invalid'),
    transactionDate: z.coerce.date().min(subYears(new Date(), 100))
        .max(addDays(new Date(), 1)),
}); 
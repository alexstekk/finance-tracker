import Link from 'next/link';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCategories } from '@/data/getCategories';

export default async function EditTransactionPage({
                                                      params
                                                  }: {
    params: Promise<{ transactionId: string }>
}) {

    const paramsValues = await params;

    const transactionId = Number(paramsValues.transactionId);

    if (isNaN(transactionId)) {
        return <div>oops! transaction not found</div>;
    }

    const categories = await getCategories();

    return (
        <div className={'max-w-screen-xl mx-auto py-10'}>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={'/dashboard'}>Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={'/dashboard/transactions'}>Transactions</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit Transactions</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Card className={'mt-4 max-w-screen-md'}>
                <CardHeader>
                    <CardTitle>Edit Transaction</CardTitle>
                </CardHeader>
                <CardContent>
                    Edit form
                </CardContent>
            </Card>
        </div>
    );
}
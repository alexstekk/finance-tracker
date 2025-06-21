import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { getAnnualCashflow } from '@/data/getAnnualCashflow';

export default async function Cashflow() {

    const cashflow = getAnnualCashflow(2025);

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    
                </CardTitle>
            </CardHeader>
        </Card>
    );
}
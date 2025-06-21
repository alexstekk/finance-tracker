import Cashflow from '@/app/dashboard/cashflow';
import RecentTransactions from '@/app/dashboard/recent-transactions';

export default function DashboardPage() {
    return (
        <div className={'max-w-screen-xl mx-auto py-5'}>
            <h1 className={'text-4xl font-semibold pb-5'}>Dashboard</h1>
            <Cashflow/>
            <RecentTransactions/>
        </div>
    );
}
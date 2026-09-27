import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>

        <p className="text-muted-foreground">Here's your financial overview.</p>
      </div>

      {/* Balance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-3xl font-bold">₹3,50,000</p>

          <p className="mt-1 text-sm text-muted-foreground">Across all accounts</p>
        </CardContent>
      </Card>

      {/* Monthly overview */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Income</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">₹37,500</p>

            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">₹10,120</p>

            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Saved</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">₹27,380</p>

            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Accounts</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Salary Account</p>

              <p className="text-sm text-muted-foreground">Bank</p>
            </div>

            <p className="font-semibold">₹2,80,000</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Secondary Account</p>

              <p className="text-sm text-muted-foreground">Bank</p>
            </div>

            <p className="font-semibold">₹50,000</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Cash</p>

              <p className="text-sm text-muted-foreground">Cash</p>
            </div>

            <p className="font-semibold">₹20,000</p>
          </div>
        </CardContent>
      </Card>

      {/* Recent transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Transaction name="Dinner" category="Food" amount="-₹320" />

          <Separator />

          <Transaction name="Petrol" category="Transport" amount="-₹800" />

          <Separator />

          <Transaction name="Mutual Fund" category="Investment" amount="-₹2,000" />
        </CardContent>
      </Card>
    </div>
  );
}

function Transaction({ name, category, amount }: { name: string; category: string; amount: string }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{name}</p>

        <p className="text-sm text-muted-foreground">{category}</p>
      </div>

      <p className="font-medium">{amount}</p>
    </div>
  );
}

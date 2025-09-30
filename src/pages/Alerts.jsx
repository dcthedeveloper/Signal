import { Bell, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '../components/shared/ui';

const Alerts = () => {
  const mockAlerts = [
    { id: 1, name: 'AAPL Price Target', ticker: 'AAPL', condition: 'Price > $180', status: 'active' },
    { id: 2, name: 'TSLA Volume Spike', ticker: 'TSLA', condition: 'Volume > 100M', status: 'active' },
    { id: 3, name: 'Market Volatility', ticker: 'VIX', condition: 'VIX > 20', status: 'triggered' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Alerts</h1>
        <p className="text-muted-foreground">
          Smart notifications for your portfolio
        </p>
      </div>

      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                Demo Mode - Alerts Disabled
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Alert functionality is view-only in the demo. Upgrade to enable real-time notifications and custom alert rules.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Example Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-semibold">{alert.name}</div>
                  <div className="text-sm text-muted-foreground">{alert.condition}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={alert.status === 'active' ? 'success' : 'warning'}>
                    {alert.status}
                  </Badge>
                  <span className="font-mono font-semibold">{alert.ticker}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;

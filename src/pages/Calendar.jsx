import { Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/shared/ui';

const Calendar = () => {
  const upcomingEvents = [
    { date: '2024-01-15', company: 'Apple Inc.', ticker: 'AAPL', type: 'Earnings', estimate: '$2.10' },
    { date: '2024-01-20', company: 'Microsoft Corp.', ticker: 'MSFT', type: 'Earnings', estimate: '$2.83' },
    { date: '2024-01-25', company: 'Tesla Inc.', ticker: 'TSLA', type: 'Earnings', estimate: '$1.15' },
    { date: '2024-02-01', company: 'Fed Meeting', ticker: '-', type: 'Economic Event', estimate: '-' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Market Calendar</h1>
        <p className="text-muted-foreground">
          Upcoming earnings, economic events, and market catalysts
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</div>
                    <div className="text-2xl font-bold">{new Date(event.date).getDate()}</div>
                  </div>
                  <div>
                    <div className="font-semibold">{event.company}</div>
                    <div className="text-sm text-muted-foreground">{event.type}</div>
                  </div>
                </div>
                <div className="text-right">
                  {event.ticker !== '-' && (
                    <div className="font-mono font-semibold">{event.ticker}</div>
                  )}
                  {event.estimate !== '-' && (
                    <div className="text-sm text-muted-foreground">Est: {event.estimate}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;

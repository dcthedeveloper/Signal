import { RotateCcw, Moon, Sun } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '../components/shared/ui';
import useStore from '../store/useStore';

const Settings = () => {
  const { theme, setTheme, resetDemo } = useStore();

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all demo data? This cannot be undone.')) {
      resetDemo();
      window.location.href = '/';
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your preferences and demo data
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Theme</div>
              <div className="text-sm text-muted-foreground">
                Choose your preferred color scheme
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme('light')}
                className="gap-2"
              >
                <Sun className="h-4 w-4" />
                Light
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTheme('dark')}
                className="gap-2"
              >
                <Moon className="h-4 w-4" />
                Dark
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="text-red-600">Reset Demo Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This will clear all your demo portfolio data, chat history, and reset the application to its initial state. This action cannot be undone.
          </p>
          <Button
            variant="destructive"
            onClick={handleReset}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Demo Data
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Signal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Version</h3>
            <p className="text-sm text-muted-foreground">1.0.0</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {['React 18', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'Zustand', 'Claude AI'].map((tech) => (
                <span key={tech} className="px-2 py-1 bg-muted rounded text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Data Sources</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Alpha Vantage - Real-time stock quotes</li>
              <li>• Finnhub - Financial news and earnings</li>
              <li>• NewsAPI - Market news aggregation</li>
              <li>• Anthropic Claude - AI analysis</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { useState } from 'react';

const initialConnectors = [
  {
    name: 'Facebook',
    icon: <Facebook className="h-8 w-8 text-[#1877F2]" />,
    description: 'Connect your Facebook pages to manage posts and comments.',
    connected: false,
  },
  {
    name: 'Instagram',
    icon: <Instagram className="h-8 w-8 text-[#E4405F]" />,
    description:
      'Connect your Instagram account to schedule posts and view analytics.',
    connected: false,
  },
  {
    name: 'X (Twitter)',
    icon: <Twitter className="h-8 w-8 text-[#1DA1F2]" />,
    description:
      'Connect your X account to manage tweets and monitor engagement.',
    connected: false,
  },
  {
    name: 'LinkedIn',
    icon: <Linkedin className="h-8 w-8 text-[#0A66C2]" />,
    description: 'Connect your LinkedIn profile or company page.',
    connected: false,
  },
];

type Connector = (typeof initialConnectors)[0] & { isConnecting?: boolean };

const ConnectorsPage = () => {
  const [connectors, setConnectors] = useState<Connector[]>(initialConnectors);

  const handleConnect = (name: string) => {
    // Set connecting state
    setConnectors(prev =>
      prev.map(c => (c.name === name ? { ...c, isConnecting: true } : c))
    );

    // Simulate API call
    setTimeout(() => {
      setConnectors(prev =>
        prev.map(c =>
          c.name === name ? { ...c, isConnecting: false, connected: true } : c
        )
      );
    }, 1500); // 1.5 second delay
  };

  const getButtonText = (connector: Connector) => {
    if (connector.connected) return 'Connected';
    if (connector.isConnecting) return 'Connecting...';
    return 'Connect';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Social Connectors</h1>
        <p className="text-muted-foreground">
          Manage your connected social media accounts.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {connectors.map(connector => (
          <Card key={connector.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                {connector.name}
              </CardTitle>
              {connector.icon}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {connector.description}
              </p>
              <Button
                className="w-full"
                disabled={connector.connected || connector.isConnecting}
                onClick={() => handleConnect(connector.name)}
              >
                {getButtonText(connector)}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ConnectorsPage;

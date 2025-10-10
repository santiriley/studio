'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function WebhookSettings() {
    const { toast } = useToast();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      toast({
          title: 'Settings Saved',
          description: 'Your webhook configurations have been updated.',
      });
    };

  return (
    <form onSubmit={handleSubmit}>
        <Card>
        <CardHeader>
            <CardTitle>Webhooks</CardTitle>
            <CardDescription>
            Send notifications to your Slack or other services.
            </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <div className="grid gap-2">
            <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
            <Input
                id="slack-webhook"
                placeholder="https://hooks.slack.com/services/..."
            />
            </div>
            <div className="grid gap-2">
            <Label htmlFor="email-webhook">Email Webhook URL</Label>
            <Input
                id="email-webhook"
                placeholder="https://api.sendgrid.com/..."
            />
            </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
            <Button type="submit">Save Changes</Button>
        </CardFooter>
        </Card>
    </form>
  );
}

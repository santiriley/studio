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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

export function DigestSettings() {
  const { toast } = useToast();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
        title: 'Settings Saved',
        description: 'Your digest preferences have been updated.',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Email Digests</CardTitle>
          <CardDescription>
            Receive summaries of new clusters and top-performing companies.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="digest-enabled" className="flex flex-col space-y-1">
              <span>Enable Digests</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Turn on or off all email digests.
              </span>
            </Label>
            <Switch id="digest-enabled" defaultChecked />
          </div>

          <div className="grid gap-2">
            <Label>Frequency</Label>
            <RadioGroup defaultValue="weekly" className="flex gap-4">
              <div>
                <RadioGroupItem value="daily" id="daily" className="peer sr-only" />
                <Label
                  htmlFor="daily"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  Daily
                </Label>
              </div>
              <div>
                <RadioGroupItem value="weekly" id="weekly" className="peer sr-only" />
                <Label
                  htmlFor="weekly"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  Weekly
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </Card>
    </form>
  );
}

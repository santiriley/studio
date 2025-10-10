import { AppShell } from '@/components/app-shell';
import { DigestSettings } from '@/components/settings/digest-settings';
import { WebhookSettings } from '@/components/settings/webhook-settings';

export default function SettingsPage() {
  return (
    <AppShell pageTitle="Settings">
      <div className="max-w-3xl mx-auto grid gap-8">
        <DigestSettings />
        <WebhookSettings />
      </div>
    </AppShell>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function IngestionCard() {
  const { toast } = useToast();

  const handleUrlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get('url');
    toast({
      title: 'URL Submitted',
      description: `Ingesting data from: ${url}`,
    });
    (e.target as HTMLFormElement).reset();
  };
  
  const handleCsvUpload = () => {
    toast({
        title: 'CSV Uploaded',
        description: 'Processing company data from CSV file.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingest Companies</CardTitle>
        <CardDescription>Add new companies by URL or bulk upload a CSV.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="url">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url">
              <LinkIcon className="mr-2" />
              From URL
            </TabsTrigger>
            <TabsTrigger value="csv">
              <Upload className="mr-2" />
              From CSV
            </TabsTrigger>
          </TabsList>
          <TabsContent value="url" className="pt-4">
            <form onSubmit={handleUrlSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="url">Company or News URL</Label>
                <div className="flex gap-2">
                  <Input id="url" name="url" placeholder="https://example.com" required />
                  <Button type="submit">Ingest</Button>
                </div>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="csv" className="pt-4">
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed border-muted-foreground/30 p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Drag and drop your CSV file here or click to upload.
              </p>
              <Button onClick={handleCsvUpload}>Upload CSV</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

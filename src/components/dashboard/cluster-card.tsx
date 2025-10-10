'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { type Cluster } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Bot, FileText, Loader2 } from 'lucide-react';
import { getAISummary } from '@/lib/actions';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function ClusterCard({ cluster: initialCluster }: { cluster: Cluster }) {
  const [cluster, setCluster] = React.useState(initialCluster);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    const summary = await getAISummary({
      articleTitles: cluster.articles.map((a) => a.title),
      articleExcerpts: cluster.articles.map((a) => a.excerpt),
    });
    setCluster({ ...cluster, summary });
    setIsLoading(false);
  };

  const domain = new URL(cluster.canonicalArticle.url).hostname;
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start gap-3">
          <Image
            src={faviconUrl}
            alt={`${domain} favicon`}
            width={24}
            height={24}
            className="mt-1 rounded-sm"
            unoptimized
            data-ai-hint="company logo"
          />
          <div>
            <CardTitle className="font-headline text-lg">{cluster.canonicalArticle.title}</CardTitle>
            <CardDescription>{cluster.canonicalArticle.source}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        {cluster.summary ? (
          <p className="text-sm text-muted-foreground italic">"{cluster.summary}"</p>
        ) : (
          <p className="text-sm text-muted-foreground">{cluster.canonicalArticle.excerpt}</p>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="articles">
            <AccordionTrigger className="text-sm">
              {cluster.articles.length} Related Article{cluster.articles.length > 1 ? 's' : ''}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 pt-2">
                {cluster.articles.map((article) => (
                  <li key={article.id} className="flex items-start gap-2 text-sm">
                    <FileText className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-muted-foreground">
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {!cluster.summary && (
          <Button onClick={handleGenerateSummary} disabled={isLoading} className="w-full">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Bot className="mr-2 h-4 w-4" />
            )}
            Generate AI Summary
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

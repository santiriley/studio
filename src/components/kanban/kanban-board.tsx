'use client';

import * as React from 'react';
import Image from 'next/image';
import { type Company, type KanbanStage } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

type KanbanBoardProps = {
  stages: KanbanStage[];
  initialData: Record<KanbanStage, Company[]>;
};

function KanbanCard({ company }: { company: Company }) {
  return (
    <Card className="mb-4">
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
            <div className='flex items-center gap-3'>
                <Image
                    src={company.logoUrl}
                    alt={`${company.name} logo`}
                    width={24}
                    height={24}
                    className="rounded-sm"
                    data-ai-hint="company logo"
                />
                <CardTitle className="text-base font-medium">{company.name}</CardTitle>
            </div>
          <Badge variant="secondary">{company.score}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2">{company.description}</p>
        <Button variant="ghost" size="icon" className="h-6 w-6 float-right -mr-2 -mb-2">
            <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

function KanbanColumn({
  stage,
  companies,
}: {
  stage: KanbanStage;
  companies: Company[];
}) {
  return (
    <div className="flex-shrink-0 w-80">
      <Card className="bg-muted/50">
        <CardHeader className="p-4">
          <CardTitle className="text-lg font-semibold flex items-center justify-between">
            {stage}
            <span className="text-sm font-normal bg-background rounded-full px-2 py-0.5">{companies.length}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-4">
            {companies.map((company) => (
              <KanbanCard key={company.id} company={company} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function KanbanBoard({ stages, initialData }: KanbanBoardProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-6 pb-4">
        {stages.map((stage) => (
          <KanbanColumn key={stage} stage={stage} companies={initialData[stage] || []} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

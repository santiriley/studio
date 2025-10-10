'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, ArrowUpDown, ChevronDown } from 'lucide-react';
import type { Company } from '@/lib/types';
import { ScoreTuner } from './score-tuner';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Card, CardContent } from '../ui/card';

type StageVariant = 'default' | 'secondary' | 'destructive' | 'outline';

const stageColors: Record<Company['stage'], StageVariant> = {
  New: 'secondary',
  Review: 'default',
  Contacted: 'outline',
  Funded: 'default',
  Rejected: 'destructive',
};

export function CompaniesTable({ initialCompanies }: { initialCompanies: Company[] }) {
  const [companies, setCompanies] = React.useState(initialCompanies);
  const [filter, setFilter] = React.useState('');

  const filteredCompanies = React.useMemo(() => {
    return companies.filter(
      (company) =>
        company.name.toLowerCase().includes(filter.toLowerCase()) ||
        company.description.toLowerCase().includes(filter.toLowerCase())
    );
  }, [companies, filter]);

  const handleScoreChange = (companyId: string, newMetadata: Company['metadata']) => {
    setCompanies(prevCompanies =>
      prevCompanies.map(c => {
        if (c.id === companyId) {
          const newScore = Math.round(Object.values(newMetadata).reduce((sum, val) => sum + val, 0) / 4 * 100);
          return { ...c, metadata: newMetadata, score: newScore };
        }
        return c;
      })
    );
  };


  return (
    <Card>
        <CardContent className="p-0">
          <div className="flex items-center p-4">
              <Input
              placeholder="Filter companies..."
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="max-w-sm"
              />
          </div>
          <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>
                        <Button variant="ghost" className="-ml-4">
                        Score
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {filteredCompanies.map((company) => (
                    <TableRow key={company.id}>
                    <TableCell>
                        <div className="flex items-center gap-3">
                        <Image
                            src={company.logoUrl}
                            alt={`${company.name} logo`}
                            width={40}
                            height={40}
                            className="rounded-md"
                            data-ai-hint="company logo"
                        />
                        <div className="font-medium">{company.name}</div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="font-semibold text-base">{company.score}</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <ScoreTuner company={company} onScoreChange={handleScoreChange} />
                        </PopoverContent>
                        </Popover>
                    </TableCell>
                    <TableCell>
                        <Badge variant={stageColors[company.stage] || 'default'}>
                        {company.stage}
                        </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                        {company.description}
                    </TableCell>
                    <TableCell className="text-right">
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Add to Workflow</DropdownMenuItem>
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </div>
      </CardContent>
    </Card>
  );
}

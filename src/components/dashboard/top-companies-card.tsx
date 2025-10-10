import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Company } from '@/lib/types';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

type StageVariant = 'default' | 'secondary' | 'destructive' | 'outline';

const stageColors: Record<Company['stage'], StageVariant> = {
  New: 'secondary',
  Review: 'default',
  Contacted: 'outline',
  Funded: 'default',
  Rejected: 'destructive',
};

export function TopCompaniesCard({ companies }: { companies: Company[] }) {
  return (
    <Card>
      <CardHeader className='flex-row items-center justify-between'>
        <div>
            <CardTitle>Top Companies</CardTitle>
            <CardDescription>Highest scoring companies this week.</CardDescription>
        </div>
        <Link href="/companies" passHref>
            <Button variant="outline">
                View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Score</TableHead>
              <TableHead>Stage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={company.logoUrl}
                      alt={`${company.name} logo`}
                      width={32}
                      height={32}
                      className="rounded-md"
                      data-ai-hint="company logo"
                    />
                    <div className="font-medium">{company.name}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold">{company.score}</TableCell>
                <TableCell>
                  <Badge variant={stageColors[company.stage] || 'default'}>
                    {company.stage}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

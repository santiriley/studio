'use client';

import * as React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { type Company } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';

interface ScoreTunerProps {
  company: Company;
  onScoreChange: (companyId: string, newMetadata: Company['metadata']) => void;
}

export function ScoreTuner({ company, onScoreChange }: ScoreTunerProps) {
  const [scores, setScores] = React.useState(company.metadata);

  const handleSliderChange = (key: keyof Company['metadata'], value: number[]) => {
    const newScores = { ...scores, [key]: value[0] };
    setScores(newScores);
    onScoreChange(company.id, newScores);
  };

  const totalScore = Math.round(Object.values(scores).reduce((sum, val) => sum + val, 0) / 4 * 100);

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium font-headline leading-none">Tune Score for {company.name}</h4>
        <p className="text-sm text-muted-foreground">
          Adjust factors to recalculate the company score.
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="flex justify-between">
            <Label htmlFor="recency">Recency</Label>
            <span className="text-sm">{Math.round(scores.recency * 100)}</span>
          </div>
          <Slider
            id="recency"
            defaultValue={[scores.recency]}
            max={1}
            step={0.05}
            onValueChange={(v) => handleSliderChange('recency', v)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex justify-between">
            <Label htmlFor="momentum">Momentum</Label>
            <span className="text-sm">{Math.round(scores.momentum * 100)}</span>
          </div>
          <Slider
            id="momentum"
            defaultValue={[scores.momentum]}
            max={1}
            step={0.05}
            onValueChange={(v) => handleSliderChange('momentum', v)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex justify-between">
            <Label htmlFor="team">Team</Label>
            <span className="text-sm">{Math.round(scores.team * 100)}</span>
          </div>
          <Slider
            id="team"
            defaultValue={[scores.team]}
            max={1}
            step={0.05}
            onValueChange={(v) => handleSliderChange('team', v)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex justify-between">
            <Label htmlFor="idea">Idea</Label>
            <span className="text-sm">{Math.round(scores.idea * 100)}</span>
          </div>
          <Slider
            id="idea"
            defaultValue={[scores.idea]}
            max={1}
            step={0.05}
            onValueChange={(v) => handleSliderChange('idea', v)}
          />
        </div>
      </div>
      <div className="flex items-center justify-between font-bold text-lg">
        <span>Total Score:</span>
        <span>{totalScore}</span>
      </div>
    </div>
  );
}

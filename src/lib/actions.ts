'use server';

import {
  generateClusterSummary,
  type GenerateClusterSummaryInput,
} from '@/ai/flows/generate-cluster-summary';

export async function getAISummary(
  input: GenerateClusterSummaryInput
): Promise<string> {
  try {
    const { summary } = await generateClusterSummary(input);
    return summary;
  } catch (error) {
    console.error('Error generating AI summary:', error);
    return 'Failed to generate summary. Please try again.';
  }
}

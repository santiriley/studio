'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a short, AI-powered summary for a cluster of news articles.
 *
 * - generateClusterSummary - A function that generates a summary for a cluster of news articles.
 * - GenerateClusterSummaryInput - The input type for the generateClusterSummary function.
 * - GenerateClusterSummaryOutput - The output type for the generateClusterSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateClusterSummaryInputSchema = z.object({
  articleTitles: z.array(z.string()).describe('An array of article titles in the cluster.'),
  articleExcerpts: z.array(z.string()).describe('An array of article excerpts in the cluster.'),
});

export type GenerateClusterSummaryInput = z.infer<typeof GenerateClusterSummaryInputSchema>;

const GenerateClusterSummaryOutputSchema = z.object({
  summary: z.string().describe('A short, AI-powered summary of the cluster.'),
});

export type GenerateClusterSummaryOutput = z.infer<typeof GenerateClusterSummaryOutputSchema>;

export async function generateClusterSummary(input: GenerateClusterSummaryInput): Promise<GenerateClusterSummaryOutput> {
  return generateClusterSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateClusterSummaryPrompt',
  input: {schema: GenerateClusterSummaryInputSchema},
  output: {schema: GenerateClusterSummaryOutputSchema},
  prompt: `You are an AI assistant helping analysts quickly understand clusters of news articles.

  Given the following article titles and excerpts, generate a short, one-sentence summary of the cluster.

  Article Titles:
  {{#each articleTitles}}- {{this}}\n{{/each}}

  Article Excerpts:
  {{#each articleExcerpts}}- {{this}}\n{{/each}}

  Summary: `,
});

const generateClusterSummaryFlow = ai.defineFlow(
  {
    name: 'generateClusterSummaryFlow',
    inputSchema: GenerateClusterSummaryInputSchema,
    outputSchema: GenerateClusterSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      ...output,
      progress: 'Generated a short summary of the cluster.'
    } as GenerateClusterSummaryOutput;
  }
);

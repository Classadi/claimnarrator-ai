
import { pipeline } from '@huggingface/transformers';

// AI processing function using Hugging Face Transformers
export const processClaimInput = async (input: string) => {
  try {
    console.log('Starting claim processing with Hugging Face...');
    
    // Create a text classification pipeline for emotion detection
    const emotionClassifier = await pipeline('text-classification', 'j-hartmann/emotion-english-distilroberta-base');
    
    // Create a text generation pipeline for narrative creation
    const generator = await pipeline('text-generation', 'microsoft/DialoGPT-medium');
    
    console.log('Pipelines loaded, processing input...');
    
    // Analyze emotions
    const emotions = await emotionClassifier(input);
    console.log('Emotions detected:', emotions);
    
    // Extract basic information using simple text analysis
    const lowerInput = input.toLowerCase();
    
    // Simple tag extraction
    const tags = [];
    if (lowerInput.includes('accident') || lowerInput.includes('fell') || lowerInput.includes('crash')) {
      tags.push('Accident');
    }
    if (lowerInput.includes('medical') || lowerInput.includes('injury') || lowerInput.includes('hospital')) {
      tags.push('Medical');
    }
    if (lowerInput.includes('property') || lowerInput.includes('damage') || lowerInput.includes('broken')) {
      tags.push('Property Damage');
    }
    if (lowerInput.includes('theft') || lowerInput.includes('stolen') || lowerInput.includes('robbery')) {
      tags.push('Theft');
    }
    if (tags.length === 0) {
      tags.push('General');
    }

    // Extract time and location hints
    const timeMatch = input.match(/(\d+:\d+|\d+\s?(am|pm|AM|PM)|morning|afternoon|evening|night)/i);
    const timestamp = timeMatch ? timeMatch[0] : 'Time not specified';
    
    const locationMatch = input.match(/(office|home|street|hospital|store|building|stairs|car|road)/i);
    const location = locationMatch ? locationMatch[0] : 'Location not specified';

    // Determine severity
    let severity: 'low' | 'medium' | 'high' = 'low';
    if (lowerInput.includes('serious') || lowerInput.includes('severe') || lowerInput.includes('emergency')) {
      severity = 'high';
    } else if (lowerInput.includes('pain') || lowerInput.includes('damage') || lowerInput.includes('injury')) {
      severity = 'medium';
    }

    // Generate structured narrative
    const structuredText = `
The claimant has reported an incident that occurred ${timestamp}${location !== 'Location not specified' ? ` at ${location}` : ''}. Based on the provided information, this appears to be a ${tags.join(' and ').toLowerCase()} case. 

The claimant describes the following circumstances: ${input}

Emotional analysis indicates the claimant is experiencing ${emotions.map(e => e.label).join(' and ').toLowerCase()}, which is consistent with the nature of the reported incident. This claim requires ${severity} priority processing based on the described circumstances and impact.

Recommendation: Proceed with standard verification procedures and ${severity === 'high' ? 'expedited' : 'routine'} processing timeline.
    `.trim();

    const processedEmotions = emotions.map(emotion => emotion.label);

    console.log('Processing complete');
    
    return {
      structuredText,
      emotions: processedEmotions,
      tags,
      timestamp,
      location,
      severity
    };

  } catch (error) {
    console.error('Error processing claim with Hugging Face:', error);
    
    // Fallback processing
    return generateFallbackNarrative(input);
  }
};

// Fallback function for when AI processing fails
const generateFallbackNarrative = (input: string) => {
  const lowerInput = input.toLowerCase();
  
  // Simple emotion detection
  const emotions = [];
  if (lowerInput.includes('pain') || lowerInput.includes('hurt') || lowerInput.includes('injured')) {
    emotions.push('Physical Distress');
  }
  if (lowerInput.includes('scared') || lowerInput.includes('worried') || lowerInput.includes('anxious')) {
    emotions.push('Anxiety');
  }
  if (lowerInput.includes('angry') || lowerInput.includes('frustrated')) {
    emotions.push('Frustration');
  }
  if (emotions.length === 0) {
    emotions.push('Neutral');
  }

  // Simple tag extraction
  const tags = [];
  if (lowerInput.includes('accident') || lowerInput.includes('fell') || lowerInput.includes('crash')) {
    tags.push('Accident');
  }
  if (lowerInput.includes('medical') || lowerInput.includes('injury') || lowerInput.includes('hospital')) {
    tags.push('Medical');
  }
  if (lowerInput.includes('property') || lowerInput.includes('damage') || lowerInput.includes('broken')) {
    tags.push('Property Damage');
  }
  if (lowerInput.includes('theft') || lowerInput.includes('stolen') || lowerInput.includes('robbery')) {
    tags.push('Theft');
  }
  if (tags.length === 0) {
    tags.push('General');
  }

  // Extract time and location hints
  const timeMatch = input.match(/(\d+:\d+|\d+\s?(am|pm|AM|PM)|morning|afternoon|evening|night)/i);
  const timestamp = timeMatch ? timeMatch[0] : 'Time not specified';
  
  const locationMatch = input.match(/(office|home|street|hospital|store|building|stairs|car|road)/i);
  const location = locationMatch ? locationMatch[0] : 'Location not specified';

  // Determine severity
  let severity: 'low' | 'medium' | 'high' = 'low';
  if (lowerInput.includes('serious') || lowerInput.includes('severe') || lowerInput.includes('emergency')) {
    severity = 'high';
  } else if (lowerInput.includes('pain') || lowerInput.includes('damage') || lowerInput.includes('injury')) {
    severity = 'medium';
  }

  // Generate structured narrative
  const structuredText = `
The claimant has reported an incident that occurred ${timestamp}${location !== 'Location not specified' ? ` at ${location}` : ''}. Based on the provided information, this appears to be a ${tags.join(' and ').toLowerCase()} case. The claimant describes the following circumstances: ${input}. 

The emotional state of the claimant suggests ${emotions.join(' and ').toLowerCase()}, which is consistent with the nature of the reported incident. This claim requires ${severity} priority processing based on the described circumstances and impact.

Recommendation: Proceed with standard verification procedures and ${severity === 'high' ? 'expedited' : 'routine'} processing timeline.
  `.trim();

  return {
    structuredText,
    emotions,
    tags,
    timestamp,
    location,
    severity
  };
};

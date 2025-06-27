
// Real AI processing function using OpenRouter API
export const processClaimInput = async (input: string, apiKey: string) => {
  if (!apiKey) {
    throw new Error('OpenRouter API key is required');
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'ClaimNarrator AI'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-small-3.2-24b-instruct-2506:free',
        messages: [
          {
            role: 'system',
            content: `You are an insurance claim processing AI. Analyze the claim description and return a JSON response with the following structure:
            {
              "structuredText": "Professional narrative of the incident",
              "emotions": ["Emotion1", "Emotion2"],
              "tags": ["Tag1", "Tag2"],
              "timestamp": "extracted time information",
              "location": "extracted location information",
              "severity": "low|medium|high"
            }
            
            Guidelines:
            - Write the structuredText as a professional insurance narrative
            - Extract emotions like "Physical Distress", "Anxiety", "Frustration", "Neutral"
            - Extract relevant tags like "Accident", "Medical", "Property Damage", "Theft"
            - Determine severity based on described impact
            - Extract time and location details from the description`
          },
          {
            role: 'user',
            content: input
          }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your OpenRouter API key.');
      }
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from OpenRouter API');
    }

    // Try to parse JSON response
    try {
      const parsedResponse = JSON.parse(aiResponse);
      return {
        structuredText: parsedResponse.structuredText || generateFallbackNarrative(input),
        emotions: parsedResponse.emotions || ['Neutral'],
        tags: parsedResponse.tags || ['General'],
        timestamp: parsedResponse.timestamp || 'Time not specified',
        location: parsedResponse.location || 'Location not specified',
        severity: parsedResponse.severity || 'medium'
      };
    } catch (parseError) {
      // Fallback if JSON parsing fails
      console.error('Failed to parse AI response as JSON:', parseError);
      return generateFallbackNarrative(input);
    }

  } catch (error) {
    console.error('Error processing claim with OpenRouter:', error);
    throw error;
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

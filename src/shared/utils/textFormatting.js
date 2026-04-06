/**
 * Utility to enhance old plain-text analysis responses with Markdown links and formatting.
 * This ensures legacy database entries look just as good as newly generated ones.
 */
export const enhanceAnalysisWithLinks = (text) => {
  if (!text) return text;

  let enhancedText = text;

  // If it's already a markdown link for options, don't double format.
  // We check if OPTION \d+: [ starts with a bracket.
  
  // 1. Convert old "OPTION X: Product Name" to Markdown links
  // Pattern matches "OPTION 1: Product Name" ensuring it doesn't already have a '[' right after the colon
  const optionRegex = /(OPTION\s+\d+:)\s+([^\[\n]+)/g;
  
  enhancedText = enhancedText.replace(optionRegex, (match, optionPrefix, productNames) => {
    // If it's something generic like "[Product Name]", ignore
    if (productNames.includes('[Product Name]')) return match;
    
    // Clean up any trailing spaces
    const cleanNames = productNames.trim();
    
    // Create the Amazon India search link URL
    // We add 'agriculture chemical' to improve search accuracy on Amazon
    const searchUrl = `https://www.amazon.in/s?k=${encodeURIComponent(cleanNames)}+agriculture+chemical`;
    
    return `### ${optionPrefix} [${cleanNames}](${searchUrl})`;
  });

  // 2. Add bolding and formatting to legacy plain text
  // Convert "Active Ingredient:" to "**Active Ingredient:**" if it's not already bolded
  const boldFields = [
    'Active Ingredient',
    'Dosage',
    'Mix',
    'Apply',
    'Frequency',
    'Duration',
    'Water',
    'Cost',
    'Time',
    'Yield Impact',
    'Success Rate'
  ];

  boldFields.forEach(field => {
    // Match "Field:" that is not preceded by "**"
    const fieldRegex = new RegExp(`(?<!\\*\\*)${field}:`, 'g');
    enhancedText = enhancedText.replace(fieldRegex, `**${field}:**`);
  });

  // 3. Make the main section headers H3s if they aren't already
  const sections = [
    'TREATMENT \\(MUST COMPLETE ALL 3 OPTIONS\\)',
    'TREATMENT',
    'ORGANIC OPTIONS:',
    'IMMEDIATE ACTIONS:',
    'Prevention'
  ];

  sections.forEach(section => {
    // Look for exact match usually preceded by emoji or newlines, ensure it's not already ###
    const sectionRegex = new RegExp(`(?<!### )(${section})`, 'g');
    enhancedText = enhancedText.replace(sectionRegex, `### $1`);
  });

  return enhancedText;
};

import React from 'react';

/**
 * 5. HighlightedText: The "wow" feature.
 * This component re-renders the text with highlights.
 */
export default function HighlightedText({ text, highlights, file }) {
  // If text is from a file, we can't show highlights.
  if (file && !text) {
    return (
      <div className="p-4 rounded-lg bg-white shadow-sm border mt-4">
        <h3 className="text-sm font-medium text-slate-500 mb-3">Analysis Highlights</h3>
        <div className="prose prose-slate max-w-none p-4 border rounded-md bg-slate-50 h-72 overflow-y-auto">
          <p className="italic text-slate-600">Text from the file '<strong>{file.name}</strong>' was analyzed. Highlights cannot be displayed for file uploads in this prototype.</p>
        </div>
      </div>
    );
  }

  const { difficult_words = [], long_sentence_indices = [] } = highlights;

  // 1. Create a Set of difficult words (lowercase) for fast lookup
  const difficultWordsSet = new Set(difficult_words.map(w => w.toLowerCase()));

  // 2. Split text into sentences. Using a regex that keeps punctuation.
  const sentences = text.match(/[^.!?]+[.!?]*\s*/g) || [text];

  return (
    <div className="p-4 rounded-lg bg-white shadow-sm border">
      <h3 className="text-sm font-medium text-slate-500 mb-3">Analysis Highlights</h3>
      <p className="text-xs text-slate-500 mb-2">
        <span className="highlight-sentence px-1 rounded">Long sentences</span> and <span className="highlight-word px-1 rounded">difficult words</span> are highlighted.
      </p>
      <div className="prose prose-slate max-w-none p-4 border rounded-md bg-white h-full overflow-y-auto">
        {sentences.map((sentence, sentenceIndex) => {
          
          // Check if this sentence index is in the "long sentences" list
          const isLong = long_sentence_indices.includes(sentenceIndex);
          
          // Split the sentence into words AND spaces/punctuation
          // This regex splits on spaces while keeping them, to preserve formatting.
          const wordsAndPunctuation = sentence.split(/(\s+)/);

          return (
            <span 
              key={sentenceIndex} 
              className={isLong ? 'highlight-sentence' : ''}
            >
              {wordsAndPunctuation.map((word, wordIndex) => {
                
                // Clean the word to check it (remove punctuation for lookup)
                const cleanWord = word.toLowerCase().replace(/[.,!?]/g, '');
                
                // Check if this word is in our difficult list
                const isDifficult = difficultWordsSet.has(cleanWord);

                return (
                  <span 
                    key={wordIndex} 
                    className={isDifficult ? 'highlight-word' : ''}
                  >
                    {word}
                  </span>
                );
              })}
            </span>
          );
        })}
      </div>
    </div>
  );
}
"use client"

import { useState, useEffect } from 'react'
import { getContent, setContent } from '@/lib/admin'
import { Button } from '@/components/ui/button'
import { X, Plus } from 'lucide-react'
import { useLoading } from '@/contexts/loading-context'

export function TypewriterEditor() {
  const [words, setWords] = useState(['CONSTRUCTION', 'INNOVATION', 'EXCELLENCE', 'PRECISION'])
  const { startLoading, hideLoading } = useLoading()

  useEffect(() => {
    const loadWords = async () => {
      startLoading()
      try {
        const stored = await getContent('typewriter-texts')
        if (stored) {
          let parsedWords
          try {
            parsedWords = JSON.parse(stored)
          } catch {
            // If it's already an array, use it directly
            parsedWords = stored
          }
          if (Array.isArray(parsedWords) && parsedWords.length > 0) {
            setWords(parsedWords)
          }
        }
      } catch (e) {
        console.error('Failed to load words:', e)
      } finally {
        hideLoading()
      }
    }
    
    loadWords()
  }, [])

  const saveWords = async (newWords: string[]) => {
    try {
      const success = await setContent('typewriter-texts', JSON.stringify(newWords))
      if (success) {
        setWords(newWords)
      } else {
        console.error('Failed to save words')
      }
    } catch (error) {
      console.error('Failed to save words:', error)
    }
  }

  const updateWord = (index: number, newWord: string) => {
    const newWords = [...words]
    newWords[index] = newWord.toUpperCase()
    setWords(newWords)
  }

  const removeWord = (index: number) => {
    if (words.length > 1) {
      const newWords = words.filter((_, i) => i !== index)
      setWords(newWords)
    }
  }

  const addWord = () => {
    const newWords = [...words, 'NEW WORD']
    setWords(newWords)
  }

  const handleUpdate = async () => {
    startLoading()
    await saveWords(words)
    hideLoading()
  }

  return (
    <div>
      <p className="text-gray-600 text-sm mb-4">Typewriter Words (minimum 1 required):</p>
      <div className="space-y-2">
        {words.map((word, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={word}
              onChange={(e) => updateWord(index, e.target.value)}
              className="flex-1 text-gray-900 text-lg p-2 border border-gray-300 rounded bg-white"
              placeholder="Enter word"
            />
            {words.length > 1 && (
              <Button
                onClick={() => removeWord(index)}
                variant="destructive"
                size="sm"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          onClick={addWord}
          variant="outline"
          size="sm"
          className="mt-2"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Word
        </Button>
      </div>
      <Button
        onClick={handleUpdate}
        className="mt-4 w-full"
      >
        Update Typewriter Words
      </Button>
    </div>
  )
}
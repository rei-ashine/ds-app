import { describe, it, expect, beforeEach, vi } from 'vitest'
import { 
  safeLocalStorage, 
  loadAnsweredQuestions, 
  loadTheme,
  cleanupAnsweredQuestions
} from '../localStorage'
import { AnsweredQuestion } from '../../types'

describe('localStorage utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('safeLocalStorage', () => {
    it('should safely get item from localStorage', () => {
      localStorage.getItem = vi.fn().mockReturnValue('test value')
      const result = safeLocalStorage.getItem('testKey')
      expect(result).toBe('test value')
    })

    it('should return null when localStorage throws error', () => {
      localStorage.getItem = vi.fn().mockImplementation(() => {
        throw new Error('Storage error')
      })
      const result = safeLocalStorage.getItem('testKey')
      expect(result).toBeNull()
    })

    it('should safely set item in localStorage', () => {
      localStorage.setItem = vi.fn()
      const result = safeLocalStorage.setItem('testKey', 'testValue')
      expect(result).toBe(true)
      expect(localStorage.setItem).toHaveBeenCalledWith('testKey', 'testValue')
    })

    it('should return false when setItem throws error', () => {
      localStorage.setItem = vi.fn().mockImplementation(() => {
        throw new Error('Storage error')
      })
      const result = safeLocalStorage.setItem('testKey', 'testValue')
      expect(result).toBe(false)
    })
  })

  describe('loadAnsweredQuestions', () => {
    it('should load and parse answered questions', () => {
      const mockQuestions: AnsweredQuestion[] = [
        { questionId: 1, correct: true, timestamp: '2024-01-01' }
      ]
      localStorage.getItem = vi.fn().mockReturnValue(JSON.stringify(mockQuestions))
      
      const result = loadAnsweredQuestions()
      expect(result).toEqual(mockQuestions)
    })

    it('should return empty array when no data exists', () => {
      localStorage.getItem = vi.fn().mockReturnValue(null)
      const result = loadAnsweredQuestions()
      expect(result).toEqual([])
    })

    it('should return empty array when data is corrupted', () => {
      localStorage.getItem = vi.fn().mockReturnValue('invalid json')
      const result = loadAnsweredQuestions()
      expect(result).toEqual([])
    })
  })

  describe('loadTheme', () => {
    it('should load saved theme', () => {
      localStorage.getItem = vi.fn().mockReturnValue('dark')
      const result = loadTheme()
      expect(result).toBe('dark')
    })

    it('should return system preference when no theme saved', () => {
      localStorage.getItem = vi.fn().mockReturnValue(null)
      window.matchMedia = vi.fn().mockReturnValue({ matches: true })
      const result = loadTheme()
      expect(result).toBe('dark')
    })
  })

  describe('cleanupAnsweredQuestions', () => {
    it('should keep questions when under limit', () => {
      const questions: AnsweredQuestion[] = Array(500).fill(null).map((_, i) => ({
        questionId: i,
        correct: true,
        timestamp: '2024-01-01'
      }))
      
      const result = cleanupAnsweredQuestions(questions)
      expect(result.length).toBe(500)
    })

    it('should trim to last 1000 questions when over limit', () => {
      const questions: AnsweredQuestion[] = Array(1500).fill(null).map((_, i) => ({
        questionId: i,
        correct: true,
        timestamp: '2024-01-01'
      }))
      
      const result = cleanupAnsweredQuestions(questions)
      expect(result.length).toBe(1000)
      expect(result[0].questionId).toBe(500)
    })
  })
})
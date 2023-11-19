import { create } from 'zustand'
import { chatStore } from './ChatStore'

export const useChatStore = create((...a) => ({
  ...chatStore(...a),
}))
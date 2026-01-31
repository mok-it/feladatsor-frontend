import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CommentData } from '@/components/CommentPopup';

interface CommentsContextType {
  comments: Record<string, CommentData[]>; // threadId -> comments
  addComment: (threadId: string, text: string, user: { name: string; avatarUrl?: string }) => void;
  resolveComment: (threadId: string, commentId: string) => void;
  deleteComment: (threadId: string, commentId: string) => void;
  getComments: (threadId: string) => CommentData[];
}

const CommentsContext = createContext<CommentsContextType | undefined>(undefined);

export const CommentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [comments, setComments] = useState<Record<string, CommentData[]>>({});

  const addComment = (threadId: string, text: string, user: { name: string; avatarUrl?: string }) => {
    const newComment: CommentData = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      user,
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => ({
      ...prev,
      [threadId]: [...(prev[threadId] || []), newComment],
    }));
  };

  const resolveComment = (threadId: string, commentId: string) => {
    setComments((prev) => ({
      ...prev,
      [threadId]: prev[threadId]?.map((c) =>
        c.id === commentId ? { ...c, resolvedAt: new Date().toISOString() } : c
      ) || [],
    }));
  };

  const deleteComment = (threadId: string, commentId: string) => {
    setComments((prev) => ({
      ...prev,
      [threadId]: prev[threadId]?.filter((c) => c.id !== commentId) || [],
    }));
  };

  const getComments = (threadId: string) => comments[threadId] || [];

  return (
    <CommentsContext.Provider value={{ comments, addComment, resolveComment, deleteComment, getComments }}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useCommentsContext = () => {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error('useCommentsContext must be used within a CommentsProvider');
  }
  return context;
};

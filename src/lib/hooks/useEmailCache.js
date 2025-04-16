import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { STORAGE_KEYS, EMAIL_CACHE_DURATION } from '../constants/app.constants';

export const useEmailCache = (emailId) => {
  const [cachedEmail, setCachedEmail] = useState(null);

  useEffect(() => {
    const cache = storage.get(STORAGE_KEYS.EMAIL_CACHE) || {};
    const email = cache[emailId];
    
    if (email && Date.now() - email.timestamp < EMAIL_CACHE_DURATION) {
      setCachedEmail(email.data);
    }
  }, [emailId]);

  const updateCache = (emailData) => {
    const cache = storage.get(STORAGE_KEYS.EMAIL_CACHE) || {};
    cache[emailId] = {
      data: emailData,
      timestamp: Date.now()
    };
    storage.set(STORAGE_KEYS.EMAIL_CACHE, cache);
    setCachedEmail(emailData);
  };

  return [cachedEmail, updateCache];
};
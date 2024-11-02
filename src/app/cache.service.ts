import { Injectable } from '@angular/core';

interface CacheEntry {
  timestamp: number;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache: Map<string, CacheEntry> = new Map();
  private cacheDuration: number = 60000; // ℹ️ Cache duration in milliseconds 

  set(key: string, data: any): void {
    const cacheEntry: CacheEntry = {
      timestamp: Date.now(),
      data,
    };
    this.cache.set(key, cacheEntry);
  }

  get(key: string): any | null {
    const cacheEntry = this.cache.get(key);
    if (!cacheEntry) {
      return null;
    }
    if (Date.now() - cacheEntry.timestamp > this.cacheDuration) {
      this.cache.delete(key);
      return null;
    }
    return cacheEntry.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

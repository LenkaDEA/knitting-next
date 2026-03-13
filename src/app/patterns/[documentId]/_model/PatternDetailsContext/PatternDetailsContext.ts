'use client';

import { createContext } from 'react';

import type PatternDetailsStore from '../PatternDetailsStore';

export const PatternDetailsContext = createContext<PatternDetailsStore | null>(null);

'use client';

import { createContext } from 'react';

import type PatternsStore from '../PatternsStore';

export const PatternContext = createContext<PatternsStore | null>(null);

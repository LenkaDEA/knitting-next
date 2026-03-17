'use client';

import { createContext } from 'react';

import type CreatePatternStore from '../CreatePatternStore';

export const CreatePatternContext = createContext<CreatePatternStore | null>(null);

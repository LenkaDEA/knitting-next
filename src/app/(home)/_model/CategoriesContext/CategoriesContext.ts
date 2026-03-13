'use client';

import { createContext } from 'react';

import type CategoriesStore from '../CategoriesStore';

export const CategoriesContext = createContext<CategoriesStore | null>(null);

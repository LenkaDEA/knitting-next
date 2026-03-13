'use client';

import { createContext } from 'react';

import type { RootStore } from '@/shared/stores/global/RootStore';

export const RootContext = createContext<RootStore | null>(null);

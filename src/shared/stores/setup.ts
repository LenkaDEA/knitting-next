'use client';

import '@/config/configureMobX';

import { enableStaticRendering } from 'mobx-react-lite';

const isServer = typeof window === 'undefined';
enableStaticRendering(isServer);

'use client'

import { ChakraProvider as Provider, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider } from '../ui/color-mode'
import { Toaster } from '../ui/toaster'
import type { ColorModeProviderProps } from '../ui/color-mode'

export function ChakraProvider(props: ColorModeProviderProps) {
  return (
    <Provider value={defaultSystem}>
      <Toaster />
      <ColorModeProvider {...props} />
    </Provider>
  )
}

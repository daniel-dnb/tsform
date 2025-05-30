import { ChakraProvider } from './ChakraProvider'

interface ProvidersProps {
  children: React.ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  return <ChakraProvider>{children}</ChakraProvider>
}

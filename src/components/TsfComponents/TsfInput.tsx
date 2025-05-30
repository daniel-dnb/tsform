import { Field, Input } from '@chakra-ui/react'
import { withMask } from 'use-mask-input'
import type { InputProps } from '@chakra-ui/react'
import { useFieldContext } from '@/hooks/TsfHooks'

interface TsfInputProps extends InputProps {
  label?: string
  placeholder?: string
  mask?: string
}

export const TsfInput = ({
  label,
  placeholder,
  mask,
  ...props
}: TsfInputProps) => {
  const field = useFieldContext<string>()

  return (
    <Field.Root invalid={field.state.meta.errors.length > 0}>
      <Field.Label>
        {label} <Field.RequiredIndicator />
      </Field.Label>

      <Input
        {...props}
        id={field.name}
        name={field.name}
        placeholder={placeholder}
        value={field.state.value || ''}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        ref={mask ? withMask(mask) : undefined}
      />

      <Field.ErrorText>{field.state.meta.errors[0]?.message}</Field.ErrorText>
    </Field.Root>
  )
}

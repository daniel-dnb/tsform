import { Field, NumberInput } from '@chakra-ui/react'
import type { NumberInputInputProps } from '@chakra-ui/react'
import { useFieldContext } from '@/hooks/TsfHooks'

interface TsfNumberInputProps extends NumberInputInputProps {
  label?: string
  placeholder?: string
}

export const TsfNumberInput = ({
  label,
  placeholder,
  ...props
}: TsfNumberInputProps) => {
  const field = useFieldContext<number>()

  return (
    <Field.Root invalid={field.state.meta.errors.length > 0}>
      <Field.Label>
        {label} <Field.RequiredIndicator />
      </Field.Label>

      <NumberInput.Root
        w="100%"
        name={field.name}
        id={field.name}
        value={String(field.state.value || '')}
        onValueChange={(e) => field.handleChange(e.valueAsNumber)}
      >
        <NumberInput.Input
          {...props}
          placeholder={placeholder}
          onBlur={field.handleBlur}
        />
      </NumberInput.Root>

      <Field.ErrorText>{field.state.meta.errors[0]?.message}</Field.ErrorText>
    </Field.Root>
  )
}

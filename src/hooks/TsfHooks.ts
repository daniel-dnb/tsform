import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { TsfInput } from '@/components/TsfComponents/TsfInput'
import { TsfNumberInput } from '@/components/TsfComponents/TsfNumberInput'

export const { fieldContext, formContext, useFieldContext } =
  createFormHookContexts()

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    input: TsfInput,
    numberInput: TsfNumberInput,
  },
  formComponents: {},
})

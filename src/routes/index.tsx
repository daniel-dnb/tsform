import { createFileRoute } from '@tanstack/react-router'
import { Button, Flex } from '@chakra-ui/react'
import { z } from 'zod/v4'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useAppForm } from '@/hooks/TsfHooks'
import { toaster } from '@/components/ui/toaster'

type Address =
  | {
      cep: string
      logradouro: string
      complemento: string
      bairro: string
      localidade: string
      estado: string
    }
  | {
      erro: 'true'
    }

const formSchema = z.object({
  cep: z
    .string('CEP é obrigatório')
    .transform((value) => value.replace(/[^0-9]/g, ''))
    .pipe(z.string().min(8, 'CEP é obrigatório')),
  estado: z.string('Estado é obrigatório').min(1, 'Estado é obrigatório'),
  logradouro: z
    .string('Logradouro é obrigatório')
    .min(1, 'Logradouro é obrigatório'),
  complemento: z.string('Complemento é obrigatório').optional(),
  bairro: z.string('Bairro é obrigatório').min(1, 'Bairro é obrigatório'),
  localidade: z.string('Cidade é obrigatório').min(1, 'Cidade é obrigatório'),
})

type FormData = z.infer<typeof formSchema>

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const form = useAppForm({
    validators: {
      onBlur: formSchema,
    },
    onSubmit: (data) => {
      console.log(data.value)
    },
    defaultValues: {} as FormData,
  })

  const { mutate: getAddress } = useMutation({
    mutationFn: async (cep: string) => {
      const res = await axios.get<Address>(
        `https://viacep.com.br/ws/${cep}/json/`,
      )
      if ('erro' in res.data) {
        throw new AxiosError('CEP não encontrado', '404')
      }
      return res.data
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toaster.error({
          description: error.message,
          type: 'error',
        })
      }
    },
  })

  return (
    <Flex direction="column" gap={4} align="center" justify="center" h="100vh">
      <Flex
        as="form"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void form.handleSubmit()
        }}
        maxW="400px"
        gap={4}
        direction="column"
        w="full"
      >
        <form.AppField
          name="cep"
          listeners={{
            onChangeDebounceMs: 300,
            onChange: ({ value }) => {
              const onlyNumbers = value?.replace(/[^0-9]/g, '')

              if (onlyNumbers.length === 8) {
                getAddress(onlyNumbers, {
                  onSuccess: (data) => {
                    form.setFieldValue('estado', data.estado)
                    form.setFieldValue('logradouro', data.logradouro)
                    form.setFieldValue('complemento', data.complemento)
                    form.setFieldValue('bairro', data.bairro)
                    form.setFieldValue('localidade', data.localidade)
                  },
                })
              }
            },
          }}
          children={(field) => <field.input label="CEP" mask="99999-999" />}
        />

        <form.AppField
          name="estado"
          children={(field) => <field.input label="Estado" />}
        />

        <form.AppField
          name="logradouro"
          children={(field) => <field.input label="Logradouro" />}
        />

        <form.AppField
          name="complemento"
          children={(field) => <field.input label="Complemento" />}
        />

        <form.AppField
          name="bairro"
          children={(field) => <field.input label="Bairro" />}
        />

        <form.AppField
          name="localidade"
          children={(field) => <field.input label="Cidade" />}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit} loading={isSubmitting}>
              Submit
            </Button>
          )}
        />
      </Flex>
    </Flex>
  )
}

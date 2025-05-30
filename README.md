# 📋 Formulário de Endereços com TanStack Form

Este é um aplicativo React moderno que demonstra a integração entre **TanStack Form**, **Chakra UI** e **TanStack Query** para criar um formulário de endereços com busca automática de CEP usando a API do ViaCEP.

## ✨ Funcionalidades

- 🏠 **Formulário de Endereços Completo** - Campos para CEP, estado, logradouro, complemento, bairro e cidade
- 🔍 **Busca Automática de CEP** - Integração com a API do ViaCEP para preenchimento automático dos campos
- ✅ **Validação em Tempo Real** - Validação usando Zod com feedback visual instantâneo
- 🎭 **Máscara de CEP** - Formatação automática do CEP durante a digitação
- 🎨 **Interface Moderna** - Design responsivo usando Chakra UI
- ⚡ **Performance Otimizada** - Debounce na busca de CEP e gerenciamento eficiente de estado

## 🛠️ Tecnologias Utilizadas

- **[React 19](https://react.dev/)** - Biblioteca JavaScript para interfaces de usuário
- **[TanStack Form](https://tanstack.com/form)** - Gerenciamento avançado de formulários
- **[TanStack Query](https://tanstack.com/query)** - Gerenciamento de estado de servidor e cache
- **[TanStack Router](https://tanstack.com/router)** - Roteamento type-safe para React
- **[Chakra UI](https://chakra-ui.com/)** - Biblioteca de componentes modulares e acessíveis
- **[Zod](https://zod.dev/)** - Validação de esquemas TypeScript-first
- **[Axios](https://axios-http.com/)** - Cliente HTTP para requisições
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Vite](https://vitejs.dev/)** - Ferramenta de build rápida

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- pnpm (recomendado)

### Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd tsform
```

2. Instale as dependências:

```bash
pnpm install
```

3. Execute o aplicativo em modo de desenvolvimento:

```bash
pnpm dev
```

4. Acesse [http://localhost:3000](http://localhost:3000) no seu navegador

### Scripts Disponíveis

```bash
pnpm dev      # Executa o aplicativo em modo de desenvolvimento
pnpm build    # Constrói o aplicativo para produção
pnpm serve    # Serve a versão de produção
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── TsfComponents/     # Componentes customizados do formulário
│   │   ├── TsfInput.tsx   # Input com validação integrada
│   │   └── TsfNumberInput.tsx
│   └── ui/                # Componentes de UI reutilizáveis
├── hooks/
│   └── TsfHooks.ts        # Hooks customizados do TanStack Form
├── routes/
│   └── index.tsx          # Página principal com o formulário
└── main.tsx               # Ponto de entrada da aplicação
```

## 🎯 Como Funciona

### TanStack Form Integration

O projeto utiliza o TanStack Form para gerenciamento avançado de formulários:

```tsx
const form = useAppForm({
  validators: {
    onBlur: formSchema, // Validação Zod
  },
  onSubmit: (data) => {
    console.log(data.value)
  },
  defaultValues: {
    cep: '',
    estado: '',
    logradouro: '',
    complemento: undefined,
    bairro: '',
    localidade: '',
  },
})
```

### Validação com Zod

Esquema de validação type-safe para os dados do formulário:

```tsx
const formSchema = z.object({
  cep: z
    .string('CEP é obrigatório')
    .transform((value) => value.replace(/[^0-9]/g, ''))
    .pipe(z.string().min(8, 'CEP é obrigatório')),
  estado: z.string('Estado é obrigatório').min(1, 'Estado é obrigatório'),
  logradouro: z
    .string('Logradouro é obrigatório')
    .min(1, 'Logradouro é obrigatório'),
  complemento: z.string().optional(),
  bairro: z.string('Bairro é obrigatório').min(1, 'Bairro é obrigatório'),
  localidade: z.string('Cidade é obrigatório').min(1, 'Cidade é obrigatório'),
})
```

### Integração com ViaCEP

Busca automática de endereço usando TanStack Query:

```tsx
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
    // Tratamento de erro com toast
  },
})
```

### Componentes Customizados

O projeto inclui componentes personalizados que integram TanStack Form com Chakra UI:

```tsx
<form.AppField
  name="cep"
  listeners={{
    onChangeDebounceMs: 300,
    onChange: ({ value }) => {
      const onlyNumbers = value?.replace(/[^0-9]/g, '')
      if (onlyNumbers.length === 8) {
        getAddress(onlyNumbers, {
          onSuccess: (data) => {
            // Preenche automaticamente os campos
          },
        })
      }
    },
  }}
  children={(field) => <field.input label="CEP" mask="99999-999" />}
/>
```

## 🔧 Customização

### Adicionando Novos Campos

1. Atualize o tipo `FormData` e o `formSchema`
2. Adicione o campo nos `defaultValues`
3. Crie um novo `form.AppField` no componente

### Personalizando a Validação

Modifique o esquema Zod em `formSchema` para ajustar as regras de validação conforme necessário.

### Estilização

O projeto usa Chakra UI para estilização. Customize os temas e componentes conforme necessário.

## 📚 Recursos Adicionais

- [TanStack Form Documentation](https://tanstack.com/form)
- [TanStack Query Documentation](https://tanstack.com/query)
- [TanStack Router Documentation](https://tanstack.com/router)
- [Chakra UI Documentation](https://chakra-ui.com/)
- [Zod Documentation](https://zod.dev/)
- [ViaCEP API Documentation](https://viacep.com.br/)

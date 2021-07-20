import { Flex, Button, Stack} from '@chakra-ui/react';
import { Input } from '../components/Form/Input';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import {SubmitHandler, useForm} from 'react-hook-form';

type SignInFormData = {
  email: string;
  password: String;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatório')
})

export default function Home() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  console.log(formState.errors)

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) =>{
    await new Promise( resolve => setTimeout(resolve, 2000));
    console.log(values);
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex 
        as="form"
        onSubmit={handleSubmit(handleSignIn)} 
        width="100%" 
        maxWidth={360}
        bg="gray.800" 
        p="8"
        borderRadius="8"
        flexDir="column"
      >
        <Stack spacing="4">
          <Input 
            type="email" 
            name="email" 
            label="E-mail" 
            error={formState.errors.email}
            {...register('email')}
          />
          <Input 
            type="password" 
            name="password" 
            label="Senha"
            error={formState.errors.password}
            {...register('password')}
          />
        </Stack>

        <Button 
          type="submit" 
          mt="6" 
          size="lg" 
          colorScheme="pink"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}

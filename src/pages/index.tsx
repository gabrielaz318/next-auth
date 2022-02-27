import { 
	Flex, 
	Heading, 
	Stack,
	FormControl,
	Input,
	FormLabel,
	FormErrorMessage,
	Button,
	Box,
	Text
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useContext, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface IForm {
	email: string;
	password: string;
}

const schema = yup.object().shape({
	email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
	password: yup.string().min(6, 'Minímo de 6 caracteres').required('A senha é obrigatória')
})

export default function Home() {
	const { signIn } = useAuth();

	const [isLoading, setIsLoading] = useState(false);
	const [invalidCredentials, setInvalidCredentials] = useState(false);
	const { register, formState: { errors }, handleSubmit } = useForm<IForm>({
		resolver: yupResolver(schema)
	});

	async function onSubmit({ email, password }: IForm) {
		setIsLoading(true)
		setInvalidCredentials(false)
		
		const data = { email, password };

		const responseSignIn = await signIn(data)

		if(responseSignIn?.response.status === 401) {
			setIsLoading(false)
			setInvalidCredentials(true)
		}
	}

    return (
        <Flex 
			alignItems="center" 
			justifyContent="center" 
			h="100vh"
			backgroundColor="gray.200"
		>
			<Box 
				maxW="360px" 
				w="100%" 
				bgColor="white" 
				boxShadow="md" 
				p={8} 
				borderRadius={8}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Heading textAlign="center" size="xl" pb={4}>Forms BCW</Heading>
					<Stack spacing={4}>
						<FormControl isReadOnly={isLoading} isInvalid={!!errors?.email?.message}>
							<FormLabel htmlFor="email">E-mail</FormLabel>
							<Input
								id="email"
								placeholder="E-mail"
								{...register('email')}
								type="email"
								bgColor="white"
							/>
							{errors?.email?.message && <FormErrorMessage>
								{errors?.email?.message}
							</FormErrorMessage>}
						</FormControl>
						<FormControl isReadOnly={isLoading} isInvalid={!!errors?.password?.message}>
							<FormLabel htmlFor="password">Senha</FormLabel>
							<Input
								id="password"
								placeholder="Senha"
								{...register('password')}
								type="password"
								bgColor="white"
							/>
							{errors?.password?.message && <FormErrorMessage>
								{errors?.password?.message}
							</FormErrorMessage>}
						</FormControl>
						<Button isLoading={isLoading} type='submit' colorScheme='teal'>Entrar</Button>
					</Stack>
					{invalidCredentials && <Text pt={4} textAlign="center" color="red.500">
						E-mail ou senha estão incorretos.
					</Text>}
				</form>
			</Box>
        </Flex>
    );
}
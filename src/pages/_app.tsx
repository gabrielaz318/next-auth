import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '../contexts/AuthContext';
import { SiderBarDrawerProvider } from '../contexts/SidebarDrawerContext';

function MyApp({ Component, pageProps }: AppProps) {
  	return (
		<ChakraProvider>
			<AuthProvider>
				<SiderBarDrawerProvider>
					<Component {...pageProps} />
				</SiderBarDrawerProvider>
			</AuthProvider>
		</ChakraProvider>
	) 
}

export default MyApp;

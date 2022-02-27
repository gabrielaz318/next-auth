import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useContext, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { parseCookies } from "nookies";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export default function DashBoard() {
    const { user } = useAuth();
    const isWideVersion = useBreakpointValue({
        base: true,
        lg: false
    });

    useEffect(() => {
      console.log(isWideVersion)
    }, [])
    
    return (
        <Flex backgroundColor="gray.200">
            <Sidebar />

            <Flex w="100%" ml={!!isWideVersion ? 0 : 64} direction="column">
                <Header title="Dashboard" />

                <Box backgroundColor="white" h="500px" m={4} borderRadius={6} p={4}>
                    a
                </Box>
                <Box backgroundColor="white" h="500px" m={4} borderRadius={6} p={4}>
                    a
                </Box>
                <Box backgroundColor="white" h="500px" m={4} borderRadius={6} p={4}>
                    a
                </Box>
            </Flex>
        </Flex>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // const apiClient = getAPIClient(ctx);
    const { 'formsbcw.token': token } = parseCookies(ctx);

    if(!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}
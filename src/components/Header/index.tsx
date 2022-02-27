import { Box, Flex, Heading, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { useAuth } from "../../contexts/AuthContext";

interface IHeader {
    title: string;
}

export function Header({ title }: IHeader) {
    const { onOpen } = useSidebarDrawer();
    const { signOut } = useAuth();

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    return (
        <Flex 
            w="100%" 
            alignItems="center" 
            h="16" 
            backgroundColor="teal.500"
            p={4}
            justifyContent="space-between"
        >   
            <Flex alignItems="center">
                {!isWideVersion && (
                    <IconButton
                        aria-label="open navigation"
                        icon={<Icon as={RiMenuLine} />}
                        fontSize="24"
                        variant="unstyled"
                        onClick={onOpen}
                        color="white"
                        mr="2"
                    >

                    </IconButton>
                )}
                <Heading size="md" color="white">{ title }</Heading>
            </Flex>
            
            <IconButton 
                aria-label="logout"
                fontSize="26"
                variant="ghost"
                _hover={{
                    background: "teal.700",
                }}
                icon={<Icon as={MdOutlineLogout} />}
                onClick={signOut}
                color="white"
            />
        </Flex>
    )
}
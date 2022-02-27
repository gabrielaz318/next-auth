

import { SidebarNav } from "./SidebarNav";
import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, useBreakpointValue } from "@chakra-ui/react";

import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { Logo } from "./Logo";

export function Sidebar() {
    const { isOpen, onClose } = useSidebarDrawer();

    const isDrawerSideBar = useBreakpointValue({
        base: true,
        lg: false
    })
    
    if(!!isDrawerSideBar) {
        return (
            <Drawer isOpen={isOpen} placement="left" onClose={onClose} >
                <DrawerOverlay>
                    <DrawerContent bg="teal.400">
                        <DrawerHeader>
                            <Logo />
                        </DrawerHeader>
                        <DrawerCloseButton color="white" />
                        <DrawerBody>
                            <SidebarNav />
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        )
    }

    return (
        <Flex
            position="fixed"
            top={0}
            left={0}
            maxWidth={64}
            h="100vh"
            w="100%" 
            backgroundColor="teal.400" 
            py={2}
            direction="column"
        >
            <Flex w="100%" justifyContent="center">
                <Logo/>
            </Flex>
            <SidebarNav/>
        </Flex>
    )
}
import { Stack, } from "@chakra-ui/react";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
import { RiContactsLine, RiDashboardLine, RiListUnordered } from "react-icons/ri";

export function SidebarNav() {
    return (
        <Stack spacing="12" align="flex-start" p={4}>
            <NavSection title="GERAL">
                <NavLink href="/dashboard" icon={RiDashboardLine} children="Dashboard" />
                <NavLink href="/forms" icon={RiListUnordered} children="Formulários" />
            </NavSection>
        </Stack>
    )
}
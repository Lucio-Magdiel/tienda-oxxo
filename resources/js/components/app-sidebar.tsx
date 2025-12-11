import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutGrid, 
    FolderTree, 
    Package, 
    ShoppingCart, 
    BarChart3,
    DollarSign 
} from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const userRole = auth?.user?.role;

    // Items para todos los usuarios autenticados
    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Nueva Venta',
            href: '/ventas/create',
            icon: DollarSign,
        },
        {
            title: 'Ventas',
            href: '/ventas',
            icon: ShoppingCart,
        },
        {
            title: 'Productos',
            href: '/productos',
            icon: Package,
        },
    ];

    // Items solo para administradores
    if (userRole === 'admin') {
        mainNavItems.push(
            {
                title: 'Categorías',
                href: '/categorias',
                icon: FolderTree,
            },
            {
                title: 'Reportes',
                href: '/reportes',
                icon: BarChart3,
            }
        );
    }

    const footerNavItems: NavItem[] = [
        {
            title: 'Tienda OXXO',
            href: '#',
            icon: ShoppingCart,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

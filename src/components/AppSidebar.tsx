import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarRail,
} from "@/components/ui/sidebar"
import { 
  HomeIcon,
  ChartBarSquareIcon,
  ClipboardDocumentListIcon,
  BuildingOfficeIcon,
  UsersIcon,
  IdentificationIcon,
 } from "@heroicons/react/24/outline"

const items = [
  {
    title: "Home",
    href: "/",
    icon: HomeIcon
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: ChartBarSquareIcon,
  },
  {
    title: "ADRs",
    href: "/adrs",
    icon: ClipboardDocumentListIcon,
  },
]

const supplementalItems = [
  {
    title: "Facilities",
    href: "/facilities",
    icon: BuildingOfficeIcon,
  },
  {
    title: "Patients",
    href: "/patients",
    icon: UsersIcon,
  },
  {
    title: "Auditors",
    href: "/auditors",
    icon: IdentificationIcon,
  },
]


export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />

      <SidebarContent>
        <SidebarGroup />
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        <SidebarGroup />

        <SidebarSeparator />
        <SidebarGroup />
          <SidebarGroupLabel>Databases</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supplementalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        <SidebarGroup />

      </SidebarContent>

      <SidebarFooter />

      <SidebarRail />

    </Sidebar>
  )
}

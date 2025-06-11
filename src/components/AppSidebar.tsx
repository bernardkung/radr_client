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
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { 
  HomeIcon,
  ChartBarSquareIcon,
  ClipboardDocumentListIcon,
  BuildingOfficeIcon,
  UsersIcon,
  IdentificationIcon,
 } from "@heroicons/react/24/outline"
 import RadrIcon from "@/app/RadrIcon"


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
    <Sidebar collapsible="icon" className="bg-sidebar-primary text-primary-foreground h-full p-2">
      <SidebarHeader className="bg-sidebar-primary text-primary-foreground"> 
        <div className="flex flex-row justify-between align-center ">
          {/* <RadrIcon className="size-6"/>
          <p className="flex-1 mx-2">radr</p> */}
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent className="mx-0 max-w-full bg-primary text-primary-foreground ">
        <SidebarGroup />
          <SidebarGroupLabel className="bg-primary text-primary-foreground">Dashboard</SidebarGroupLabel>
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

        {/* <SidebarSeparator /> */}
        <SidebarGroup />
          <SidebarGroupLabel className="text-primary-foreground">Databases</SidebarGroupLabel>
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

      <SidebarFooter className="bg-primary text-primary-foreground flex flex-row justify-end items-center">
      </SidebarFooter>

      {/* <SidebarRail /> */}

    </Sidebar>
  )
}

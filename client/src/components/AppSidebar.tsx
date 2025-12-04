import { Home, ShoppingBag, Grid3x3, Tag, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { theme } from "@/config/theme";

const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Shop",
    url: "/shop",
    icon: ShoppingBag,
  },
  {
    title: "Products",
    url: "/products",
    icon: Grid3x3,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: Tag,
  },
  {
    title: "Offers",
    url: "/offers",
    icon: Tag,
  },
];

export function AppSidebar() {
  const location = useLocation();
  return (
    <Sidebar
      style={{
        background: theme.gradients.card,
        borderRight: `1px solid ${theme.colors.primary[400]}40`,
      }}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel
            style={{
              color: theme.colors.primary[300],
              fontSize: "0.875rem",
              fontWeight: "600",
              letterSpacing: "0.05em",
            }}
          >
            🛍️ BUY EASY
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    style={{
                      backgroundColor:
                        location.pathname === item.url
                          ? `${theme.colors.primary[500]}30`
                          : "transparent",
                      color:
                        location.pathname === item.url
                          ? theme.colors.primary[300]
                          : theme.colors.text.secondary,
                      borderLeft:
                        location.pathname === item.url
                          ? `3px solid ${theme.colors.primary[400]}`
                          : "3px solid transparent",
                      transition: "all 0.3s ease",
                    }}
                    className="hover:scale-105"
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* User/Account */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/account"}
                  style={{
                    backgroundColor:
                      location.pathname === "/account"
                        ? `${theme.colors.primary[500]}30`
                        : "transparent",
                    color:
                      location.pathname === "/account"
                        ? theme.colors.primary[300]
                        : theme.colors.text.secondary,
                    borderLeft:
                      location.pathname === "/account"
                        ? `3px solid ${theme.colors.primary[400]}`
                        : "3px solid transparent",
                    transition: "all 0.3s ease",
                  }}
                  className="hover:scale-105"
                >
                  <Link to="/account">
                    <User />
                    <span>Account</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

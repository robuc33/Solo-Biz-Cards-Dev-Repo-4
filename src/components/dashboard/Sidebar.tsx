import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { LayoutDashboard, CreditCard, Users, Contact, Shirt, Settings, HelpCircle, Boxes, LogOut, MessageCircle, X, DollarSign } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type SidebarItem = {
  title: string;
  icon: React.ElementType;
  path: string;
};

const mainNavItems: SidebarItem[] = [{
  title: "Dashboard",
  icon: LayoutDashboard,
  path: "/dashboard"
}, {
  title: "Cards",
  icon: CreditCard,
  path: "/dashboard/cards"
}, {
  title: "Referrals",
  icon: Users,
  path: "/dashboard/referrals"
}, {
  title: "Contacts",
  icon: Contact,
  path: "/dashboard/contacts"
}, {
  title: "Earnings",
  icon: DollarSign,
  path: "/dashboard/earnings"
}, {
  title: "Accessories",
  icon: Shirt,
  path: "/dashboard/accessories"
}];

const bottomNavItems: SidebarItem[] = [{
  title: "Settings",
  icon: Settings,
  path: "/dashboard/settings"
}, {
  title: "Support",
  icon: HelpCircle,
  path: "/dashboard/support"
}, {
  title: "Systems",
  icon: Boxes,
  path: "/dashboard/systems"
}];

export function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen
}: {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (val: boolean) => void;
}) {
  const pathname = usePathname();
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  return <aside className={cn("h-screen bg-sidebar fixed left-0 top-0 z-30 flex flex-col transition-all duration-300 ease-in-out group",
  // Desktop styles
  "md:w-64 md:translate-x-0", collapsed && "md:w-20",
  // Mobile styles
  "w-64 -translate-x-full", mobileOpen && "translate-x-0")}>
      <div className="flex items-center h-[80px] px-4 border-b border-blue-200 relative">
        <Link href="/" className={cn("flex items-center gap-2 transition-all duration-300", 
          collapsed ? "md:mx-auto" : "")} 
          onClick={() => setMobileOpen(false)}>
          <div className="bg-white rounded-md p-1.5">
            <img src="/lovable-uploads/2bd4e7ad-3bad-41a2-aa38-641ad8baf9ac.png" alt="SoloBizCards Logo" className="h-6 w-6" />
          </div>
          {/* Only show the text when not collapsed or on mobile */}
          {(!collapsed || mobileOpen) && <span className="text-sidebar-foreground text-lg font-semibold transition-opacity duration-300">SoloBizCards</span>}
        </Link>

        {/* Close button on mobile */}
        <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 text-sidebar-foreground md:hidden" onClick={() => setMobileOpen(false)}>
          <X className="h-5 w-5" />
        </Button>

        {/* Toggle button on desktop - now always visible on hover of the sidebar */}
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "absolute transition-opacity duration-200 h-6 w-6", 
            collapsed ? "-right-3" : "-right-3", 
            "top-1/2 -translate-y-1/2 bg-blue-200 border border-sidebar-border rounded-full z-40", 
            "hidden md:flex opacity-0 group-hover:opacity-100"
          )} 
          onClick={toggleSidebar}
        >
          {collapsed ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>}
        </Button>
      </div>

      <div className="flex flex-col flex-1 gap-1 py-4 overflow-y-auto">
        {mainNavItems.map(item => <Link key={item.title} href={item.path} className={cn("sidebar-item hover:bg-[#3b73ed] transition-all duration-300", 
          // Apply darker blue when active and maintain hover color
          pathname === item.path ? "bg-[#1d4ed8]" : "",
          // Desktop styles for collapsed state
          collapsed ? "md:justify-center md:px-2" : "px-4",
          // Mobile always shows full size
          "mx-4")} onClick={() => setMobileOpen(false)}>
            <item.icon className="w-5 h-5 text-[#f7faff]" />
            {/* Only show the text when not collapsed or on mobile */}
            {(!collapsed || mobileOpen) && <span className="text-[#f7faff] transition-opacity duration-300">{item.title}</span>}
          </Link>)}

        <div className="flex-1 border-b border-blue-200 mt-2 mb-2 mx-4"></div>

        {bottomNavItems.map(item => <Link key={item.title} href={item.path} className={cn("sidebar-item hover:bg-[#3b73ed] transition-all duration-300", 
          // Apply darker blue when active and maintain hover color
          pathname === item.path ? "bg-[#1d4ed8]" : "",
          // Desktop styles for collapsed state
          collapsed ? "md:justify-center md:px-2" : "px-4",
          // Mobile always shows full size
          "mx-4")} onClick={() => setMobileOpen(false)}>
            <item.icon className="w-5 h-5 text-[#f7faff]" />
            {/* Only show the text when not collapsed or on mobile */}
            {(!collapsed || mobileOpen) && <span className="text-[#f7faff] transition-opacity duration-300">{item.title}</span>}
          </Link>)}
      </div>

      <div className="border-t border-blue-200 mx-0 py-[16px] my-0">
        <a href="https://www.youtube.com/watch?v=alVCruuHM6U" target="_blank" rel="noopener noreferrer" className={cn("sidebar-item hover:bg-[#3b73ed] transition-all duration-300", 
          // Desktop styles for collapsed state 
          collapsed ? "md:justify-center md:px-2" : "px-4",
          // Mobile always shows full size
          "mx-4")} onClick={() => setMobileOpen(false)}>
          <MessageCircle className="w-5 h-5 text-[#f7faff]" />
          {/* Only show the text when not collapsed or on mobile */}
          {(!collapsed || mobileOpen) && <span className="text-[#f7faff] text-sm transition-opacity duration-300">How to Get Started Video</span>}
        </a>
      </div>
    </aside>;
}

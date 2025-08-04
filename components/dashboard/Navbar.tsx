"use client";

import { Bell, ChevronDown, Menu, User, CreditCard, Trophy, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ModeToggle } from "./ModeToggle";
import { cn } from '@/lib/utils';
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { loadBusinessCards } from '@/utils/cardStorage';
import { useState, useEffect, useMemo } from 'react';
import type { BusinessCard } from '@/types/businessCard';

export function Navbar({
  collapsed,
  setMobileOpen
}: {
  collapsed: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [businessCards, setBusinessCards] = useState<BusinessCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const path = pathname || '';
  const tab = searchParams?.get('tab') || null;

  // Load business cards with error handling
  useEffect(() => {
    const loadCards = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const cards = loadBusinessCards();
        setBusinessCards(cards);
      } catch (err) {
        console.error('Failed to load business cards:', err);
        setError('Failed to load business cards');
        setBusinessCards([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCards();
  }, []);

  // Memoized page title mapping
  const pageTitle = useMemo(() => {
    if (path === "/dashboard" || path === "/dashboard/") return "Dashboard";
    if (path === "/dashboard/cards") return "Cards";
    if (path === "/dashboard/settings") return "Settings";
    if (path === "/dashboard/referrals") return "Referrals";
    if (path === "/dashboard/contacts") return "Contacts";
    if (path === "/dashboard/earnings") return "Earnings";
    if (path === "/dashboard/accessories") return "Accessories";
    if (path === "/dashboard/support") return "Support";
    if (path === "/dashboard/systems") return "Systems";
    if (path === "/dashboard/get-started") return "Create Business Card";
    return "Dashboard";
  }, [path]);

  // Memoized card details page logic
  const cardPageInfo = useMemo(() => {
    const isCardDetailsPage = path ? path.startsWith('/dashboard/cards/') : false;
    const cardId = isCardDetailsPage && path ? path.split('/').pop() : null;
    
    let cardInfo: BusinessCard | null = null;
    if (cardId && businessCards.length > 0) {
      cardInfo = businessCards.find(c => c.metadata?.id === cardId) || null;
    }
    
    return { isCardDetailsPage, cardId, cardInfo };
  }, [path, businessCards]);

  // Memoized settings subpage logic
  const settingsSubpage = useMemo(() => {
    if (tab === "subscriptions") return "Subscriptions";
    if (tab === "appearance") return "Appearance";
    if (tab === "notifications") return "Notifications";
    return "Account";
  }, [tab]);

  const isSettingsPage = path === "/dashboard/settings";
  return <header className={cn("h-[80px] border-b fixed top-0 right-0 z-20 flex items-center px-4 md:px-6 transition-all duration-300 left-0 md:left-auto", collapsed ? "md:left-20" : "md:left-64", "bg-sidebar text-sidebar-foreground md:bg-white md:text-foreground")}>
      <div className="flex items-center gap-2 flex-1">
        <Button variant="ghost" size="icon" className="md:hidden text-sidebar-foreground" onClick={() => setMobileOpen(true)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
        
        {isSettingsPage ? (
          <Breadcrumb>
            <BreadcrumbList className="text-xl">
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="font-semibold">
                  <Link href="/dashboard/settings">Settings</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="px-0 py-0" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm">{settingsSubpage}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        ) : cardPageInfo.isCardDetailsPage && cardPageInfo.cardInfo ? (
          <Breadcrumb>
            <BreadcrumbList className="text-xl">
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="font-semibold">
                  <Link href="/dashboard/cards">Cards</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="px-0 py-0" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm">{cardPageInfo.cardInfo.urlName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        ) : (
          <h1 className="text-xl font-semibold">{pageTitle}</h1>
        )}
      </div>

      <div className="flex items-center gap-2 ml-auto h-[48px]"> {/* Added explicit height with 20% increase */}
        <ModeToggle />

        <Button 
          variant="ghost" 
          size="icon" 
          className="relative hidden sm:flex h-full"
          aria-label="Notifications (1 unread)"
        >
          <Bell className="h-5 w-5" />
          <span 
            className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
            aria-hidden="true"
          ></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 border border-border rounded-md p-1 sm:p-2 h-full"
              aria-label="User menu"
            >
              <Avatar className="h-7 w-7">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">john@example.com</span>
              </div>
              <ChevronDown className="h-4 w-4 ml-0 md:ml-1 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-full min-w-[200px]">
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings?tab=subscriptions" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Subscriptions
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/pricing" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Upgrade to PRO
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>;
}

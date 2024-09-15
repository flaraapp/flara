import { UserProfile } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, CreditCard, Settings, Keyboard, Users, UserPlus, Mail, MessageSquare, PlusCircle, Plus, Github, LifeBuoy, Cloud, LogOut, Home } from 'lucide-react';

interface UserMenuProps {
    user: UserProfile;
}

export default function UserMenu({ user }: UserMenuProps) {
    const [isHovered, setIsHovered] = useState(false);
    const chevronVariants = {
        open: { rotate: 180 },
        closed: { rotate: 0 },
    };
    const [position, setPosition] = useState("bottom")
    const getName = () => {
        let displayName = user.name || user.email?.split("@")[0] || 'User';
        return displayName;
    }
    return (
        <div
            className="">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'ghost'} className='w-8 h-8 rounded-full translate-y-[0.25rem]'>
                    <Avatar className='h-8 w-8 cursor-pointer'>
                        <AvatarImage src={user.picture || ""} />
                        <AvatarFallback>{getName().substring(0,2)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mx-4">
        <DropdownMenuLabel>{getName()}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Upgrade</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-red-500'>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
        </DropdownMenu>
        </div>
    );
}

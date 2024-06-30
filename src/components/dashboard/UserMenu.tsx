import { UserProfile } from '@auth0/nextjs-auth0/client';
import Image from 'next/image'
import NavItem from '../navbar/NavItem'; // Assuming NavItem is properly imported

interface UserMenuProps {
    user: UserProfile;
}
export default function UserMenu({user}: UserMenuProps) {

  return (
    <div className="absolute top-0 right-0 mt-4 mr-4 border-2 p-3 rounded-full shadow-md">
      <div className="flex items-center cursor-pointer">
        <Image src={user.picture as string} alt={user.name as string} className="w-8 h-8 rounded-full mr-2" width={10} height={10}/>
        <NavItem name={user.nickname || user.name as string} childrenItems={[{name:"Logout", href: "/api/auth/logout"}, {name:"Home", href: "/home"}]}/>
      </div>
    </div>
  );
};

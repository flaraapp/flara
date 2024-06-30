import { UserProfile } from '@auth0/nextjs-auth0/client';
import Image from 'next/image'
import NavItem from '../navbar/NavItem'; // Assuming NavItem is properly imported

interface UserMenuProps {
    user: UserProfile;
}
export default function UserMenu({user}: UserMenuProps) {

  return (
    <div className="absolute top-0 right-0 mt-4 mr-4 border p-3 rounded-full shadow-md">
      <div className="flex items-center cursor-pointer">
        <Image src={user.picture || "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"} alt={user.name as string} className="border w-8 h-8 rounded-full mr-2" width={50} height={50}/>
        <NavItem dropdown={true} name={user.nickname || user.name as string} childrenItems={[{name:"Logout", href: "/api/auth/logout"}, {name:"Home", href: "/home"}]}/>
      </div>
    </div>
  );
};
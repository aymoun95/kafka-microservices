import React from "react";
import { Button } from "../ui/Button";
import { Heading, Text } from "../ui/Typography";

interface NavbarProps {
  userEmail: string;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ userEmail, onLogout }) => {
  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white text-lg font-bold">
            B
          </div>
          <div>
            <Heading variant="h3" className="!text-base !font-bold !text-black">
              The Boutique
            </Heading>
            <Text size="xs" className="!text-[10px] !text-gray-500">
              Premium Store
            </Text>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <Text
              size="xs"
              className="!text-[10px] uppercase tracking-wider !text-gray-400"
            >
              Signed in
            </Text>
            <Text size="sm" className="font-medium !text-black">
              {userEmail}
            </Text>
          </div>
          <Button variant="secondary" size="sm" onClick={onLogout}>
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

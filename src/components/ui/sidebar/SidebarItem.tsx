import Link from "next/link";
import { IconType } from "react-icons";

interface Props {
  href: string;
  label: string;
  Icon: IconType;
  onClick: () => void;
}

export const SidebarItem = ({ href, label, Icon, onClick }: Props) => {
  return (
    <Link
      href={href}
      className="flex items-center p-2 rounded hover:bg-gray-100 transition-all"
      onClick={ onClick }
    >
      <Icon size={30} />
      <span className="ml-3 text-xl">{label}</span>
    </Link>
  );
};

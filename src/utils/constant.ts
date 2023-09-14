
import { IconAdminMenuActivities, IconAdminMenuPanel, IconAdminMenuHelpCenter, IconAdminMenuAdvertisement, IconAdminMenuPost, IconAdminMenuMesseges, IconAdminMenuServeces, IconAdminMenuUsers } from '../components/svg/IconAdminMenu'

export type MenuItem = {
  name: string;
  label: () => JSX.Element;
  subName: string[];
};

export const routesMenu: MenuItem[] = [
  { name: "Admin Panel", label: IconAdminMenuPanel, subName: [] },
  { name: "Posts", label: IconAdminMenuPost , subName: ["Posts", "Comments", "Reports"] },
  { name: "Users", label: IconAdminMenuUsers , subName: ["All Users", "Coordinators", "Blocked", "Groups"] },
  { name: "Advertisement", label: IconAdminMenuAdvertisement , subName: ["Advertisement", "Request", "Past"] },
  { name: "Messeges", label: IconAdminMenuMesseges , subName: [] },
  { name: "Help Center", label: IconAdminMenuHelpCenter , subName: [] },
  { name: "Services", label: IconAdminMenuServeces , subName: [] },
  { name: "Activities", label: IconAdminMenuActivities , subName: ["Activities", "Comments", "Reports"] },
];

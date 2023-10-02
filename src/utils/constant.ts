
import { IconBoxComment } from '../components/svg/IconActivitiesModal';
import { IconAdminMenuActivities, IconAdminMenuPanel, IconAdminMenuHelpCenter, IconAdminMenuAdvertisement, IconAdminMenuPost, IconAdminMenuMesseges, IconAdminMenuServeces, IconAdminMenuUsers } from '../components/svg/IconAdminMenu'
import { IconProfileInfoBookmark, IconProfileInfoComments, IconProfileInfoFlag, IconProfileInfoKey, IconProfileInfoNotification } from '../components/svg/IconProfileInfo';

export type MenuItem = {
  name: string;
  label: () => JSX.Element;
  subName: string[];
};

export const routesMenu: MenuItem[] = [
  { name: "Admin Panel", label: IconAdminMenuPanel, subName: [] },
  { name: "Posts", label: IconAdminMenuPost, subName: ["Posts", "Comments", "Reports"] },
  { name: "Users", label: IconAdminMenuUsers, subName: ["All Users", "Coordinators", "Blocked", "Groups"] },
  { name: "Advertisement", label: IconAdminMenuAdvertisement, subName: ["Advertisement", "Request", "Past"] },
  { name: "Messeges", label: IconAdminMenuMesseges, subName: [] },
  { name: "Help Center", label: IconAdminMenuHelpCenter, subName: [] },
  { name: "Services", label: IconAdminMenuServeces, subName: [] },
  { name: "Activities", label: IconAdminMenuActivities, subName: ["Activities", "Comments", "Reports"] },
];

export type ProfileInfoHelp = Omit<MenuItem, 'subName'>
export type ProfileInfoSettings = ProfileInfoHelp & { subName: string };

export const profileInfoSettings: ProfileInfoSettings[] = [
  { name: "Security", label: IconProfileInfoKey, subName: "Secure your account" },
  { name: "Bookmark", label: IconProfileInfoBookmark, subName: "Manage your saved itens" },
  { name: "Interests & Skills", label: IconBoxComment, subName: "Manage your interests and skills" },
  { name: "Notifications", label: IconProfileInfoNotification, subName: "Manage your notifications" },
  { name: "Privacy", label: IconProfileInfoFlag, subName: "Manage your privacy settings" },
]

export const profileInfoHelp: ProfileInfoHelp[] = [
  { name: "Help & Support", label: IconBoxComment },
  { name: "About NeightborHarbor", label: IconProfileInfoComments },
]

import {
  Briefcase,
  Building2,
  LayoutDashboard,
  MessageSquare,
  Tag,
  Users,
} from 'lucide-react'
import { adminPaths } from './paths'

export const sidebarNavigations = {
  admin: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: adminPaths.dashboard,
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      path: adminPaths.users,
    },
    {
      id: 'companies',
      label: 'Companies',
      icon: Building2,
      path: adminPaths.companies,
    },
    {
      id: 'jobRoles',
      label: 'Job Roles',
      icon: Briefcase,
      path: adminPaths.jobRoles,
    },
    {
      id: 'interviewTypes',
      label: 'Interview Types',
      icon: MessageSquare,
      path: adminPaths.interviewTypes,
    },
    {
      id: 'tags',
      label: 'Tags',
      icon: Tag,
      path: adminPaths.tags,
    },
  ],
}

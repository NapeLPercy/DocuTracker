// navConfig.js

export const MANAGER_NAV = [
  {
    section: "Overview",
    items: [
      {
        label: "Dashboard",
        path: "manager/dashboard",
        icon: "LayoutDashboard",
      },
    ],
  },
  {
    section: "People",
    items: [
      {
        label: "Add users",
        path: "manager/team/add",
        icon: "UserPlus",
      },
      {
        label: "View/Edit/Remove users",
        path: "manager/users",
        icon: "Users",
      },
    ],
  },
  {
    section: "Batches",
    items: [
      {
        label: "Add batch",
        path: "manager/batch/add",
        icon: "UserPlus",
      },
      {
        label: "View batches",
        path: "manager/batches",
        icon: "Users",
      },
    ],
  },
  {
    section: "Tasks",
    items: [
      {
        label: "Add Tasks",
        path: "manager/task/add",
        icon: "ClipboardPlus",
      },
      {
        label: "View/Edit/Remove tasks",
        path: "manager/tasks",
        icon: "ClipboardList",
      },
    ],
  },
  {
    section: "Comments",
    items: [
      {
        label: "View reports",
        path: "manager/reports",
        icon: "MessageSquareText",
      },
    ],
  },
  {
    section: "Insights",
    items: [
      {
        label: "Reports",
        path: "/manager/reports",
        icon: "BarChart3",
      },
      {
        label: "Usage Metrics",
        path: "manager/metrics",
        icon: "TrendingUp",
      },
    ],
  },
  {
    section: "System",
    items: [
      {
        label: "Settings",
        path: "/manager/settings",
        icon: "Settings2",
      },
    ],
  },
];

export const WORKER_NAV = [
  {
    section: "My Workspace",
    items: [
      {
        label: "My Dashboard",
        path: "personell/dashboard",
        icon: "LayoutDashboard",
      },
    ],
  },
  {
    section: "Actions",
    items: [
      {
        label: "Tasks",
        path: "personell/tasks",
        icon: "ClipboardList",
      },
    ],
  },
  {
    section: "Comments",
    items: [
      {
        label: "View reports",
        path: "personell/reports",
        icon: "MessageSquareText",
      },
    ],
  },
  {
    section: "Insights",
    items: [
      {
        label: "Usage Metrics",
        path: "personell/metrics",
        icon: "TrendingUp",
      },
    ],
  },
];

// Helper — pick the right nav based on role
export function getNavByRole(role) {
  return role === "MANAGER" ? MANAGER_NAV : WORKER_NAV;
}

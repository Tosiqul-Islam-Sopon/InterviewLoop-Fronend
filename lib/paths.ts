export const rootPaths = {
    home: "/",
    login: "/login",
    signup: "/signup",
    admin: "/admin",
    adminDashboard: "/admin/dashboard",
}

export const adminPaths = {
    dashboard: `${rootPaths.adminDashboard}`,
    users: `${rootPaths.adminDashboard}/users`,
    companies: `${rootPaths.adminDashboard}/companies`,
    jobRoles: `${rootPaths.adminDashboard}/job-roles`,
    interviewTypes: `${rootPaths.adminDashboard}/interview-types`,
    tags: `${rootPaths.adminDashboard}/tags`,
}

export const Roles = {
    ADMIN: 'admin',
    USER: 'user',
};
  
export const Permissions = {
    admin: ['dashboard', 'manageCourses', 'manageUsers', 'analytics'],
    user: ['dashboard', 'myCourses', 'profile'],
};
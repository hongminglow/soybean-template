import { useUserManagementStore } from '@/store/modules/user-management';
import { request } from '../request';

/**
 * Get user list
 *
 * @param params query params
 */
export function fetchUserList(params?: Api.SystemManagement.UserSearchParams) {
  return request<Api.SystemManagement.UserList>({
    url: '/systemManagement/getUserList',
    method: 'get',
    params
  });
}

/**
 * Add user
 *
 * @param data user data
 */
export function addUser(data: any) {
  const userStore = useUserManagementStore();
  userStore.addUser(data);
  return Promise.resolve({ data: true, error: null });
}

/**
 * Update user
 *
 * @param data user data
 */
export function updateUser(data: any) {
  const userStore = useUserManagementStore();
  userStore.updateUser(data);
  return Promise.resolve({ data: true, error: null });
}

/**
 * Get user details by ID (Mock)
 */
export function fetchUserDetails(id: number) {
  const userStore = useUserManagementStore();
  return Promise.resolve({ data: userStore.getUserById(id), error: null });
}

/**
 * Get user list (Mock for demo using store)
 */
export async function fetchUserListMock(
  params?: Api.SystemManagement.UserSearchParams
): Promise<Api.SystemManagement.UserList> {
  const userStore = useUserManagementStore();
  // Simulate delay
  await new Promise(resolve => {
    setTimeout(resolve, 500);
  });

  return userStore.fetchUsers(params);
}

/**
 * Delete user
 *
 * @param id user id
 */
export function deleteUser(id: number) {
  const userStore = useUserManagementStore();
  userStore.deleteUser(id);
  return Promise.resolve({ data: true, error: null });
}

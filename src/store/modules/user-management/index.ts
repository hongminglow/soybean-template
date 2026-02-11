import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserManagementStore = defineStore('user-management', () => {
  const userList = ref<Api.SystemManagement.User[]>([
    {
      id: 1,
      userName: 'admin',
      userGender: '1',
      nickName: 'Soybean',
      userPhone: '13800138000',
      userEmail: 'admin@soybean.com',
      userRoles: ['R_ADMIN'],
      status: '1',
      createBy: 'system',
      createTime: '2024-01-01 12:00:00',
      updateBy: 'system',
      updateTime: '2024-01-01 12:00:00'
    },
    {
      id: 2,
      userName: 'test_user',
      userGender: '2',
      nickName: 'Testing',
      userPhone: '13712345678',
      userEmail: 'test@gmail.com',
      userRoles: ['R_USER'],
      status: '2',
      createBy: 'admin',
      createTime: '2024-02-10 10:00:00',
      updateBy: 'admin',
      updateTime: '2024-02-10 10:00:00'
    }
  ]);

  const lastCreatedUser = ref<Api.SystemManagement.User | null>(null);

  function getUserById(id: number) {
    return userList.value.find(user => user.id === id);
  }

  function fetchUsers(params?: Api.SystemManagement.UserSearchParams) {
    let filtered = [...userList.value];
    if (params) {
      if (params.userName) {
        filtered = filtered.filter(u => u.userName.includes(params.userName!));
      }
      if (params.userGender) {
        filtered = filtered.filter(u => u.userGender === params.userGender);
      }
      if (params.nickName) {
        filtered = filtered.filter(u => u.nickName.includes(params.nickName!));
      }
      if (params.status) {
        filtered = filtered.filter(u => u.status === params.status);
      }
    }

    const total = filtered.length;
    const current = params?.current || 1;
    const size = params?.size || 10;
    const start = (current - 1) * size;
    const records = filtered.slice(start, start + size);

    return {
      records,
      total,
      current,
      size
    };
  }

  function addUser(user: Api.SystemManagement.User) {
    const newId = userList.value.length > 0 ? Math.max(...userList.value.map(u => u.id)) + 1 : 1;
    const newUser = { ...user, id: newId, createTime: new Date().toLocaleString() };
    userList.value.unshift(newUser);
    lastCreatedUser.value = newUser;
  }

  function updateUser(user: Api.SystemManagement.User) {
    const index = userList.value.findIndex(u => u.id === user.id);
    if (index !== -1) {
      userList.value[index] = { ...user, updateTime: new Date().toLocaleString() };
    }
  }

  function deleteUser(id: number) {
    userList.value = userList.value.filter(u => u.id !== id);
  }

  return {
    userList,
    lastCreatedUser,
    getUserById,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser
  };
});

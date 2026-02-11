<script setup lang="tsx">
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { NButton, NCard, NDataTable, NEmpty, NSpace, NTag } from 'naive-ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { enableStatusOptions } from '@/constants/business';
import { deleteUser, fetchUserListMock } from '@/service/api/user-management';
import { $t } from '@/locales';
import UserSearch from './modules/user-search.vue';

/**
 * User Management List Page
 */
defineOptions({
  name: 'UserManagement'
});

const router = useRouter();
const queryClient = useQueryClient();

// Search params
const searchParams = reactive<Api.SystemManagement.UserSearchParams>({
  current: 1,
  size: 10,
  userName: '',
  userGender: undefined,
  nickName: '',
  userPhone: '',
  userEmail: '',
  status: undefined
});

/**
 * 1. TanStack Query for data fetching
 */
const { data, isLoading, refetch } = useQuery({
  queryKey: ['user-list', searchParams],
  queryFn: () => fetchUserListMock(searchParams)
});

/**
 * 2. TanStack Query for mutation (Delete)
 */
const { mutate: deleteMutation } = useMutation({
  mutationFn: (id: number) => deleteUser(id),
  onSuccess: () => {
    window.$message?.success($t('common.deleteSuccess'));
    queryClient.invalidateQueries({ queryKey: ['user-list'] });
  },
  onError: (error: any) => {
    window.$message?.error(error.message || 'Delete failed');
  }
});

function handleDelete(id: number) {
  window.$dialog?.warning({
    title: $t('common.tip'),
    content: $t('common.confirmDelete'),
    positiveText: $t('common.confirm'),
    negativeText: $t('common.cancel'),
    onPositiveClick: () => {
      deleteMutation(id);
    }
  });
}

const tableData = computed(() => data.value?.records || []);

function handleAdd() {
  router.push({ name: 'management_user-operate' });
}

function handleEdit(id: number) {
  router.push({ name: 'management_user-operate', query: { id: id.toString() } });
}

// Table columns
const columns = computed<NaiveUI.TableColumn<Api.SystemManagement.User>[]>(() => [
  {
    type: 'selection',
    align: 'center',
    width: 48
  },
  {
    key: 'index',
    title: $t('common.index'),
    width: 64,
    align: 'center',
    render: (_, index) => {
      return (searchParams.current - 1) * searchParams.size + index + 1;
    }
  },
  {
    key: 'userName',
    title: $t('page.management.user.userName'),
    align: 'center',
    minWidth: 100
  },
  {
    key: 'userGender',
    title: $t('page.management.user.userGender'),
    align: 'center',
    width: 100,
    render: row => {
      if (row.userGender === null) return null;
      const tagMap: Record<Api.SystemManagement.UserGender, NaiveUI.ThemeColor> = {
        '1': 'primary',
        '2': 'error'
      };
      const label =
        row.userGender === '1' ? $t('page.management.user.gender.male') : $t('page.management.user.gender.female');
      return <NTag type={tagMap[row.userGender]}>{label}</NTag>;
    }
  },
  {
    key: 'nickName',
    title: $t('page.management.user.nickName'),
    align: 'center',
    minWidth: 100
  },
  {
    key: 'userPhone',
    title: $t('page.management.user.userPhone'),
    align: 'center',
    width: 150
  },
  {
    key: 'userEmail',
    title: $t('page.management.user.userEmail'),
    align: 'center',
    minWidth: 200
  },
  {
    key: 'status',
    title: $t('page.management.user.userStatus'),
    align: 'center',
    width: 100,
    render: row => {
      if (row.status === null) return null;
      const tagMap: Record<Api.Common.EnableStatus, NaiveUI.ThemeColor> = {
        '1': 'success',
        '2': 'error'
      };
      const statusLabel = enableStatusOptions.find(item => item.value === row.status)?.label || row.status;
      return <NTag type={tagMap[row.status as Api.Common.EnableStatus]}>{statusLabel}</NTag>;
    }
  },
  {
    key: 'operate',
    title: $t('common.operate'),
    align: 'center',
    width: 130,
    render: row => (
      <div class="flex-center gap-8px">
        <NButton type="primary" ghost size="small" onClick={() => handleEdit(row.id)}>
          {$t('common.edit')}
        </NButton>
        <NButton type="error" ghost size="small" onClick={() => handleDelete(row.id)}>
          {$t('common.delete')}
        </NButton>
      </div>
    )
  }
]);

function handleSearch() {
  searchParams.current = 1;
  refetch();
}

function handleReset() {
  Object.assign(searchParams, {
    current: 1,
    size: 10,
    userName: '',
    userGender: null,
    nickName: '',
    userPhone: '',
    userEmail: '',
    status: null
  });
  refetch();
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden p-16px lt-sm:overflow-auto">
    <UserSearch v-model:model="searchParams" @reset="handleReset" @search="handleSearch" />

    <NCard
      :title="$t('page.management.user.title')"
      :bordered="false"
      size="small"
      class="card-wrapper rd-12px shadow-sm sm:flex-1-hidden"
    >
      <template #header-extra>
        <NSpace>
          <NButton type="primary" @click="handleAdd">
            <template #icon><icon-ic-baseline-plus /></template>
            {{ $t('page.management.user.addUser') }}
          </NButton>
          <NButton :loading="isLoading" @click="() => refetch()">
            <template #icon><icon-ic-outline-refresh /></template>
          </NButton>
        </NSpace>
      </template>

      <NDataTable
        :columns="columns"
        :data="tableData"
        :loading="isLoading"
        flex-height
        remote
        :row-key="row => row.id"
        :pagination="{
          page: searchParams.current,
          pageSize: searchParams.size,
          itemCount: data?.total || 0,
          showSizePicker: true,
          pageSizes: [10, 15, 20, 25, 30],
          onUpdatePage: (page: number) => {
            searchParams.current = page;
            refetch();
          },
          onUpdatePageSize: (pageSize: number) => {
            searchParams.size = pageSize;
            searchParams.current = 1;
            refetch();
          }
        }"
        class="sm:h-full"
      >
        <template #empty>
          <div class="flex-center flex-col py-40px">
            <NEmpty :description="$t('common.noData')" />
          </div>
        </template>
      </NDataTable>
    </NCard>
  </div>
</template>

<style scoped>
.card-wrapper {
  background-color: var(--n-color);
}
</style>

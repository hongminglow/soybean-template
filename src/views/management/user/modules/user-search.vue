<script setup lang="ts">
import { userGenderOptions } from '@/constants/business';
import { useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'UserSearch'
});

interface Emits {
  (e: 'search'): void;
  (e: 'reset'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.SystemManagement.UserSearchParams>('model', { required: true });

async function reset() {
  await restoreValidation();
  emit('reset');
}

async function search() {
  await validate();
  emit('search');
}
</script>

<template>
  <NCard :bordered="false" size="small" class="rd-12px shadow-sm">
    <NForm ref="formRef" :model="model" label-placement="left" :label-width="80" size="small" class="p-0">
      <!-- Use NGrid with explicit column counts to ensure the row layout requested -->
      <NGrid :x-gap="16" :y-gap="12" :cols="24" responsive="screen" item-responsive>
        <!-- 3 inputs taking 6 columns each (18/24) -->
        <NGi span="24 m:8 l:6">
          <NFormItem :label="$t('page.management.user.userName')" path="userName" class="w-full">
            <NInput v-model:value="model.userName" :placeholder="$t('page.management.user.userName')" clearable />
          </NFormItem>
        </NGi>
        <NGi span="24 m:8 l:6">
          <NFormItem :label="$t('page.management.user.nickName')" path="nickName" class="w-full">
            <NInput v-model:value="model.nickName" :placeholder="$t('page.management.user.nickName')" clearable />
          </NFormItem>
        </NGi>
        <NGi span="24 m:8 l:6">
          <NFormItem :label="$t('page.management.user.userGender')" path="userGender" class="w-full">
            <NSelect
              v-model:value="model.userGender"
              :placeholder="$t('page.management.user.userGender')"
              :options="userGenderOptions"
              clearable
            />
          </NFormItem>
        </NGi>
        <!-- Buttons taking the remaining space, aligned right in the same row -->
        <NGi span="24 m:24 l:6" class="flex-y-center justify-end">
          <NSpace size="small">
            <NButton type="primary" size="small" @click="search">
              <template #icon>
                <icon-ic-outline-search />
              </template>
              {{ $t('common.search') }}
            </NButton>
            <NButton size="small" @click="reset">
              <template #icon>
                <icon-ic-outline-refresh />
              </template>
              {{ $t('common.reset') }}
            </NButton>
          </NSpace>
        </NGi>
      </NGrid>
    </NForm>
  </NCard>
</template>

<style scoped>
:deep(.n-form-item) {
  margin-bottom: 0px;
}
:deep(.n-form-item-blank) {
  min-height: auto;
}
</style>

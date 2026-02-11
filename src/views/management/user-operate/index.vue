<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { enableStatusOptions, userGenderOptions } from '@/constants/business';
import { addUser, fetchUserDetails, updateUser } from '@/service/api/user-management';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'UserOperatePage'
});

const route = useRoute();
const router = useRouter();

const type = computed<'add' | 'edit'>(() => (route.query.id ? 'edit' : 'add'));
const title = computed(() =>
  type.value === 'add' ? $t('page.management.user.addUser') : $t('page.management.user.editUser')
);

const { formRef, validate } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const model = reactive(createDefaultModel());

function createDefaultModel(): Api.SystemManagement.User {
  return {
    id: -1,
    userName: '',
    nickName: '',
    userPhone: '',
    userEmail: '',
    userGender: null,
    status: '1',
    userRoles: []
  };
}

const rules: Record<string, any> = {
  userName: defaultRequiredRule,
  nickName: defaultRequiredRule,
  userPhone: [defaultRequiredRule],
  userEmail: [defaultRequiredRule]
};

async function handleSubmit() {
  await validate();

  const apiFn = type.value === 'add' ? addUser : updateUser;
  const { error } = await apiFn(model);

  if (!error) {
    window.$message?.success(type.value === 'add' ? $t('common.addSuccess') : $t('common.updateSuccess'));
    goBack();
  }
}

function goBack() {
  router.push({ name: 'management_user' });
}

async function getInitData() {
  const id = Number(route.query.id);
  if (!id) return;

  const { data, error } = await fetchUserDetails(id);
  if (!error && data) {
    Object.assign(model, data);
  }
}

onMounted(() => {
  if (type.value === 'edit') {
    getInitData();
  }
});
</script>

<template>
  <div class="h-full p-16px">
    <NCard :title="title" :bordered="false" class="h-full rd-12px shadow-sm">
      <!-- Removed max-w-1200px to allow the form to fill the entire page width -->
      <NForm ref="formRef" :model="model" :rules="rules" label-placement="top" class="w-full">
        <NGrid :x-gap="24" :y-gap="2" :cols="24" responsive="screen">
          <NGi span="24 m:12 l:8">
            <NFormItem :label="$t('page.management.user.userName')" path="userName">
              <NInput v-model:value="model.userName" :placeholder="$t('page.management.user.userName')" />
            </NFormItem>
          </NGi>
          <NGi span="24 m:12 l:8">
            <NFormItem :label="$t('page.management.user.nickName')" path="nickName">
              <NInput v-model:value="model.nickName" :placeholder="$t('page.management.user.nickName')" />
            </NFormItem>
          </NGi>
          <NGi span="24 m:12 l:8">
            <NFormItem :label="$t('page.management.user.userGender')" path="userGender">
              <NRadioGroup v-model:value="model.userGender">
                <NSpace>
                  <NRadio
                    v-for="item in userGenderOptions"
                    :key="item.value"
                    :value="item.value"
                    :label="
                      item.value === '1'
                        ? $t('page.management.user.gender.male')
                        : $t('page.management.user.gender.female')
                    "
                  />
                </NSpace>
              </NRadioGroup>
            </NFormItem>
          </NGi>
          <NGi span="24 m:12 l:8">
            <NFormItem :label="$t('page.management.user.userPhone')" path="userPhone">
              <NInput v-model:value="model.userPhone" :placeholder="$t('page.management.user.userPhone')" />
            </NFormItem>
          </NGi>
          <NGi span="24 m:12 l:8">
            <NFormItem :label="$t('page.management.user.userEmail')" path="userEmail">
              <NInput v-model:value="model.userEmail" :placeholder="$t('page.management.user.userEmail')" />
            </NFormItem>
          </NGi>
          <NGi span="24 m:12 l:8">
            <NFormItem :label="$t('page.management.user.userStatus')" path="status">
              <NRadioGroup v-model:value="model.status">
                <NSpace>
                  <NRadio
                    v-for="item in enableStatusOptions"
                    :key="item.value"
                    :value="item.value"
                    :label="item.value === '1' ? $t('common.yesOrNo.yes') : $t('common.yesOrNo.no')"
                  />
                </NSpace>
              </NRadioGroup>
            </NFormItem>
          </NGi>
        </NGrid>
        <NSpace class="mt-24px pt-12px">
          <NButton type="primary" class="w-120px" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
          <NButton secondary @click="goBack">{{ $t('common.cancel') }}</NButton>
        </NSpace>
      </NForm>
    </NCard>
  </div>
</template>

<style scoped>
:deep(.n-form-item) {
  margin-bottom: 8px;
}
</style>

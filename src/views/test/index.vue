<script setup lang="ts">
import { ref } from 'vue';

// Reactive data for input
const testValue = ref('');

// Demo function for button
function handleSearch() {
  window.$message?.info(`Search value: ${testValue.value}`);
}
</script>

<template>
  <NSpace vertical :size="16">
    <!-- 1. Alert with UnoCSS margin -->
    <NAlert title="Refactor Demo" type="info" class="mb-16px">
      This page demonstrates the combination of Naive UI components and UnoCSS shortcuts.
    </NAlert>

    <!-- 2. Card with responsive grid inside -->
    <NCard title="Common Components Demo" :bordered="false" class="rd-12px shadow-sm">
      <NGrid :x-gap="24" :y-gap="24" cols="24" item-responsive>
        <!-- Form Section -->
        <NGi span="24 m:12">
          <NSpace vertical>
            <NText strong>Input with clearable and enter trigger</NText>
            <NInput v-model:value="testValue" placeholder="Type something..." clearable @keyup.enter="handleSearch" />
          </NSpace>
        </NGi>

        <!-- Button Section using UnoCSS shortcuts -->
        <NGi span="24 m:12">
          <div class="h-full flex-y-center gap-12px pt-22px">
            <NButton type="primary" @click="handleSearch">
              <template #icon>
                <icon-mdi-magnify />
              </template>
              Search
            </NButton>
            <NButton quaternary @click="testValue = ''">Reset</NButton>
          </div>
        </NGi>
      </NGrid>
    </NCard>

    <!-- 3. Space layout demo -->
    <NCard title="Button Styles & Spacing" :bordered="false" class="rd-12px shadow-sm">
      <NSpace wrap :size="[12, 12]">
        <NButton type="primary">Primary</NButton>
        <NButton type="info">Info</NButton>
        <NButton type="success">Success</NButton>
        <NButton type="warning">Warning</NButton>
        <NButton type="error">Error</NButton>
        <NButton strong secondary type="primary">Secondary</NButton>
        <NButton dashed>Dashed</NButton>
      </NSpace>
    </NCard>
  </NSpace>
</template>

<style scoped></style>

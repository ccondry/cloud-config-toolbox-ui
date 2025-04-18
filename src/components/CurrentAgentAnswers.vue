<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { csvStringToArray } from '../utils.ts'
import { useUserStore } from '@/stores'
import { useAnswerStore } from '@/stores'
import ContentPanel from './ContentPanel.vue'

const userStore = useUserStore()
const answerStore = useAnswerStore()

const userId = computed(() => {
  try {
    return userStore.user?.id || ''
  } catch (e) {
    return ''
  }
})
const isLoading = computed(() => answerStore.loading.answers)
const isWorking = computed(() => answerStore.working.answers)
const kbJson = computed(() => {
  if (!answerStore.kb.data) {
    return []
  }
  try {
    const json = csvStringToArray(answerStore.kb.data)
    return json.map(row => {
      return {
        question: row[0],
        answer: row[1]
      }
    })
  } catch (e) {
    return []
  }
})
const csvHref = computed(() => {
  try {
    return `data:text/csv;charset=utf-8,${encodeURIComponent(answerStore.kb.data)}`
  } catch (e) {
    return null
  }
})

onMounted(() => {
  answerStore.getKnowledgeBase()
})
</script>

<template>
  <ContentPanel
  title="Your Current Agent Answers KB"
  ariaId="current-agent-answers-kb"
  :has-refresh="true"
  >
    <b-table
    style="width: 100%;"
    :loading="isLoading || isWorking"
    :data="kbJson"
    :paginated="true"
    >
      <b-table-column
      v-slot="props"
      sortable
      searchable
      field="question"
      label="Question"
      width="30%"
      >
        {{ props.row.question }}
      </b-table-column>
      <b-table-column
      v-slot="props"
      sortable
      searchable
      field="answer"
      label="Answer"
      >
        {{ props.row.answer }}
      </b-table-column>

      <!-- empty table display -->
      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p v-if="isLoading">
              Checking for your Agent Answers KB...
            </p>
            <p v-else>
              No Agent Answers KB found for your user account.
            </p>
          </div>
        </section>
      </template>

      <!-- table footer -->
      <template slot="footer">
        <div class="has-text-right">
          <!-- download -->
          <b-button
          v-if="kbJson.length"
          style="margin-right: 1rem;"
          type="is-info"
          rounded
          tag="a"
          :href="csvHref"
          :download="`${userId}.csv`"
          >
            Download CSV
          </b-button>

          <!-- refersh -->
          <b-button
          style="margin-right: 1rem;"
          type="is-primary"
          rounded
          @click="answerStore.getKnowledgeBase()"
          >
            Refresh
          </b-button>
          Total Questions: {{ kbJson.length }}
        </div>
      </template>
    </b-table>
  </ContentPanel>
</template>

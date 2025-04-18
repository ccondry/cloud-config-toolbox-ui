<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useAnswerStore } from '@/stores'
import ContentPanel from './ContentPanel.vue'
import { DialogProgrammatic as Dialog } from 'buefy'

const answerStore = useAnswerStore()

const isLoading = computed(() => {
  return answerStore.loading.answers
})
const isWorking = computed(() => {
  return answerStore.working.answers
})
const file = ref<Blob | null>(null)
watch(file, () => {
  if (!file.value) {
    return
  }
  // set up file reader
  const reader = new window.FileReader()
  const name = file?.value?.name
  reader.onload = (e) => {
    const data = e.currentTarget?.result
    answerStore.uploadFile({
      name,
      data
    }).then(() => {
      // reset file upload
      file.value = null
    })
  }
  let message = `Are you sure you want to upload <b>${name}</b> `
  message += 'as a Agent Answers knowledge base?'
  if (answerStore.kb && answerStore.kb.data) {
    message += ' This will <strong>overwrite</strong> your existing knowledge base.'
  }
  // make user confirm they want to upload the file
  new Dialog().confirm({
    title: 'Confirm Upload',
    message,
    type: 'is-success',
    confirmText: 'Upload',
    onConfirm: () => {
      // read the file data and upload the file
      if (file.value) {
        reader.readAsDataURL(file.value)
      }
    },
    onCancel: () => {
      file.value = null
    }
  })
})
</script>

<template>
  <ContentPanel title="Upload Your Custom Files">
    <b-loading :active="isLoading || isWorking" :is-full-page="false" />
    <b-field>
      <b-upload v-model="file"
      drag-drop
      expanded
      accept=".csv"
      >
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon icon="upload" size="is-large" />
            </p>
            <p>
              Click here to upload on the followig files:
              <br />
              - Agent Answers Knowledge Base CSV file
              <br />
              - AI Agent JSON file
              <br />
              - DialogFlow CX zip file
            </p>
          </div>
        </section>
      </b-upload>
    </b-field>
  </ContentPanel>
</template>

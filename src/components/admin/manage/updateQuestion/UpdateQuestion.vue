<template>
  <question-form
  v-if="showForm"
   :currentQuestion="question"
   @close="$router.go(-1)"
   ></question-form>
</template>

<script>
import QuestionForm from '../QuestionForm'
import Question from 'models/Question'
export default {
  name: 'updateQuestion',
  data () {
    return {
      question: new Question(),
      showForm: false
    }
  },
  mounted () {
    if (this.$route.params.question) {
      this.question.parse(this.$route.params.question)
      this.showForm = true
    } else {
      this.$router.replace({ name: 'manage' })
    }
  },
  components: {
    QuestionForm
  }
}
</script>

<style lang="css">
</style>

<template >
<div class="question_section">
  <div class="question_form">
    <div class="question_form_top">
      <input
        name="questionTitle"
        class="glovoInput"
        type="text"
        placeholder="label"
        v-model="answer.label" />
    </div>
    <input
      name="questionRelation"
      class="glovoInput"
      type="number"
      placeholder="time"
      v-model="answer.time" />
    <input
      name="questionRelation"
      class="glovoInput"
      type="number"
      placeholder="happiness"
      v-model="answer.happiness" />
    <input
      name="questionRelation"
      class="glovoInput"
      type="number"
      placeholder="money"
      v-model="answer.money" />
    <input
      name="questionRelation"
      @click="showListRelated = true"
      class="glovoInput"
      type="number"
      placeholder="Question related"
      v-model="answer.question_related" />
      <div class="row error">
        {{errorText}}
      </div>
    <div class="row" v-if="showButton">
      <div
        class="formButton loginButton btn"
        @click="createOrUpdateAnswer"
        >
        {{submit}}
        <v-progress-circular small yellow :class="{'active': callInProgress}" class="circ_progress" />
      </div>
    </div>
  </div>
  <div class="related_list" v-if="showListRelated">
    <div class="related_list_wrapper">
      <div class="cross" @click="showListRelated = false">
          <icon name="cross"></icon>
      </div>
      <question-list @questionSelected="setRelatedField" :questions="questions" :selectable="true"></question-list>
    </div>
  </div>
</div>

</template>

<script>
import Dropzone from 'vue2-dropzone'
import { mapActions, mapGetters } from 'vuex'
import { question as APIquestion } from 'api'
import fetch from 'api/fetch'
import Icon from 'common/icon/Icon'
import QuestionList from './QuestionList'

export default {
  name: 'answer-form',
  props: ['currentAnswer', 'questionId'],
  data () {
    return {
      errorText: '',
      showSection: false,
      showButton: true,
      showListRelated: false,
      answer: {},
      submit: 'Create',
      callInProgress: false
    }
  },
  watch: {
    currentAnswer () {
      if (this.currentAnswer && this.currentAnswer.id) {
        this.answer = {
          id: this.currentAnswer.id,
          label: this.currentAnswer.label,
          happiness: this.currentAnswer.happiness,
          money: this.currentAnswer.money,
          question_related: this.currentAnswer.question_related,
          time: this.currentAnswer.time
        }
        this.submit = 'Update'
      } else {
        this.submit = 'Create'
      }
    }
  },
  methods: {
    ...mapActions([
      'retrieveQuestions'
    ]),
    setRelatedField (id) {
      this.answer.question_related = id
      this.showListRelated = false
    },
    createOrUpdateAnswer () {
      if (this.submit === 'Create') {
        if (this.answer.label && this.answer.time && this.answer.money && this.answer.happiness) {
          if (this.questionId) {
            this.answer.question_id = this.questionId
            APIquestion.createAnswer(this.answer)
            .then(() => {
            })
          } else {
            this.$emit('toCreate', this.answer)
          }
          this.showButton = false
        }
      } else {
        APIquestion.updateAnswer(this.answer)
        .then(() => {
          this.$emit('close')
        })
      }
    },
    getHeaders () {
      return fetch.headers()
    },
    showSuccess () {
      console.log('File was created successfully')
    }
  },
  computed: {
    ...mapGetters([
      'questions'
    ])
  },
  components: {
    Dropzone,
    Icon,
    QuestionList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.question {
  &_form {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 399px;
    margin: 0 auto;
    justify-content: flex-start;
    border: 1px solid rgba(0,0,0,0.2);
    &_top {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    & textarea {
      width: 100%;
      border: 1px solid rgba(0,0,0,0.1);
      max-width: 470px;
      min-height: 100px;
    }
  }
  &_section {
    margin-top: 20px;
  }
}

.glovoInput {
  margin-left: 5px!important;
  margin-right: 5px!important;
  &.image {
    align-self: center;
  }
}

.circ_progress {
  max-height: 26px;
  max-width: 26px;
  position: absolute;
  right: 10px;
  top: 4px;
}

.login_title {
  font-size: 25px
}

.formButton {
  margin-top: 20px;
  border-radius: 6px;
  position:relative;
  margin-bottom: 10px;
}

.row {
  width: 100%
}

.cross {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.selectInput {
  position: relative;
}

.error {
  color: red;
}

.optionsWrapper {
  width: 100%;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 4px;
  & .glovoInput {
    cursor: pointer;
  }
}

.related_list {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  position: absolute;
  width: 100vw;
  max-width: 800px;
  height: 100%;
  background: rgba(0,0,0,0.4);
  &_wrapper {
    overflow-y: scroll;
    z-index: 20;
    width: 90%;
    height: 90%;
    background-color: white;
    position: relative;
  }
}

</style>

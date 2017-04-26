<template >
<div class="question_section">
  <!-- <dropzone
  id="myVueDropzone"
  url="http://localhost:8000/admin/uploadPhoto"
  :headers="getHeaders()"
  v-on:vdropzone-success="showSuccess"
  :maxFileSizeInMB="4"
  >
</dropzone> -->
  <div class="question_form">
    <div class="cross" @click="$emit('close')">
        <icon name="cross"></icon>
    </div>
    <div class="row">
      <div class="image_preview" v-if="showImage" :style="{backgroundImage: 'url(' + currentImage + ')'}">
      </div>
    </div>
    <div class="question_form_top">
      <input
        name="questionImage"
        class="glovoInput image"
        type="text"
        placeholder="CDN image"
        v-model="currentImage" />
      <input
        name="questionTitle"
        class="glovoInput"
        type="text"
        placeholder="name"
        v-model="question.name" />
      <input
        name="questionTitle"
        class="glovoInput"
        type="text"
        placeholder="department"
        v-model="question.department" />
    </div>
    <textarea
    placeholder="description"
    v-model="question.description"
    class="glovoInput"
    name="questionDescription"
    rows="8"
    cols="80"
    ></textarea>
      <div class="selectInput">
        <div v-show="question.level === 1" class="glovoInput" @click="showLevel = true">
          Easy
        </div>
        <div v-show="question.level === 2" class="glovoInput" @click="showLevel = true">
          Medium
        </div>
        <div v-show="question.level === 3" class="glovoInput" @click="showLevel = true">
          Hard
        </div>
        <div class="optionsWrapper" v-show="showLevel">
          <div class="glovoInput" @click="question.level = 1; showLevel = false">Easy</div>
          <div class="glovoInput" @click="question.level = 2; showLevel = false">Medium</div>
          <div class="glovoInput" @click="question.level = 3; showLevel = false">Hard</div>
        </div>
      </div>
      <div class="selectInput">
        <div v-show="question.range === 0" class="glovoInput" @click="showRange = true">
          First question
        </div>
        <div v-show="question.range === 1" class="glovoInput" @click="showRange = true">
          Beggining
        </div>
        <div v-show="question.range === 2" class="glovoInput" @click="showRange = true">
          Half
        </div>
        <div v-show="question.range === 3" class="glovoInput" @click="showRange = true">
          Ending
        </div>
        <div v-show="question.range === 4" class="glovoInput" @click="showRange = true">
          New Stage
        </div>
        <div v-show="question.range === 5" class="glovoInput" @click="showRange = true">
          Grave
        </div>
        <div v-show="question.range === 6" class="glovoInput" @click="showRange = true">
          Related
        </div>
        <div class="optionsWrapper" v-show="showRange">
          <div class="glovoInput" @click="question.range = 0; showRange = false">First question</div>
          <div class="glovoInput" @click="question.range = 1; showRange = false">Beggining</div>
          <div class="glovoInput" @click="question.range = 2; showRange = false">Half</div>
          <div class="glovoInput" @click="question.range = 3; showRange = false">Ending</div>
          <div class="glovoInput" @click="question.range = 4; showRange = false">New Stage</div>
          <div class="glovoInput" @click="question.range = 5; showRange = false">Grave</div>
          <div class="glovoInput" @click="question.range = 6; showRange = false">Related</div>
        </div>
      </div>
      <div class="newAnswers" v-if="question.answers.length === 0">
        <answer-form @toCreate="toCreate" :questionId="question.id"></answer-form>
        <answer-form @toCreate="toCreate" :questionId="question.id"></answer-form>
      </div>
      <div class="updateAnswers" v-if="question.answers.length > 0">
        <answer-form @toCreate="toCreate" :currentAnswer="question.answers[0]" :questionId="question.id"></answer-form>
        <answer-form @toCreate="toCreate" :currentAnswer="question.answers[1]" v-if="question.answers.length > 1" :questionId="question.id"></answer-form>
        <answer-form @toCreate="toCreate" v-show="question.answers.length === 1" :questionId="question.id"></answer-form>
      </div>
      <div class="row error">
        {{errorText}}
      </div>
    <div class="row">
      <div
        class="formButton loginButton btn"
        @click="createOrUpdateQuestion"
        >
        {{submit}}
        <v-progress-circular small yellow :class="{'active': callInProgress}" class="circ_progress" />
      </div>
    </div>
  </div>
</div>

</template>

<script>
import Dropzone from 'vue2-dropzone'
import _ from 'lodash'
import { mapActions } from 'vuex'
import { question as APIquestion } from 'api'
import fetch from 'api/fetch'
import Question from 'models/Question'
import Icon from 'common/icon/Icon'
import AnswerForm from './AnswerForm'

export default {
  name: 'question-form',
  props: ['currentQuestion'],
  data () {
    return {
      errorText: '',
      currentImage: '',
      showImage: false,
      showSection: false,
      showRange: false,
      showLevel: false,
      question: new Question(),
      answer: [],
      submit: this.currentQuestion ? 'Update' : 'Create',
      callInProgress: false
    }
  },
  mounted () {
    _.debounce(function (ctx) {
      ctx.showImage = true
    }, 600)(this)
    if (this.currentQuestion && this.currentQuestion.id) {
      this.question.parse(this.currentQuestion)
      this.currentImage = this.question.image
    }
  },
  watch: {
    currentImage () {
      _.debounce(function (ctx) {
        if (ctx.question.image !== ctx.currentImage) {
          ctx.showImage = false
          ctx.question.image = ctx.currentImage
          setTimeout(() => {
            ctx.showImage = true
          }, 1000)
        }
      }, 600)(this)
    }
  },
  methods: {
    ...mapActions([
      'retrieveQuestions'
    ]),
    toCreate (answer) {
      this.answer.push(answer)
    },
    createOrUpdateQuestion () {
      if (this.submit === 'Create') {
        APIquestion.create({question: this.question, answer: this.answer})
        .then(() => {
          this.retrieveQuestions()
          this.$emit('close')
        })
        .catch((err) => {
          console.log(err)
          this.errorText = 'The operation ' + this.submit + ' obtain a bad request. please fill all the request data. or call Mr Developer'
        })
      } else {
        APIquestion.update(this.question)
        .then(() => {
          this.retrieveQuestions()
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
  components: {
    Dropzone,
    Icon,
    AnswerForm
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
    max-width: 800px;
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
    max-width: 50%;
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

</style>

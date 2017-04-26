<template >
<div class="list_section">
  <div class="SearchQuestion">
    <label for="searchInput">Search:</label>
    <input class="glovoInput" type="text" name="searchInput" value="" v-model="searchQuery">
  </div>
  <div
  @click="selectQuestion(question.id)"
  v-for="question in filteredQuestions"
  class="list_question"
  v-show="parseInt(filter) === question.range || !filter"
  >
    <div
      class="question_info"
      :class="{'question_info_related': selectable}"
      v-show="idActive !== question.id"
      @click="makeARelation(question.id)"
     >
      <div class="question_top_right">
        <div class="title">
          id:
        </div>
        <div class="value">
          {{question.id}}
        </div>
      </div>
      <div class="question_top">
        <div class="question_top_section">
          <div class="image_preview" :style="{backgroundImage: 'url(' + question.image + ')'}">
          </div>
        </div>
        <div class="question_top_section">
          <div class="title">
            name:
          </div>
          <div class="value">
            {{question.name}}
          </div>
        </div>
        <div class="question_top_section">
          <div class="title">
            department:
          </div>
          <div class="value">
            {{question.department}}
          </div>
        </div>
      </div>
      <div class="question_description">
        <div class="question_top_section">
          <div class="title">
            Description:
          </div>
          <div class="value">
            {{question.description}}
          </div>
        </div>
      </div>
      <div class="question_flag">
        <div class="question_flag_range" :class="{'blue': question.range === 1, 'orange': question.range === 2, 'red': question.range === 3, 'yellow': question.range === 4,'black': question.range === 5, 'grey': question.range === 6}">
          <span v-show="question.range === 1">Beggining</span>
          <span v-show="question.range === 2">Half</span>
          <span v-show="question.range === 3">Ending</span>
          <span v-show="question.range === 4">New Stage</span>
          <span v-show="question.range === 5">Grave</span>
          <span v-show="question.range === 6">Related</span>
        </div>
        <div class="question_flag_level" :class="{'green': question.level === 1, 'yellow': question.level === 2, 'red': question.level === 3}">
          <span v-show="question.level === 1">Easy</span>
          <span v-show="question.level === 2">Medium</span>
          <span v-show="question.level === 3">Hard</span>
        </div>
      </div>
      <div class="question_actions" v-if="showActions">
        <div class="formButton loginButton btn question_list_button delete" @click="deleteQuestion(question)">
            Delete
        </div>
        <div
          class="formButton loginButton btn question_list_button"
          @click="$router.push({name: 'updateQuestion', params: {question: question}})"
          >
          Update
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import Question from 'models/Question'
import Icon from 'common/icon/Icon'
import { question as APIquestion } from 'api'
import { mapActions } from 'vuex'
export default {
  name: 'question-list',
  props: ['filter', 'questions', 'selectable'],
  data () {
    return {
      idActive: 0,
      relationQuestion: new Question(),
      searchQuery: '',
      showActions: !this.selectable
    }
  },
  mounted () {
    this.retrieveQuestions()
  },
  methods: {
    ...mapActions([
      'retrieveQuestions'
    ]),
    selectQuestion (id) {
      if (this.selectable) {
        this.$emit('questionSelected', id)
      }
    },
    makeARelation (id) {
      let ctx = this
      if (this.relationQuestion.id) {
        this.relationQuestion.question_id = id
        APIquestion.update(this.relationQuestion)
        .then(() => {
          ctx.relationQuestion = new Question()
          ctx.retrieveQuestions()
        })
      }
    },
    deleteQuestion (question) {
      APIquestion.delete(question)
      .then(() => {
        this.retrieveQuestions()
      })
    },
    asignRelatedQuestion (question) {
      this.relationQuestion.parse(question)
    }
  },
  computed: {
    filteredQuestions () {
      const self = this
      var myRe = new RegExp('^' + self.searchQuery + '', 'g')
      if (self.questions && self.searchQuery && self.searchQuery !== '') {
        let _filteredQuestions = []
        const keys = Object.keys(self.questions[0])
        self.questions.map((question) => {
          let matched = false
          keys.map((key) => {
            if (typeof question[key] === 'string' ? myRe.exec(question[key].toLowerCase()) : myRe.exec(question[key]) && !matched) {
              _filteredQuestions.push(question)
              matched = true
            }
          })
        })
        return _filteredQuestions
      } else {
        return self.questions
      }
    }
  },
  components: {
    Icon
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  .list_section {
    background-color: white;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
  }
  .list_question {
    width: 100%;
    max-width: 400px;
    display: flex;
    margin: 0 2px;
    justify-content: center;
  }
  .question {
    &_info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px;
      position: relative;
      width: 100%;
      margin: 20px 0;
      max-width: 400px;
      border: 1px solid rgba(0,0,0,0.1);
      &_related {
        transition: all ease 0.5s;
        cursor: pointer;
        &:hover {
          background-color: #F3F3F3;
          transform: scale(1.05);
        }
      }
    }
    &_top {
      &_right {
        align-items: center;
        display: flex;
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 20px;
      }
      &_section {
        align-items: center;
        display: flex;
        & .title {
          font-family: Gotham-Medium;
          font-family: 17px;
        }
      }
    }
    &_flag {
      width: 100%;
      display: flex;
      &_range {
        color: white;
        padding: 3px 20px;
        margin-right: 10px;
        border-radius: 4px;
        &.blue {
          background-color: blue
        }
        &.orange {
          background-color: orange
        }
        &.black {
          background-color: black
        }
      }
      &_level {
        color: white;
        padding: 3px 20px;
        border-radius: 4px;
        &.green {
          background-color: green
        }
        &.yellow {
          background-color: #dac82a!important
        }
        &.red {
          background-color: red
        }
      }
    }
    &_actions {
      display: flex;
      width: 100%;
      justify-content: flex-end;
    }
  }
  .value {
    font-size: 17px;
    &.image {
      max-width: 50%;
      overflow-x: scroll;
    }
  }
  .title {
    font-size: 20px;
    margin-right: 15px;
  }

  .SearchQuestion {
    width: 100%;
    & label {
      font-size: 20px;
      font-family: Gotham-Medium;
    }
  }
  .question_list_button {
    margin: 5px 5px;
    &.delete {
      background-color: #ff5d5d;
      &:hover {
        background-color: #d44545;
      }
    }
  }
</style>

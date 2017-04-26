<template >
<div class="manage" v-if="showSection">
  <div class="manage_header">
    <div class="manage_settings">
      <div
        v-for="number, field in questionSettings"
        :class="{'blue': field === '1', 'orange': field === '2', 'black': field === '3'}"
        class="formButton loginButton btn manage_settings_fields"
        @click="filter = field"
        v-show="showCreate === false"
        >
        <span v-show="field === '0'">First Question | {{number}}</span>
        <span v-show="field === '1'">Beggining | {{number}}</span>
        <span v-show="field === '2'">Half | {{number}}</span>
        <span v-show="field === '3'">Ending | {{number}}</span>
        <span v-show="field === '4'">New Stage | {{number}}</span>
        <span v-show="field === '5'">Grave | {{number}}</span>
        <span v-show="field === '6'">related | {{number}}</span>
      </div>
      <div
        style="background-color: grey"
        class="formButton loginButton btn manage_settings_fields"
        @click="filter = field"
        v-show="showCreate === false"
        >
        All | {{totalOfQuestions}}
      </div>
    </div>
    <div class="manage_game_settings">
      <div class="manage_game_settings_input">
        <label for="time">Time</label>
        <input type="number" class="glovoInput" name="time" v-model="settings.time">
      </div>
      <div class="manage_game_settings_input">
        <label for="money">Money</label>
        <input type="number" class="glovoInput" name="money" v-model="settings.money">
      </div>
      <div
        class="formButton loginButton btn"
        @click="updateSettings()"
        >
        update
      </div>
    </div>
    <div class="create">
      <div class="row">
        <div
          class="formButton loginButton btn"
          @click="showCreate = true"
          v-show="showCreate === false"
          >
          Create
        </div>
      </div>
    </div>
  </div>
  <question-form @close="showCreate = false" v-if="showCreate === true"></question-form>
  <question-list :filter="filter" :questions="questions" :selectable="false"></question-list>
</div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { auth, settings } from 'api'
import QuestionForm from './QuestionForm'
import QuestionList from './QuestionList'

export default {
  name: 'manage',
  props: [],
  data () {
    return {
      filter: null,
      showSection: false,
      showCreate: false,
      settings: {}
    }
  },
  computed: {
    ...mapGetters([
      'questionSettings',
      'totalOfQuestions',
      'questions'
    ])
  },
  beforeCreate () {
    this.showSection = true
    auth.isAuth()
    .then((res) => {
      if (res.status !== 2) {
        this.$router.replace({name: 'login'})
      } else {
        this.showSection = true
      }
    }).catch((res) => {
      this.$router.replace({name: 'login'})
    })
  },
  mounted () {
    settings.get()
    .then((_settings) => {
      this.settings = _settings
    })
  },
  methods: {
    ...mapActions([
      'retrieveQuestions'
    ]),
    updateSettings () {
      settings.update(this.settings)
    }
  },
  components: {
    QuestionForm,
    QuestionList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
.manage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &_header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100vw;
    flex-wrap: wrap;
    margin: 2em 0 2em 0;
  }
  &_game_settings {
    display: flex;
    max-width: 800px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    border: 1px solid rgba(0,0,0,0.2);
    padding: 5px;
    border-radius: 4px;
    &_input {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
  }
  &_settings {
    &_fields {
      margin: 1em
    }
  }
}
.create {
  margin: 2em 4em;
}
.forms {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.newAnswers, .updateAnswers {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

</style>

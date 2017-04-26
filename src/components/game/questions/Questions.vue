<template >
<div class="welcome">
  <div class="game_header">
    <a class="game_header_icon_link" href="https://glovoapp.com">
      <div class="game_header_icon">
      </div>
    </a>
    <div class="question_settings">
      <div class="question_settings_happiness">
        <div class="question_happines" :class="{'happy': happiness >=4, 'sad': happiness < 2}" :style="{backgroundImage: 'url(/assets/icons/svg/happiness_' + happiness + '.svg)'}"></div>
      </div>
      <div class="question_settings_money">
        {{money}} MM €
      </div>
      <div class="question_settings_time_wrapper">
        <div class="question_settings_time">
          <div class="question_settings_time_pass" :style="{width: timeWidth + '%'}">
          </div>
        </div>
        Time left
      </div>
    </div>
    <div class="game_header_sound" @click="document.getElementById('audio').pause()">
    </div>
  </div>
  <div class="question_top_bar">

  </div>
  <div class="game_card_title_wrapper">
    <div class="game_card_title">
    </div>
  </div>
   <div class="game_card">
     <div class="game_card_top_bar">
     </div>
     <transition
       name="slide-fade"
      >
       <div v-if="!isTransitioned" class="game_card_question" :class="{'grave': currentQuestion.range === 5}">
         <div class="game_card_question_back" :class="{'grave': currentQuestion.range === 5}">

         </div>
         <div :style="{backgroundImage: 'url(' + currentQuestion.image + ')'}" class="game_card_question_picture">
         </div>
         <div v-if="currentQuestion.range !== 5" class="game_card_question_name">
           {{currentQuestion.name}}
         </div>
         <div class="game_card_question_department" :class="{'grave': currentQuestion.range === 5}">
           {{currentQuestion.department}}
         </div>
         <div class="game_card_question_description" :class="{'grave': currentQuestion.range === 5}">
           {{currentQuestion.description}}
         </div>
         <input class="glovoInput question_input" v-model="userName" v-show="currentQuestion.range === 5 && settings.time >= gameSettings.time && (!user.score || user.score < money)" placeholder="Your Name (max 8 digits)"/>
         <div class="game_card_question_answers">
           <div v-for="answer in currentQuestion.answers"
            class="game_card_question_answers_answer"
            @click="goToNext(answer)"
            >
             {{answer.label}}
             <transition
               name="little-fade"
              >
             <div v-if="isTransitioned" class="animate_settings" :class="{'negative': answerMoney < 0}">
               <template v-if="answer.money > 0">+</template>{{answerMoney}}
             </div>
           </transition>
           </div>
         </div>
       </div>
       </transition>
   </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Question from 'models/Question'
import Icon from 'common/icon/Icon'
import { settings as APIsettings } from 'api'
import _ from 'lodash'

export default {
  name: 'questions',
  props: [],
  data () {
    return {
      currentQuestion: new Question(),
      happiness: 3,
      money: 0,
      gameSettings: {},
      userName: localStorage.getItem('glovo_game_user') ? JSON.parse(localStorage.getItem('glovo_game_user')).name : '',
      isTransitioned: true,
      user: localStorage.getItem('glovo_game_user') ? JSON.parse(localStorage.getItem('glovo_game_user')) : {
        name: '',
        score: undefined,
        id: new Date().getTime()
      },
      answerMoney: 0,
      answerHappiness: 0
    }
  },
  watch: {
    userName () {
      let _tempName = this.userName
      if (_tempName.split('').length > 10) {
        this.user.name = _tempName.split('').splice(0, 11).join('')
      } else {
        this.user.name = _tempName
      }
      console.log(this.user.name)
    }
  },
  mounted () {
    const ctx = this
    this.isTransitioned = true
    APIsettings.get()
    .then((_settings) => {
      ctx.gameSettings = _settings
    })
    this.nextQuestion(this.settings)
    .then((response) => {
      ctx.currentQuestion.parse(response.question)
      ctx.isTransitioned = false
    })
    this.checkName
  },
  computed: {
    ...mapGetters([
      'settings'
    ]),
    timeWidth () {
      return (this.settings.time * (100 / this.gameSettings.time)) > 100 ? 100 : this.settings.time * (100 / this.gameSettings.time)
    }
  },
  methods: {
    ...mapActions([
      'nextQuestion',
      'updateSettings',
      'updateSettingsBySettings'
    ]),
    goToNext (answer) {
      if (this.currentQuestion.range === 5) {
        if ((!this.user.score || (this.user.score < this.money)) && this.userName !== '' && this.money > 0) {
          let _user = {
            name: this.user.name,
            score: this.money,
            id: this.user.id
          }
          localStorage.setItem('glovo_game_user', JSON.stringify(_user))
          this.$firebase.database().ref('players/' + _user.id).set(_user)
          this.$router.push({name: 'bestScored'})
        } else {
          this.$router.push({name: 'welcome'})
        }
      }
      this.answerMoney = answer.money
      this.answerHappiness = answer.happiness
      this.isTransitioned = true
      const ctx = this
      answer.current_stage = ctx.currentQuestion.range
      ctx.updateSettings(answer)
      .then(() => {
        let tempHappiness = Math.floor(ctx.settings.happiness / 10)
        if (tempHappiness > 5) {
          ctx.happiness = 5
        } else if (tempHappiness < 0) {
          ctx.happiness = 0
        } else {
          ctx.happiness = tempHappiness
        }
        ctx.money = ctx.settings.money
        ctx.nextQuestion(ctx.settings)
        .then((response) => {
          ctx.currentQuestion.parse(response.question)
          ctx.updateSettingsBySettings(response.settings)
          _.debounce((ctx) => {
            ctx.isTransitioned = false
          }, 600)(ctx)
        })
      })
    }
  },
  component: {
    Icon
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  .animate_settings {
    left: -35px;
    color: #3fa990;
    position: absolute;
    font-family: Gotham-Book;
    font-size: 20px;
    &.fade {
      -webkit-animation: vertical_shake 0.5s; /* Safari 4+ */
      -moz-animation: vertical_shake 0.5s; /* Fx 5+ */
      animation: vertical_shake 0.5s;
    }
    .negative {
      color: #f23838!important;
    }
  }
  .glovoInput {
    border-bottom: 1px solid rgba(255, 255, 255, 1);
    color: white;
  }
  .welcome {
    justify-content: flex-start;
  }
  .question {
    &_top_bar {
      z-index: 4;
      position: fixed;
      margin-bottom: 60px;
      width: 100vw;
      height: 60px;
      background-image: url('/assets/icons/svg/gradient.svg');
    }
    &_happines {
      @media(max-width: 600px) {
        margin: 5px !important;
      }
    }
    &_settings {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap;
      @media(max-width: 600px) {
        width: 100%;
      }
      &_money {
        position: relative;
        font-family: Gotham-Bold;
        font-size: 20px;
        font-weight: bold;
        font-stretch: condensed;
        color: #3fa990;
        @media(max-width: 600px) {
          font-size: 16px;
        }
      }
      &_time {
        margin-left: 2em;
        margin-right: 0.5em;
        width: 100px;
        position: relative;
        background: #eda438;
        height: 20px;
        @media(max-width: 600px) {
          margin-left: 1em;
        }
        &_wrapper {
          display: flex;
          align-items: center;
          font-family: Gotham-Bold;
          font-size: 20px;
          font-weight: bold;
          font-stretch: condensed;
          color: #3fa990;
          @media(max-width: 600px) {
            width: 200px;
            font-size: 14px;
          }
        }
        &_pass {
          position: absolute;
          top: 0;
          left: 0;
          height: 20px;
          background-color: #3fa990;
        }
      }
    }
    &_happines{
      background-size: contain;
      background-position: center center;
      background-repeat: no-repeat;
      width: 30px;
      height: 30px;
      margin: 0 3em;
      &.happy {
        -webkit-animation: vertical_shake 0.5s infinite; /* Safari 4+ */
        -moz-animation: vertical_shake 0.5s infinite; /* Fx 5+ */
        animation: vertical_shake 0.5s infinite;
      }
      &.sad {
        -webkit-animation: horizontal_shake 0.5s infinite; /* Safari 4+ */
        -moz-animation: horizontal_shake 0.5s infinite; /* Fx 5+ */
        animation: horizontal_shake 0.5s infinite;
      }
    }
    &_input {
      width: 250px;
    }
  }
  .game_header {
    @media(max-width: 600px) {
      display: center;
    }
    &_icon {
      background-image: url('/assets/icons/svg/glovo_green.svg');
      &_link {
        @media(max-width: 600px) {
          display: none;
        }
      }
    }
    &_sound {
      background-image: url('/assets/icons/svg/soun.svg');
    }
  }
  .game_card {
    overflow: hidden;
    margin-top: 120px;
    margin-bottom: 60px;
    background-color: white;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
    height: 80%;
    min-height: 700px;
    max-height: 800px;
    padding: 20px;
    @media(max-height: 600px) {
      padding: 5px;
    }
    &_title {
      width: 100%;
      max-width: 200px;
      height: 15%;
      min-height: 200px;
      max-height: 100px;
      margin: 0 auto;
      margin-bottom: 5em;
      background-image: url('/assets/icons/svg/crazy_title.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      &_wrapper {
        z-index: 3;
        position: absolute;
        display: flex;
        justify-content: center;
        width: 100%;
        top: 40px;
        height: 15%;
        min-height: 200px;
        max-height: 100px;
        margin: 0 auto;
        margin-bottom: 5em;
      }
    }
    &_top_bar {
      position: absolute;
      width: 100vw;
      top:0;
      background-image: url('/assets/icons/svg/question_top_bar.svg');
      height: 64px;
      background-size: cover;
      background-repeat: no-repeat;
    }
    &_question {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 30px;
      justify-content: flex-start;
      align-items: flex-end;
      background: -moz-linear-gradient(top, #f2cc38  0%, #f2a538 100%);
      background: -webkit-linear-gradient(top, #f2cc38  0%,#f2a538 100%);
      background: linear-gradient(to bottom, #f2cc38  0%, #f2a538 100%);
      width: 80%;
      min-height: 300px;
      margin-top: 160px;
      @media(max-width: 600px) {
        width: 100%;
        padding: 30px 0 30px 0;
      }
      &.grave {
        background: -moz-linear-gradient(top, #3d5e90  0%, #0d2851 100%)!important;
        background: -webkit-linear-gradient(top, #3d5e90  0%,#0d2851 100%)!important;
        background: linear-gradient(to bottom, #3d5e90  0%, #0d2851 100%)!important;
      }
      &_name {
        text-align: left;
        font-family: Gotham-Medium;
        font-size: 18px;
        font-weight: bold;
        color: #323232;
        margin: -1em 1em 0.2em 1em;
        width: 50%;
        @media(max-width: 600px) {
          width: 40%;
        }
        &.grave{
          color: white;
        }
      }
      &_department {
        text-align: left;
        font-family: Gotham-Book;
        font-size: 20px;
        color: #313131;
        margin: 0 1em;
        width: 50%;
        @media(max-width: 600px) {
          width: 40%;
        }
        &.grave{
          color: white;
        }
      }
      &_description {
        margin-top: 20px;
        padding: 10px;
        width: 100%;
        font-family: Gotham-Medium;
        font-size: 16px;
        font-weight: 300;
        line-height: 1.25;
        text-align: center;
        color: #313131;
        &.grave{
          color: white;
        }
      }
      &_answers {
        margin-top: 1em;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex-wrap: wrap;
        &_answer {
          transition: all ease 0.5s;
          cursor: pointer;
          margin: 5px auto;
          padding: 8px;
          background-color: white;
          width: 95%;
          font-family: Gotham-Medium;
          font-size: 16px;
          font-weight: 500;
          text-align: center;
          color: #313131;
          flex: 1;
          transform: scale(1);
          @media(max-width: 600px) {
            width: 90%;
          }
          &:hover {
            transform: scale(1.05);
          }
        }
      }
      &_picture {
        z-index: 2;
        top: -50px;
        left: 30px;
        position: absolute;
        background-size: cover;
        width: 115px;
        height: 133px;
      }
      &_back {
        z-index: 1;
        top: -60px;
        left: 20px;
        position: absolute;
        background: #f2cc38;
        width: 135px;
        height: 60px;
        &.grave {
          background-color: #3d5e90;
        }
      }
    }
  }
  .slide-fade-enter-active {
  transition: all .5s ease;
  }
  .slide-fade-leave-active {
    transition: all .5s ease;
  }
  .slide-fade-enter
  /* .slide-fade-leave-active for <2.1.8 */ {
    transform: translateX(-100vw);
    opacity: 1;
  }
  .slide-fade-leave-to{
    transform: translateX(100vw);
    opacity: 1;
  }

  .little-fade-enter-active {
  transition: all .5s ease;
  }
  .little-fade-leave-active {
    transition: all .5s ease;
  }
  .little-fade-enter
  /* .slide-fade-leave-active for <2.1.8 */ {
    opacity: 0;
  }
  .little-fade-leave-to{
    transform: translateY(-50%);
    opacity: 0;
  }

@-webkit-keyframes vertical_shake {
  0%   { transform: translateY(3px);}
  50% { transform: translateY(-3px);}
  100% { transform: translateY(3px);}
}
@-moz-keyframes vertical_shake {
  0%   { transform: translateY(3px);}
  50% { transform: translateY(-3px);}
  100% { transform: translateY(3px);}
}
@keyframes vertical_shake {
  0%   { transform: translateY(3px);}
  50% { transform: translateY(-3px);}
  100% { transform: translateY(3px);}
}
@-webkit-keyframes horizontal_shake {
  0%   { transform: translateX(3px);}
  50% { transform: translateX(-3px);}
  100% { transform: translateX(3px);}
}
@-moz-keyframes horizontal_shake {
  0%   { transform: translateX(3px);}
  50% { transform: translateX(-3px);}
  100% { transform: translateX(3px);}
}
@keyframes horizontal_shake {
  0%   { transform: translateX(3px);}
  50% { transform: translateX(-3px);}
  100% { transform: translateX(3px);}
}
</style>

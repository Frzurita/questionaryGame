import Game from './Game'
import welcome from './welcome/welcome.routes.js'
import questions from './questions/questions.routes.js'
import bestScored from './bestScored/bestScored.routes.js'

export default {
  name: 'game',
  path: '',
  component: Game,
  children: [
    welcome,
    questions,
    bestScored
  ]
}

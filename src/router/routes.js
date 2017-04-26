import admin from '../components/admin/admin.routes'
import game from '../components/game/game.routes'
import App from '../App'

export default [
  { path: '',
    component: App,
    children: [
      admin,
      game
    ]
  },
  {path: '*', redirect: '/'}
]

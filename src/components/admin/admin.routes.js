import Admin from './Admin'
import login from './login/login.routes'
import manage from './manage/manage.routes'
import updateQuestion from './manage/updateQuestion/updateQuestion.routes'

export default {
  path: '/admin',
  component: Admin,
  children: [
    manage,
    login,
    updateQuestion
  ]
}

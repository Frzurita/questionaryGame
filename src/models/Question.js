export default class Question {

  constructor () {
    this.id = null
    this.name = null
    this.department = null
    this.description = null
    this.range = 1
    this.level = 1
    this.image = null
    this.answers = []
  }

  parse (question) {
    this.id = question.id
    this.name = question.name
    this.department = question.department
    this.description = question.description
    this.image = question.image
    this.level = question.level || 'easy'
    this.range = question.range
    this.answers = question.answers || []
    return
  }
}

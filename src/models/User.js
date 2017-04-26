export default class User {

  constructor () {
    this.accumulatedDebt = 0
    this.name = ''
    this.email = ''
    this.id = 0
    this.companyDetail = {
      addressLine1: '',
      addressLine2: '',
      city: '',
      countryCode: '',
      name: '',
      postalCode: '',
      province: '',
      taxId: ''
    }
    this.currentCard = {
      expirationMonth: '0',
      expirationYear: '0',
      lastFourDigits: '0',
      provider: '',
      urn: ''
    }
    this.defaulter = false
    this.deliveredOrdersCount = 0
    this.description = ''
    this.deviceUrn = ''
    this.facebookId = ''
    this.freeOrders = 0
    this.mediaCampaign = ''
    this.mediaSource = ''
    this.os = ''
    this.payementMethod = ''
    this.paymentWay = ''
    this.phoneNumber = {
      countryCode: '',
      number: ''
    }
    this.picture = ''
    this.preferredCityCode = ''
    this.preferredLanguage = ''
    this.type = ''
    this.urn = ''
    this.virtualBalance = {
      balance: 0
    }
  }

  getName () {
    return this.name
  }

  getEmail () {
    return this.email
  }

  check () {
    let result = true
    let error = ''

    if (!this.currentCard || !this.currentCard.urn) {
      result = false
      error = 'No credit card'
    }

    if (this.defaulter) {
      result = false
      error = 'User is defaulter'
    }

    if (!this.phoneNumber || !this.phoneNumber.number) {
      result = false
      error = 'No phone number'
    }

    return {result, error}
  }
}

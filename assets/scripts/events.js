'use strict'

const getFormFields = require(`../../lib/get-form-fields`)
const api = require(`./api`)
const ui = require('./ui')

const onCellSelect = function (event) {
  const cellData = this.dataset
  const cellIndex = cellData.cellIndex
  ui.gameAction(cellIndex)
}

const onNewGame = function (event) {
  ui.newGame()
}

const signInModal = function (event) {
  $('#myModal').css('display', 'block')
}

const signUpModal = function (event) {
  $('#myModal2').css('display', 'block')
}

const closeSignIn = function (event) {
  $('#myModal').css('display', 'none')
}

const closeSignUp = function (event) {
  $('#myModal2').css('display', 'none')
}

const blurAllModals = function (event) {
  if (event.target.id === 'myModal' || event.target.id === 'myModal2') {
    $('#myModal').css('display', 'none')
    $('#myModal2').css('display', 'none')
  }
}

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const addHandlers = function () {
  $('.game-board').on('click', onCellSelect)
  $('#new-game').on('click', onNewGame)
  $('#sign-in').on('click', signInModal)
  $('#sign-up').on('click', signUpModal)
  $('.close-sign-in').on('click', closeSignIn)
  $('.close-sign-up').on('click', closeSignUp)
  $(window).on('click', blurAllModals)
  $('#sign-up-form').on('submit', onSignUp)
  $('#sign-in-form').on('submit', onSignIn)
}

module.exports = {
  addHandlers
}

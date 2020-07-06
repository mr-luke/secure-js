import './business-logic'

const nameElement = document.querySelector('#username')
const avatarElement = document.querySelector('#avatar')
const formElement = document.querySelector('#form')

avatarElement.src = '/assets/default-avatar.png'

formElement.addEventListener('submit', (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const temporaryElement = document.createElement('div')
  temporaryElement.innerText = formData.get('fullname')

  nameElement.innerHTML = temporaryElement.innerHTML
  avatarElement.src = formData.get('avatar-url')

  console.info('User data updated successfully: ', {
    name: formData.get('fullname'),
    avatar: formData.get('avatar-url')
  })
})

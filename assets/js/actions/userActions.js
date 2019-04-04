export const updateName = (name, color) => {
  return {
    type: 'set_name',
    name,
    color
  }
}

export const updateUrlPreviews = (urlPreviews) => {
  return {
    type: 'set_url_previews',
    urlPreviews
  }
}

export const signIn = (email, password) => {
  return (dispatch, _) => {
    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then((response) => {
      return response.json();
    }).then((response) => {
      if (response.error) {
        dispatch({
          type: 'auth_errors',
          errors: { email: ['or password incorrect.']}
        })
      } else {
        dispatch({
          type: 'sign_in',
          token: response.jwt,
          id: response.id,
          name: response.name,
          color: response.color
        })
      }
    })
  }
}

export const expireToken = () => {
  return {
    type: 'expire_token'
  }
}

export const signUp = (email, password) => {
  return (dispatch, getState) => {
    const state = getState()
    fetch('/auth/sign_up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        publicKey: state.cryptoReducer.publicKey,
        color: state.userReducer.color
      })
    }).then((response) => {
      return response.json();
    }).then((response) => {
      if (response.errors) {
        dispatch({
          type: 'auth_errors',
          errors: response.errors
        })
      } else {
        dispatch({
          type: 'sign_in',
          token: response.jwt,
          id: response.id,
          name: email
        })
      }
    })
  }
}
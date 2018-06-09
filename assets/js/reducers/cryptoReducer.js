const INITIAL_STATE = {
  publicKey: null,
  privateKey: null,
  passphrase: null,
  groups: { }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'new_key':
      return {
        ...state,
        passphrase: action.passphrase,
        privateKey: action.privateKey,
        publicKey: action.publicKey
      }
    case 'new_group_key':
      return {
        ...state,
        groups: {
          ...state.groups,
          [action.room]: {
            privateKey: action.privateKey,
            publicKey: action.publicKey
          }
        }
      }
    case 'burn_browser':
      return INITIAL_STATE;
    default:
      return state;
  }
}
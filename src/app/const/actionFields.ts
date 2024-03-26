export const ActionResponseData = {
  createAccount: [
    {
      name: 'profile.email',
      defaultValue: '',
      type: 'string'
    },
    {
      name: 'profile.birthYear',
      defaultValue: '',
      type: 'number'
    },
    {
      name: 'profile.birthDay',
      defaultValue: '',
      type: 'number'
    },
    {
      name: 'profile.birthMonth',
      defaultValue: '',
      type: 'number'
    },
    {
      name: 'profile.firstName',
      defaultValue: '',
      type: 'string'
    },
    {
      name: 'profile.lastName',
      defaultValue: '',
      type: 'string'
    },

  ],
  sendEmail: null // Doesn't have response
}


export const ActionRequestData = {
  createAccount: [
    {
      name: 'email',
      defaultValue: '',
      type: 'string'
    },
    {
      name: 'password',
      defaultValue: '',
      type: 'string'
    },
    {
      name: 'profile.birthYear',
      defaultValue: '',
      type: 'number'
    },
    {
      name: 'profile.birthDay',
      defaultValue: '',
      type: 'number'
    },
    {
      name: 'profile.birthMonth',
      defaultValue: '',
      type: 'number'
    },
    {
      name: 'profile.firstName',
      defaultValue: '',
      type: 'string'
    },
    {
      name: 'profile.lastName',
      defaultValue: '',
      type: 'string'
    }
  ],
  sendEmail: [
    {
      name: 'email',
      defaultValue: '',
      type: 'string'
    },
    {
      name: 'profile.birthYear',
      defaultValue: '',
      type: 'number'
    },
    {
      name: 'profile.birthDay',
      defaultValue: '',
      type: 'number'
    },
    {
      name: 'profile.birthMonth',
      defaultValue: '',
      type: 'number'
    },
    {
      name: 'profile.firstName',
      defaultValue: '',
      type: 'string'
    },
    {
      name: 'profile.lastName',
      defaultValue: '',
      type: 'string'
    }
  ]
}

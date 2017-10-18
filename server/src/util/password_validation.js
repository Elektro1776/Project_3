const crypto = require('crypto');

export const passwordHelper =  {
  saltHashPassword,
  // createUser ({ username, password }) {
  //   console.log(`Add user ${username}, ${password}`)
  //   const { salt, hash } = saltHashPassword({password});
  //   console.log(' WHAT IS OUR SALT AND HASH', salt, hash);
  //   return knex('user').insert({
  //     salt,
  //     encrypted_password: hash,
  //     username
  //   })
  // },
  authenticate({ username, password}) {
    console.log(`AUTHENTICATING USER ${username}`);
    return knex('user').where({username})
      .then(([user]) => {
        console.log(' WHAT IS THE USER', user);
        if (!user) return { success: false}
        const { hash } = saltHashPassword({
          password,
          salt: user.salt
        });
        return { success: hash === user.encrypted_password}
      })
  }
}
function saltHashPassword({ password, salt = randomString() }) {
  console.log(' WHAT IS THE SALT', typeof password, password);
  const hash = crypto
    .createHmac('sha512', salt)
    .update(password)
  return {
    salt,
    hash: hash.digest('hex')
  }
}

function randomString () {
  return crypto.randomBytes(4).toString('hex')
}

const main = async() => {
  try {
    const userId = getUserId()
    const userInfo = await fetchUserInfo(userId)
    const view = createView(userInfo)
    displayView(view)
  } catch (error) {
    console.log(`エラーが発生しました（${error}）`)
  }
}

const getUserId = () => {
  const value = document.getElementById('userId').value
  return encodeURIComponent(value)
}

const fetchUserInfo = userId => {
  const endPoint = `https://api.github.com/users/${encodeURIComponent(userId)}`
  return fetch(endPoint)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(new Error(`${res.status}:${res.statusText}`))
      } else {
        return res.json()
      }
    })
}

const createView = user => {
  return escapeHTML`
  <h4>${user.name} (@${user.login})</h4>
  <img src="${user.avatar_url}" alt="${user.login}" height="100">
  <dl>
    <dt>Location</dt>
    <dd>${user.location}</dd>
    <dt>Repositories</dt>
    <dd>${user.public_repos}</dd>
  </dl>
  `;
}

const displayView = view => {
  const result = document.getElementById('result')
  result.innerHTML = view
}

const escapeSpecialChars = str => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039")
}

const escapeHTML = (strings, ...values) => {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1]
    if (typeof value === 'string') {
      return result + escapeSpecialChars(value) + str
    } else {
      return result + String(value) + str
    }
  })
}

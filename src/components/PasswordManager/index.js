import {Component} from 'react'

import './index.css'

import {v4} from 'uuid'

const backgroundColorsList = ['red', 'green', 'yellow', 'brown', 'blue']

class PasswordManager extends Component {
  state = {
    website: '',
    userName: '',
    password: '',
    passwordsList: [],
    searchInput: '',
    isShow: false,
    noPasswords: false,
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {website, userName, password} = this.state
    const initialLetter = userName.slice(0, 1).toUpperCase()
    const bgClassName = backgroundColorsList[Math.floor(Math.random() * 5)]
    const newPasswordList = {
      id: v4(),
      website,
      userName,
      password,
      initialLetter,
      bgClassName,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPasswordList],
      website: '',
      userName: '',
      password: '',
      noPasswords: true,
      searchInput: '',
    }))
  }

  onEnterWebsite = event => {
    this.setState({website: event.target.value})
  }

  onEnterUsername = event => {
    this.setState({userName: event.target.value})
  }

  onEnterPassword = event => {
    this.setState({password: event.target.value})
  }

  onClickSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onDelete = id => {
    const {passwordsList} = this.state
    const newPasswordsList = passwordsList.filter(eachId => eachId.id !== id)
    const caseOf = newPasswordsList.length !== 0
    this.setState({passwordsList: newPasswordsList, noPasswords: caseOf})
  }

  render() {
    const {
      website,
      userName,
      password,
      passwordsList,
      searchInput,
      isShow,
    } = this.state
    let {noPasswords} = this.state
    const newPasswordsList = passwordsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newPasswordsList.length === 0) {
      noPasswords = false
    } else {
      noPasswords = true
    }
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo"
        />
        <div className="password-input-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-image-sm"
          />
          <div className="password-text-input-card">
            <h1 className="heading">Add New Password</h1>
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <div className="web-logo">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="website-logo"
                />

                <input
                  type="text"
                  placeholder="Enter Website"
                  className="web-text"
                  value={website}
                  onChange={this.onEnterWebsite}
                />
              </div>

              <div className="web-logo">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="website-logo"
                />

                <input
                  type="text"
                  placeholder="Enter Username"
                  className="web-text"
                  value={userName}
                  onChange={this.onEnterUsername}
                />
              </div>

              <div className="web-logo">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="website-logo"
                />

                <input
                  type="password"
                  placeholder="Enter Password"
                  className="web-text"
                  value={password}
                  onChange={this.onEnterPassword}
                />
              </div>
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-image-lg"
          />
        </div>
        <div className="password-info-container">
          <div className="password-search-container">
            <div className="your-password">
              <h1 className="passwd-heading">Your Passwords </h1>
              <p className="count"> {newPasswordsList.length}</p>
            </div>
            <div className="search-logo">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />

              <input
                type="search"
                placeholder="Search"
                className="web-text"
                value={searchInput}
                onChange={this.onClickSearchInput}
              />
            </div>
          </div>
          <hr className="seperator" />
          <div className="show-password">
            <input
              type="checkbox"
              className="check"
              id="check-text"
              onChange={this.showPassword}
            />
            <label htmlFor="check-text" className="text">
              Show Passwords
            </label>
          </div>
          {!noPasswords && (
            <div className="empty-password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-pwd-image"
              />
              <p className="no-password">No Passwords</p>
            </div>
          )}
          {noPasswords && (
            <ul className="passwords-list-container">
              {newPasswordsList.map(eachPassword => (
                <li
                  className="password-card"
                  key={eachPassword.id}
                  id={eachPassword.id}
                >
                  <div className="card-container">
                    <p className={`initial ${eachPassword.bgClassName}`}>
                      {' '}
                      {eachPassword.initialLetter}
                    </p>
                    <div className="details-list">
                      <p className="web-site">{eachPassword.website}</p>
                      <p className="name">{eachPassword.userName}</p>
                      {!isShow && (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          className="stars-image"
                          alt="stars"
                        />
                      )}

                      {isShow && (
                        <p className="password">{eachPassword.password}</p>
                      )}
                    </div>
                    <button
                      className="delete-btn"
                      type="button"
                      onClick={() => this.onDelete(eachPassword.id)}
                      data-testid="delete"
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                        className="delete-icon"
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager

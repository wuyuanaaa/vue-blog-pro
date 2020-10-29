const getters = {
  /* app */
  cacheList: state => state.app.cacheList,
  isNavShow: state => state.app.isNavShow,
  isLogiDialogShow: state => state.app.isLogiDialogShow,
  isSmallScreen: state => state.app.isSmallScreen,
  /* user */
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  isLogin: state => state.user.isLogin
}

export default getters

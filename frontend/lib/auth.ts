export const getToken = () =>
  typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null

export const setToken = (token: string) => {
  localStorage.setItem("token", token)
  document.cookie = `token=${token}; path=/`
}

export const logout = () => {
  localStorage.removeItem("token")
  document.cookie = "token=; Max-Age=0; path=/"
  window.location.href = "/login"
}
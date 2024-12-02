'use client'

let token: string | null = null

export const setToken = (newToken: string) => {
  token = newToken
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', newToken)
  }
}

export const getToken = (): string | null => {
  if (token) return token
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token')
  }
  return null
}

export const removeToken = () => {
  token = null
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token')
  }
}

export const isAuthenticated = (): boolean => {
  return !!getToken()
}


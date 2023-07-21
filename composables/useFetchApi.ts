export default (url: string, options: any = {}): any => {
  const { useAuthToken } = useAuth()

  return $fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${useAuthToken().value}`,
    },
  })
}

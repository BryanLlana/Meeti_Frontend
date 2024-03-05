export const formatDate = date => {
  const getDate = new Date(date + 'T00:00:00Z')
  getDate.setDate(getDate.getDate() + 1)
  return getDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
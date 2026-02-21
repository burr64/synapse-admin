interface Notification {
  id: number
  type: 'info' | 'success' | 'warning' | 'error'
  title?: string
  message: string
}

export const useNotification = () => {
  const notifications = ref<Notification[]>([])

  const addNotification = ({
    type = 'info',
    title = '',
    message,
    duration = 5000,
  }: {
    type?: 'info' | 'success' | 'warning' | 'error'
    title?: string
    message: string
    duration?: number
  }) => {
    const id = Date.now() + Math.random()
    notifications.value.push({ id, type, title, message })

    if (duration > 0) {
      setTimeout(() => removeNotification(id), duration)
    }
  }

  const removeNotification = (id: number) => {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }

  const clearNotifications = () => {
    notifications.value = []
  }

  return { notifications, addNotification, removeNotification, clearNotifications }
}

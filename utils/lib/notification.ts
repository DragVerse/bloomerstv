// notification.js

const base64ToUint8Array = (base64) => {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(b64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export const getRegistration =
  async (): Promise<ServiceWorkerRegistration | null> => {
    let registration: ServiceWorkerRegistration | undefined

    const existingRegistration =
      await navigator.serviceWorker.getRegistration('/')

    if (existingRegistration) {
      registration = existingRegistration
    } else {
      registration = await navigator.serviceWorker.register(
        '/service-worker.js',
        {
          scope: '/'
        }
      )
    }

    if (Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        return registration
      }
    } else {
      return registration
    }
    return null
  }

export async function subscribeUserToPush(
  subscribe: (subscription: any) => Promise<void>
) {
  try {
    const registration = await getRegistration()
    if (registration) {
      const exisitingSubscription =
        await registration.pushManager.getSubscription()

      if (exisitingSubscription) {
        await subscribe(exisitingSubscription)
        return
      } else {
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: base64ToUint8Array(
            process.env.NEXT_PUBLIC_VAPID_KEY
          )
        })
        await subscribe(subscription)
      }
    }
    return null
  } catch (error) {
    console.log(error)
  }
}
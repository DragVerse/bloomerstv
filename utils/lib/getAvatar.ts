import { AVATAR } from '../config'
import { ZERO_ADDRESS } from '../contants'
import getStampFyiURL from './getStampFyiURL'
import imageKit from './imageKit'
import sanitizeDStorageUrl from './sanitizeDStorageUrl'

/**
 * Returns the avatar image URL for a given profile.
 *
 * @param profile The profile object.
 * @param namedTransform The named transform to use.
 * @returns The avatar image URL.
 */
const getAvatar = (profile: any, namedTransform = AVATAR): string => {
  const avatarUrl =
    // Lens NFT Avatar fallbacks
    profile?.metadata?.picture?.image?.optimized?.uri ??
    profile?.metadata?.picture?.image?.raw?.uri ??
    // Lens Profile Avatar fallbacks
    profile?.metadata?.picture?.optimized?.uri ??
    profile?.metadata?.picture?.raw?.uri ??
    getStampFyiURL(profile?.ownedBy?.address ?? ZERO_ADDRESS)

  return imageKit(sanitizeDStorageUrl(avatarUrl), namedTransform)
}

export default getAvatar

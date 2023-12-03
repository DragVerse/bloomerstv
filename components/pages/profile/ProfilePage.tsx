'use client'
import { ProfileId, useProfile } from '@lens-protocol/react-web'
import React from 'react'
import { toast } from 'react-toastify'
import LiveChat from '../dashboard/go-live/LiveChat'
import { useStreamerQuery } from '../../../graphql/generated'
import ProfileInfoWithStream from './ProfileInfoWithStream'
import StreamerOffline from './StreamerOffline'
import Video from '../../common/Video'
import { getLiveStreamUrl } from '../../../utils/lib/getLiveStreamUrl'
import useIsMobile from '../../../utils/hooks/useIsMobile'

const ProfilePage = ({ handle }: { handle: string }) => {
  const isMobile = useIsMobile()
  const {
    data,
    loading: profileLoading,
    error
  } = useProfile({
    forHandle: handle
  })

  const {
    data: streamer,
    refetch,
    loading: streamerLoading
  } = useStreamerQuery({
    variables: {
      profileId: data?.id as ProfileId
    },
    skip: !data?.id
  })

  console.log('profile', data)
  if (error) {
    toast.error(error.message)
  }

  if (profileLoading || streamerLoading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>Profile not found</div>
  }

  return (
    <div className="flex flex-row h-full">
      <div className="w-full flex-grow overflow-auto no-scrollbar h-full">
        {streamer?.streamer?.playbackId ? (
          <Video
            onStreamStatusChange={(isLive) => {
              if (isLive !== streamer?.streamer?.isActive) {
                refetch()
              }
            }}
            streamOfflineErrorComponent={
              // @ts-ignore
              <StreamerOffline profile={data} streamer={streamer?.streamer} />
            }
            src={getLiveStreamUrl(streamer?.streamer?.playbackId)}
          />
        ) : (
          <div className="h-[230px] sm:h-[700px]">
            {/* @ts-ignore */}
            <StreamerOffline profile={data} streamer={streamer?.streamer} />
          </div>
        )}

        {/* @ts-ignore */}
        <ProfileInfoWithStream profile={data} streamer={streamer?.streamer} />
      </div>
      {streamer?.streamer?.latestStreamPublicationId && !isMobile && (
        <div className="w-[400px] flex-none h-full">
          <LiveChat
            // @ts-ignore
            publicationId={streamer?.streamer?.latestStreamPublicationId}
          />
        </div>
      )}
    </div>
  )
}

export default ProfilePage

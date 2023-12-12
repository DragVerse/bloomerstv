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
import StartLoadingPage from '../loading/StartLoadingPage'
import CommentSection from '../watch/CommentSection'
import AboutProfile from './AboutProfile'

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

  if (error) {
    toast.error(error.message)
  }

  const videoComponent = React.useMemo(() => {
    if (!streamer?.streamer?.playbackId) {
      return null
    }

    return (
      <Video
        onStreamStatusChange={(isLive) => {
          if (isLive !== streamer?.streamer?.isActive) {
            refetch()
          }
        }}
        muted={false}
        streamOfflineErrorComponent={
          // @ts-ignore
          <StreamerOffline profile={data} streamer={streamer?.streamer} />
        }
        src={getLiveStreamUrl(streamer?.streamer?.playbackId)}
      />
    )
  }, [streamer?.streamer?.playbackId])

  if (profileLoading || (streamerLoading && !streamer?.streamer)) {
    return <StartLoadingPage />
  }

  if (!data) {
    return <div>Profile not found</div>
  }

  return (
    <div className="flex flex-row h-full">
      <div className="w-full flex-grow overflow-auto no-scrollbar h-full">
        {streamer?.streamer?.playbackId ? (
          <>{videoComponent}</>
        ) : (
          <div className="h-[230px] sm:h-[700px]">
            {/* @ts-ignore */}
            <StreamerOffline profile={data} streamer={streamer?.streamer} />
          </div>
        )}

        {/* @ts-ignore */}
        <ProfileInfoWithStream profile={data} streamer={streamer?.streamer} />

        {!isMobile && streamer?.streamer?.latestStreamPublicationId && (
          <div className="m-8 border-t border-p-border">
            <div className="text-xl font-semibold my-4">Comments</div>
            <CommentSection
              publicationId={streamer?.streamer?.latestStreamPublicationId}
            />
          </div>
        )}

        <AboutProfile profile={data} />
      </div>
      {data?.id && !isMobile && (
        <div className="w-[350px] flex-none h-full">
          <LiveChat
            // @ts-ignore
            // publicationId={streamer?.streamer?.latestStreamPublicationId}
            profileId={data?.id}
          />
        </div>
      )}
    </div>
  )
}

export default ProfilePage

import React from 'react'
import { useStreamersWithProfiles } from '../../store/useStreamersWithProfiles'
import StreamCard from './StreamCard'

const LiveStreamerFeed = () => {
  const streamersWithProfiles = useStreamersWithProfiles(
    (state) => state.streamersWithProfiles
  )
  return (
    <div className="sm:m-8 my-4">
      <div className="text-p-text font-bold text-xl py-2 px-2 mb-4 sm:mb-8">
        Live Channels
      </div>

      {streamersWithProfiles?.length > 0 ? (
        <div className="flex flex-wrap sm:gap-x-4 gap-y-6 sm:gap-y-12">
          {streamersWithProfiles?.map((streamer) => {
            return <StreamCard key={streamer?.profileId} streamer={streamer} />
          })}
        </div>
      ) : (
        <div className="text-s-text font-bold text-xl py-2 px-2 mb-4 sm:mb-8">
          No one is live right now
        </div>
      )}
    </div>
  )
}

export default LiveStreamerFeed
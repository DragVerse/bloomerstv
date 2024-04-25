'use client'
import clsx from 'clsx'
import LiveStreamPublicReplays from '../components/pages/home/LiveStreamPublicReplays'
import LiveStreamerFeed from '../components/pages/home/LiveStreamerFeed'
import useIsMobile from '../utils/hooks/useIsMobile'
import StreamerHorizontalDiv from '../components/common/StreamerSidebar/StreamerHorizontalDiv'
import MobileTopHeader from '../components/pages/all/Header/MobileTopHeader'
import ClipsFeed from '../components/pages/home/ClipsFeed'

export default function Home() {
  const isMobile = useIsMobile()

  return (
    <div
      className={clsx(
        'w-full h-full overflow-x-hidden overflow-y-auto',
        isMobile && 'no-scrollbar'
      )}
    >
      {/* top header */}
      {isMobile && <MobileTopHeader />}

      {isMobile && <StreamerHorizontalDiv />}

      <LiveStreamerFeed />
      <div>
        <LiveStreamPublicReplays />
      </div>
      {!isMobile && (
        <div className="">
          <ClipsFeed />
        </div>
      )}
    </div>
  )
}

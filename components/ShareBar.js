import { siteConfig } from '@/lib/config'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const ShareButtons = dynamic(() => import('@/components/ShareButtons'), {
  ssr: false
})

/**
 * 分享栏
 * @param {} param0
 * @returns
 */
const ShareBar = ({ post }) => {
  const [mounted, setMounted] = useState(false)
  // A cached dynamic module must not appear before the empty SSR tree hydrates.
  useEffect(() => setMounted(true), [])
  if (
    !JSON.parse(siteConfig('POST_SHARE_BAR_ENABLE')) ||
    !post ||
    post?.type !== 'Post'
  ) {
    return <></>
  }

  return (
    <div className='m-1 overflow-x-auto scroll-hidden'>
      <div className='flex w-max min-w-full flex-nowrap md:w-full md:justify-end [&>*]:shrink-0'>
        {mounted && <ShareButtons post={post} />}
      </div>
    </div>
  )
}
export default ShareBar

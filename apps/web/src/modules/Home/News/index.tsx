import LogoGno from '@/components/LogoGno'
import { GNO_LAND_URL } from '@/utils/const'
import { HStack, VStack } from '@var-meta/ui'
import { Link } from 'next-view-transitions'
import React, { useState, useEffect, useCallback } from 'react'

interface NewsItem {
  title: string
  url: string
  date: string
}

const newsData: NewsItem[] = [
  {
    title: 'The More You Gno 11: Introducing gnobro',
    url: '/r/gnoland/blog:p/monthly-dev-11',
    date: '02 Sep 2024',
  },
  {
    title: "GopherCon US: gno.land's Challenge Series Contributions",
    url: '/r/gnoland/blog:p/gc24-challenge-series',
    date: '26 Aug 2024',
  },
  {
    title: 'gno.land at GopherCon US 2024',
    url: '/r/gnoland/blog:p/gc-us24',
    date: '16 Aug 2024',
  },
  {
    title: 'Debugging Gno Programs',
    url: '/r/gnoland/blog:p/gno-debugger',
    date: '06 Aug 2024',
  },
  {
    title: 'The More You Gno 10: Test4 is Live!',
    url: '/r/gnoland/blog:p/monthly-dev-10',
    date: '22 Jul 2024',
  },
  {
    title: 'Blockchain Testnet Launched: Test4 Now Live',
    url: '/r/gnoland/blog:p/test4-live',
    date: '17 Jul 2024',
  },
  {
    title: 'Discover gno.land at GopherCon US: Embrace Interpreted Go',
    url: '/r/gnoland/blog:p/discover-gno-gc24',
    date: '03 Jul 2024',
  },
  {
    title: 'Reaching Consensus: Developing Fault-tolerant SMTs using Golang',
    url: '/r/gnoland/blog:p/reaching-consensus',
    date: '01 Jul 2024',
  },
  {
    title:
      'The More You Gno 9: Realm to Realm Interaction, Faucet Hub, New Test4 Launch Date and More',
    url: '/r/gnoland/blog:p/monthly-dev-9',
    date: '20 Jun 2024',
  },
  {
    title: 'Test4 Explained',
    url: '/r/gnoland/blog:p/test4-explained',
    date: '30 May 2024',
  },
  {
    title:
      'Gnomes Spotted in Belgrade, Serbia: Recap from the Engineering Retreat and Golang Serbia Meetup',
    url: '/r/gnoland/blog:p/gnomes-in-serbia',
    date: '28 May 2024',
  },
  {
    title: 'Introducing our new Gno.land logo: the gnome',
    url: '/r/gnoland/blog:p/the-gnome',
    date: '21 May 2024',
  },
  {
    title: 'Introducing Gno Studio, the Premier Builder Suite for Gno.land',
    url: '/r/gnoland/blog:p/gno-studio-intro',
    date: '14 May 2024',
  },
  {
    title:
      'Key/Value Stores: How We Improved the Performance of Our tx-indexer by 10x',
    url: '/r/gnoland/blog:p/kv-stores-indexer',
    date: '10 May 2024',
  },
  {
    title: 'The More You Gno 8: Portal Loop, Test4 and More',
    url: '/r/gnoland/blog:p/monthly-dev-8',
    date: '26 Apr 2024',
  },
  {
    title: 'Tokyo Meetup Recap: Getting to Gno Gno.land',
    url: '/r/gnoland/blog:p/gno-tokyo',
    date: '15 Apr 2024',
  },
  {
    title: 'Who You Gno – On the Record with Dragos Roua',
    url: '/r/gnoland/blog:p/wyg-dragos',
    date: '08 Feb 2024',
  },
  {
    title: 'Gno.land Funding and Grants Program - Quarterly Report: Q4 2023',
    url: '/r/gnoland/blog:p/funding-program-23q4',
    date: '07 Feb 2024',
  },
  {
    title: 'Building Gno.land - Proof of Contribution II',
    url: '/r/gnoland/blog:p/bgl-poc2',
    date: '26 Jan 2024',
  },
  {
    title: '5 Things I Learned While Porting Flippando From Solidity to Gno',
    url: '/r/gnoland/blog:p/porting-flippando-gno',
    date: '24 Jan 2024',
  },
  {
    title: 'The More You Gno: Gno.land Monthly Updates - 7',
    url: '/r/gnoland/blog:p/monthly-dev-7',
    date: '22 Jan 2024',
  },
  {
    title: 'Who You Gno – On the Record with Antoine Breuil',
    url: '/r/gnoland/blog:p/wyg-zooma',
    date: '11 Jan 2024',
  },
  {
    title: 'Building Gno.land – Next Generation Smart Contract System',
    url: '/r/gnoland/blog:p/bgl-poc1',
    date: '10 Jan 2024',
  },
  {
    title: 'The More You Gno: Gno.land Monthly Updates - 6',
    url: '/r/gnoland/blog:p/monthly-dev-6',
    date: '29 Nov 2023',
  },
  {
    title: 'Who You Gno – On the Record with Dongwon Shin',
    url: '/r/gnoland/blog:p/wyg-dongwon-shin',
    date: '24 Nov 2023',
  },
  {
    title: 'Gno.land Moderation DAO Module',
    url: '/r/gnoland/blog:p/gnoland-moderation-dao-module',
    date: '19 Oct 2023',
  },
  {
    title: 'Gno.land Funding and Grants Program - Progress So Far',
    url: '/r/gnoland/blog:p/funding-program-23q3',
    date: '17 Oct 2023',
  },
  {
    title: 'The More You Gno: Gno.land Monthly Updates - 5',
    url: '/r/gnoland/blog:p/monthly-dev-5',
    date: '10 Oct 2023',
  },
  {
    title: 'GnoMobile, a Framework for Building Gno Mobile Apps',
    url: '/r/gnoland/blog:p/gnomobile',
    date: '29 Sep 2023',
  },
  {
    title: 'Play Chess with Us: The Gnolang Way at GopherCon 2023',
    url: '/r/gnoland/blog:p/chess-gc23',
    date: '25 Sep 2023',
  },
  {
    title: 'The More You Gno: Gno.land Monthly Updates - 4',
    url: '/r/gnoland/blog:p/monthly-dev-4',
    date: '04 Sep 2023',
  },
  {
    title: 'The More You Gno: Gno.land Monthly Updates - 3',
    url: '/r/gnoland/blog:p/monthly-dev-3',
    date: '11 Jul 2023',
  },
  {
    title: 'Announcing the Gno.land Funding and Grants Program',
    url: '/r/gnoland/blog:p/funding-program',
    date: '27 Jun 2023',
  },
  {
    title: 'The More You Gno: Gno.land Monthly Updates - 2',
    url: '/r/gnoland/blog:p/monthly-dev-2',
    date: '26 May 2023',
  },
  {
    title: 'The More You Gno: Gno.land Monthly Updates',
    url: '/r/gnoland/blog:p/monthly-dev-1',
    date: '15 Apr 2023',
  },
  {
    title: 'All You Need to Know About Game of Realms: Phase One',
    url: '/r/gnoland/blog:p/gor-phase1',
    date: '12 Mar 2023',
  },
  {
    title: 'Gno.land Community Game of Realms AMA #1 - Recap',
    url: '/r/gnoland/blog:p/gor-ama1',
    date: '03 Feb 2023',
  },
  {
    title: 'Game of Realms Is On: Win Rewards for Contributing to Gno.land',
    url: '/r/gnoland/blog:p/gor-launch',
    date: '18 Jan 2023',
  },
  {
    title: 'Gno.land Community Technical AMA #1 - Recap',
    url: '/r/gnoland/blog:p/tech-ama1',
    date: '05 Dec 2022',
  },
  {
    title:
      'Intro to Gnoland - The Smart Contract Platform to Improve Our Understanding of the World',
    url: '/r/gnoland/blog:p/intro',
    date: '25 Aug 2022',
  },
  {
    title: 'Second post',
    url: '/r/gnoland/blog:p/post2',
    date: '20 May 2022',
  },
  {
    title: 'First post',
    url: '/r/gnoland/blog:p/post1',
    date: '20 May 2022',
  },
  {
    title: 'Peace!',
    url: '/r/gnoland/blog:p/peace',
    date: '02 May 2022',
  },
]

const INITIAL_VISIBLE_COUNT = 10
const LOAD_MORE_COUNT = 10

const News = () => {
  const [visibleItems, setVisibleItems] = useState<NewsItem[]>(
    newsData.slice(0, INITIAL_VISIBLE_COUNT),
  )
  const [hasMore, setHasMore] = useState<boolean>(
    newsData.length > INITIAL_VISIBLE_COUNT,
  )
  const [loading, setLoading] = useState<boolean>(false)

  const loadMoreItems = useCallback(() => {
    if (loading || !hasMore) return

    setLoading(true)
    setTimeout(() => {
      const newIndex = visibleItems.length + LOAD_MORE_COUNT
      const newItems = newsData.slice(visibleItems.length, newIndex)
      setVisibleItems((prevItems) => [...prevItems, ...newItems])
      setHasMore(newsData.length > newIndex)
      setLoading(false)
    }, 1000)
  }, [visibleItems, hasMore, loading])

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const target = event.target as HTMLElement
      if (target.scrollHeight - target.scrollTop === target.clientHeight) {
        loadMoreItems()
      }
    }

    const container = document.getElementById('news-container')
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [loadMoreItems])

  return (
    <div className="dark:bg-primary-dark h-80 flex-1 overflow-hidden rounded-3xl bg-white">
      <HStack className="h-[3.25rem] border-b border-black/10 px-4 py-3 dark:border-white/10">
        <span className="text-xl font-bold dark:text-white">News</span>
      </HStack>
      <VStack
        spacing={16}
        className="max-h-[calc(20rem-3.25rem)] overflow-y-scroll px-4 py-4"
        id="news-container"
      >
        <VStack className="flex-1">
          {visibleItems.map((item, index) => (
            <Link
              key={index}
              href={GNO_LAND_URL + item.url}
              target="_blank"
              className="group flex cursor-pointer flex-nowrap items-start gap-4 pb-2.5"
            >
              <div className="py-1">
                <LogoGno width={28} height={28} />
              </div>
              <VStack
                spacing={4}
                className="flex-1 transition-opacity duration-200 ease-linear group-hover:opacity-50"
              >
                <p className="line-clamp-3 flex-1 py-0.5 font-semibold dark:text-white">
                  {item.title}
                </p>
                <span className="dark:text-light text-xs">{item.date}</span>
              </VStack>
            </Link>
          ))}
          {loading && (
            <p className="dark:text-light text-sm font-medium">
              Loading more...
            </p>
          )}
        </VStack>
      </VStack>
    </div>
  )
}

export default News

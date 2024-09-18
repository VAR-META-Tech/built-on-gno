'use client'

import React, { useMemo, useState } from 'react'
import BreadCrumb from '@/components/BreadCrumb'
import { VStack } from '@var-meta/ui'
import EventTitle from './components/EventTitle'
import EventList from './components/EventList'
import { eventBreadcrumbList, events, tabList, tabValue } from './utils/const'
import EventTab from './components/EventTab'

const EventsPage = () => {
  const [tab, setTab] = useState<string>(tabValue.upcoming)

  const eventFilter = useMemo(() => {
    const isUpcoming = tab === tabValue.upcoming
    const now = new Date()

    return events.filter((event) =>
      isUpcoming ? event.start > now : event.start < now,
    )
  }, [tab, events])

  return (
    <div className="container min-h-screen pb-5">
      <div className="pb-8">
        <BreadCrumb data={eventBreadcrumbList} />
      </div>

      <VStack spacing={32}>
        <EventTitle />
        <EventTab
          layoutId="event-tab"
          data={tabList}
          value={tab}
          onChange={setTab}
        />
        <EventList data={eventFilter} />
      </VStack>
    </div>
  )
}

export default EventsPage

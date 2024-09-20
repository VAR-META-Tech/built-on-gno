import { IBreadCrumbData } from "@/components/BreadCrumb";
import { IEvent } from "./type";
import { ROUTES } from "@/lib/routes";

export const events: IEvent[] = [
    {
        title:
            'Distributed communities: How to Build Timeless and Decentralized apps, with Go',
        description: 'Join our meetup!',
        location: 'Turin, Italy',
        start: new Date('2024-09-23T18:30:00+02:00'),
        end: new Date('2024-09-23T20:30:00+02:00'),
        url: 'https://www.meetup.com/golang-torino/events/303140845/',
    },
    {
        title: 'BUIDL with Cosmos Tooling',
        description: 'Join us at our side event during Web3 Summit!',
        location: 'Berlin, Germany',
        start: new Date('2024-08-20T17:00:00+02:00'),
        end: new Date('2024-08-20T22:00:00+02:00'),
        url: 'https://www.eventbrite.com/e/buidl-with-cosmos-tooling-tickets-981775686507?aff=oddtdtcreator',
    },
    {
        title: 'Web3 Kamp 2024',
        description:
            'Workshop: "Exploring Web3 Ecosystems - Building a dapp in Go"',
        location: 'Petnica, Serbia',
        start: new Date('2024-08-01T10:00:00+02:00'),
        end: new Date('2024-08-09T17:00:00+02:00'),
        url: 'https://web3kamp.org/',
    },
    {
        title: 'Nebular Summit 2024',
        description: 'Join our workshop!',
        location: 'Brussels, Belgium',
        start: new Date('2024-07-12T10:00:00+02:00'),
        end: new Date('2024-07-13T18:00:00+02:00'),
        url: 'https://nebular.builders/',
    },
    {
        title: 'GopherCon US 2024',
        description: 'Come meet us at our booth!',
        location: 'Chicago, US',
        start: new Date('2024-07-07T10:00:00-06:00'),
        end: new Date('2024-07-10T18:00:00-06:00'),
        url: 'https://www.gophercon.com/',
    },
    {
        title: 'GopherCon EU 2024',
        description: 'Come meet us at our booth!',
        location: 'Berlin, Germany',
        start: new Date('2024-06-17T10:00:00+02:00'),
        end: new Date('2024-06-20T10:00:00+02:00'),
        url: 'https://www.gophercon.com/',
    },
    {
        title: 'Gno @ Golang Serbia',
        description: 'Join the meetup!',
        location: 'Belgrade, Serbia',
        start: new Date('2024-05-23T18:00:00+02:00'),
        end: new Date('2024-05-23T22:00:00+02:00'),
        url: 'https://gno.land/r/gnoland/blog:p/gnomes-in-serbia',
    },
    {
        title: 'Intro to Gno Tokyo',
        description: 'Join the meetup!',
        location: 'Shinjuku City, Tokyo, Japan',
        start: new Date('2024-04-11T18:30:00+09:00'),
        end: new Date('2024-04-11T22:00:00+09:00'),
        url: 'https://gno.land/r/gnoland/blog:p/gno-tokyo',
    },
    {
        title: 'Go to Gno Seoul',
        description: 'Join the workshop!',
        location: 'Seoul, South Korea',
        start: new Date('2024-03-23T10:00:00+09:00'),
        end: new Date('2024-03-23T18:00:00+09:00'),
        url: 'https://medium.com/onbloc/go-to-gno-recap-intro-to-the-gno-stack-with-memeland-284a43d7f620',
    },
    {
        title: 'GopherCon US 2023',
        description: 'Come meet us at our booth!',
        location: 'San Diego, US',
        start: new Date('2023-09-26T10:00:00-07:00'),
        end: new Date('2023-09-29T18:00:00-07:00'),
        url: 'https://www.gophercon.com/',
    },
    {
        title: 'GopherCon EU 2023',
        description: 'Come meet us at our booth!',
        location: 'Berlin, Germany',
        start: new Date('2023-07-26T10:00:00+02:00'),
        end: new Date('2023-07-29T18:00:00+02:00'),
        url: 'https://gophercon.eu/',
    },
    {
        title: 'Nebular Summit gno.land for Developers',
        description: '',
        location: 'Paris, France',
        start: new Date('2023-07-24T10:00:00+02:00'),
        end: new Date('2023-07-25T18:00:00+02:00'),
        url: 'https://www.nebular.builders/',
    },
    {
        title: 'EthCC',
        description: 'Come meet us at our booth!',
        location: 'Paris, France',
        start: new Date('2023-07-17T10:00:00+02:00'),
        end: new Date('2023-07-20T18:00:00+02:00'),
        url: 'https://ethcc.io/',
    },
    {
        title: 'BUIDL Asia',
        description: 'Proof of Contribution in gno.land',
        location: 'Seoul, South Korea',
        start: new Date('2023-06-06T10:00:00+09:00'),
        end: new Date('2023-06-07T18:00:00+09:00'),
        url: 'https://www.buidl.asia/',
    },
    {
        title: 'ETH Seoul',
        description: 'The Evolution of Smart Contracts: A Journey into gno.land',
        location: 'Seoul, South Korea',
        start: new Date('2023-06-02T10:00:00+09:00'),
        end: new Date('2023-06-04T18:00:00+09:00'),
        url: 'https://2023.ethseoul.org/',
    },
    {
        title: 'Game Developer Conference',
        description: 'Side Event: Web3 Gaming Apps Powered by Gno',
        location: 'San Francisco, US',
        start: new Date('2023-03-23T10:00:00-07:00'),
        end: new Date('2023-03-23T18:00:00-07:00'),
        url: '',
    },
    {
        title: 'EthDenver 2023',
        description: 'Side Event: Discover gno.land',
        location: 'Denver, US',
        start: new Date('2023-02-24T10:00:00-06:00'),
        end: new Date('2023-03-05T10:00:00-06:00'),
        url: 'https://www.youtube.com/watch?v=IJ0xel8lr4c',
    },
    {
        title: 'Istanbul Blockchain Week',
        description: '',
        location: 'Istanbul, Turkey',
        start: new Date('2022-11-14T10:00:00+03:00'),
        end: new Date('2022-11-17T18:00:00+03:00'),
        url: 'https://www.youtube.com/watch?v=JX0gdWT0Cg4',
    },
    {
        title: 'Web Summit Buckle Up and Build with Cosmos',
        description: '',
        location: 'Lisbon, Portugal',
        start: new Date('2022-11-01T09:00:00+01:00'),
        end: new Date('2022-11-04T18:00:00+01:00'),
        url: '',
    },
    {
        title: 'Cosmoverse',
        description: '',
        location: 'Medellin, Colombia',
        start: new Date('2022-09-26T09:00:00-05:00'),
        end: new Date('2022-09-28T18:00:00-05:00'),
        url: 'https://www.youtube.com/watch?v=6s1zG7hgxMk',
    },
    {
        title: 'Berlin Blockchain Week Buckle Up and Build with Cosmos',
        description: '',
        location: 'Berlin, Germany',
        start: new Date('2022-09-11T09:00:00+02:00'),
        end: new Date('2022-09-18T18:00:00+02:00'),
        url: 'https://www.youtube.com/watch?v=hCLErPgnavI',
    },
]

export const tabValue = {
    upcoming: 'upcoming',
    past: 'past',
}

export const tabList = [
    {
        label: 'Upcoming',
        value: tabValue.upcoming,
    },
    {
        label: 'Past',
        value: tabValue.past,
    },
]

export const eventBreadcrumbList: IBreadCrumbData[] = [
    {
        label: 'Home',
        href: ROUTES.HOME,
    },
    {
        label: 'Events',
        href: ROUTES.EVENTS,
    },
]

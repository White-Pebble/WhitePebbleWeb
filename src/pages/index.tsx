import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import {PageProps} from "@/pages/_app";
import {ClashMe, Point} from "@/services/types";
import {stats} from "@/services/WhitePebble";
import {websiteToFull} from "@/services/Utils";
import {HeaderSkeleton} from "@/components/Skeletons";
import Chart from 'chart.js/auto';

enum Page {
  OVERVIEW,
  RUSTCLASH,
  CLASH
}

const StatBox = ({stat, value, children}: any) => (
  <div
    className='p-4 trans hover:-skew-y-2 flex flex-col justify-between w-full h-40 tile bg-white/10 backdrop-blur-sm rounded-md shadow-md'>
    <h1 className='text-base opacity-70 font-light'>{stat}</h1>
    {value === undefined ? (
      <HeaderSkeleton/>
    ) : (
      <h1 className='text-4xl font-extrabold'>{value}</h1>
    )}
  </div>
)

const Overview = ({statsMap, available, user}: PageProps & {statsMap: { [key: string]: { user: ClashMe, points: Point[] } } | undefined}) => {
  const totalBalance = statsMap && Object.values(statsMap).map(old => old.user.balance).reduce((pv, cv) => pv + cv, 0)
  const totalTickets = statsMap && Object.values(statsMap).map(old => old.user.tickets).reduce((pv, cv) => pv + cv, 0)

  return (
    <div className='flex flex-col gap-14 min-w-full min-h-full'>
      {/* Top */}
      <div className='flex flex-col gap-4'>
        <h1 className='text-4xl'>👋 Welcome Back, <span className='rustclash-gr'>{user.username}</span></h1>
        {/* Rows */}
        <div className='min-w-full flex flex-col lg:flex-row justify-between gap-2'>
          <StatBox stat='Balance Overall' value={totalBalance === undefined ? undefined : `$${totalBalance.toFixed(2)}`}/>
          <StatBox stat='Tickets Overall' value={totalTickets}/>
          <StatBox stat='Accounts' value={available.length}/>
        </div>
      </div>

      {/* Website Stats Quick Glance */}
      {statsMap && Object.keys(statsMap).map(website => {
        const {user} = statsMap[website]
        return (
          <div className='flex flex-col gap-4' key={website}>
            <h1 className='text-2xl'><span className='rustclash-gr'>{user.name}</span> @ {websiteToFull(website)}</h1>
            {/* Rows */}
            <div className='min-w-full flex flex-col lg:flex-row justify-between gap-2'>
              <StatBox stat='Balance' value={`$${user.balance.toFixed(2)}`}/>
              <StatBox stat='Tickets' value={user.tickets}/>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const RustStats = ({statsMap}: PageProps & {statsMap: { [key: string]: { user: ClashMe, points: Point[] } } | undefined}) => {
  const old: any = useRef()
  
  useEffect(() => {
    if (statsMap === undefined || !Object.keys(statsMap).includes('rustclash'))
      return

    if (old.current !== undefined)
      old.current.destroy()

    const data = statsMap['rustclash']
    old.current = new Chart(
      document.getElementById('graph') as any,
      {
        type: 'line',
        options: {
          interaction: {
            mode: 'index',
            intersect: false
          },
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            line: {
              borderWidth: 1,
              borderColor: '#BE39DD'
            },
            point: {
              borderWidth: 2,
              borderColor: '#CF7FE2'
            }
          },
          scales: {
            x: {
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            },
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',

              // grid line settings
              grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
            }
          },
          hover: {
            mode: 'index',
          },
          animation: false,
          plugins: {
            legend: {
              display: true
            },
            tooltip: {
              enabled: true
            }
          }
        },
        data: {
          labels: Object.keys(Array.from(Array(data.points.length))),
          datasets: [
            {
              label: 'Balance',
              data: data.points.map(row => row.balance),
              yAxisID: 'y'
            },
            {
              label: 'Tickets',
              data: data.points.map(row => row.tickets),
              borderColor: 'white',
              backgroundColor: 'black',
              yAxisID: 'y1'
            }
          ]
        },
      }
    )
  }, [statsMap])

  if (!statsMap)
    return (
      <h1 className='text-3xl'>Loading...</h1>
    )

  if (!Object.keys(statsMap).includes('rustclash'))
    return (
      <h1 className='text-3xl'>Website not offered</h1>
    )

  const user = statsMap!!['rustclash'].user
  return (
    <div className='flex flex-col gap-14 min-w-full min-h-full'>
      {/* Top */}
      <div className='flex flex-col gap-4'>
        <h1 className='text-4xl'><span className='rustclash-gr'>{user.name}</span> @ RustClash</h1>
        {/* Rows */}
        <div className='min-w-full flex flex-col lg:flex-row justify-between gap-2'>
          <StatBox stat='Balance' value={`$${user.balance.toFixed(2)}`}/>
          <StatBox stat='Tickets' value={user.tickets}/>
        </div>
      </div>

      {/* Graph */}
      <div className='tile bg-white/10 backdrop-blur-sm rounded-md shadow-md pb-14 p-4 flex flex-col min-w-full h-[30rem] gap-2'>
        <h1 className='text-3xl'>Balance</h1>
        <canvas width='100%' id='graph' />
      </div>
    </div>
  )
}

const ClashStats = ({statsMap}: PageProps & {statsMap: { [key: string]: { user: ClashMe, points: Point[] } } | undefined}) => {
  const old: any = useRef()

  useEffect(() => {
    if (statsMap === undefined || !Object.keys(statsMap).includes('clash'))
      return

    if (old.current !== undefined)
      old.current.destroy()

    const data = statsMap['clash']
    old.current = new Chart(
      document.getElementById('graph2') as any,
      {
        type: 'line',
        options: {
          interaction: {
            mode: 'index',
            intersect: false
          },
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            line: {
              borderWidth: 1,
              borderColor: '#BE39DD'
            },
            point: {
              borderWidth: 2,
              borderColor: '#CF7FE2'
            }
          },
          scales: {
            x: {
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            },
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',

              // grid line settings
              grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
            }
          },
          hover: {
            mode: 'index',
          },
          animation: false,
          plugins: {
            legend: {
              display: true
            },
            tooltip: {
              enabled: true
            }
          }
        },
        data: {
          labels: Object.keys(Array.from(Array(data.points.length))),
          datasets: [
            {
              label: 'Balance',
              data: data.points.map(row => row.balance),
              yAxisID: 'y'
            },
            {
              label: 'Tickets',
              data: data.points.map(row => row.tickets),
              borderColor: 'white',
              backgroundColor: 'black',
              yAxisID: 'y1'
            }
          ]
        },
      }
    )
  }, [statsMap])

  if (!statsMap)
    return (
      <h1 className='text-3xl'>Loading...</h1>
    )

  if (!Object.keys(statsMap).includes('clash'))
    return (
      <h1 className='text-3xl'>Website not offered</h1>
    )

  const user = statsMap!!['clash'].user
  return (
    <div className='flex flex-col gap-14 min-w-full min-h-full'>
      {/* Top */}
      <div className='flex flex-col gap-4'>
        <h1 className='text-4xl'><span className='rustclash-gr'>{user.name}</span> @ Clash</h1>
        {/* Rows */}
        <div className='min-w-full flex flex-col lg:flex-row justify-between gap-2'>
          <StatBox stat='Balance' value={`$${user.balance.toFixed(2)}`}/>
          <StatBox stat='Tickets' value={user.tickets}/>
        </div>
      </div>

      {/* Graph */}
      <div className='tile bg-white/10 backdrop-blur-sm rounded-md shadow-md pb-14 p-4 flex flex-col min-w-full h-[30rem] gap-2'>
        <h1 className='text-3xl'>Balance</h1>
        <canvas width='100%' id='graph2' />
      </div>
    </div>
  )
}

const Mapping: any = {
  [Page.OVERVIEW]: Overview,
  [Page.RUSTCLASH]: RustStats,
  [Page.CLASH]: ClashStats
}

const PathToPage: any = {
  '/': Page.OVERVIEW,
  '/?site=rustclash': Page.RUSTCLASH,
  '/?site=clash': Page.CLASH
}

export default function WebsiteStats({user, available}: PageProps) {
  const router = useRouter()
  const [currentPage, setPage] = useState<Page>(Page.OVERVIEW)
  const [statsMap, setStatsMap] = useState<{ [key: string]: { user: ClashMe, points: Point[] } } | undefined>(undefined)

  useEffect(() => {
    console.log(router.asPath)
    setPage(PathToPage[router.asPath])
  }, [router.asPath])

  useEffect(() => {
    const getAllStats = async () => {
      const pool: { [key: string]: { user: ClashMe, points: Point[] } } = {}
      for (const website of available) {
        const {user, points} = (await stats(website)).data
        pool[website] = ({
          user: user,
          points: points
        })
      }
      return pool
    }
    getAllStats().then(setStatsMap)
  }, [available])

  return (
    currentPage !== undefined ? (
      Object.keys(Mapping).map(page => {
        const isActive = page === currentPage.toString()
        const El = Mapping[page]
        return (
          <div className={`${isActive ? 'opacity-100 delay-200' : 'opacity-0 invisible'} px-12 pb-6 lg:px-0 trans absolute top-0 bottom-0 left-0 right-0`} key={page}>
            <El statsMap={statsMap} user={user} available={available} />
          </div>
        )
      })
    ) : (
      <h1 className='text-3xl'>Not Found</h1>
    )
  )
}

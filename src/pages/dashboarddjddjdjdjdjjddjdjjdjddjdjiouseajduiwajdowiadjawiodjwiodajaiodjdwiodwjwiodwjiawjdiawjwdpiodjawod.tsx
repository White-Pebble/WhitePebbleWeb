import {PrimaryButton, SecondaryButton} from "@/components/Buttons";
import Link from "next/link";
import Chart from 'chart.js/auto';
import {useEffect, useState} from "react";
import {WebsiteResponse} from "@/services/types";
import {HeaderSkeleton} from "@/components/Skeletons";
import {getData} from "@/services/WhitePebble";

const StatBox = ({stat, value, children}: any) => (
  <div className='trans skew-x-2 hover:skew-x-6 hover:scale-95 tile p-3 flex flex-col justify-between w-full shadow-md h-40 bg-black/90 z-20 backdrop-blur-sm rounded-md'>
    <p className='text-base font-light'>{stat}</p>
    <div className='items-end flex flex-row min-w-full justify-between'>
      {value !== undefined ? (
        <h1 className='text-4xl font-extrabold'>{value}</h1>
      ) : (
        <HeaderSkeleton />
      )}
      {children !== undefined && (
        children
      )}
    </div>
  </div>
)

export default function Dashboard() {
  const [data, setData] = useState<WebsiteResponse | undefined>(undefined)

  useEffect(() => {
    getData().then(res => {
      if (!res.data.success)
        return alert('An error occurred whilst fetching website data')
      setData(res.data)
    })
  }, [])

  useEffect(() => {
    // Only run if data exists
    if (data === undefined)
      return

    new Chart(
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
          labels: Object.keys(Array.from(Array(data.data.length))),
          datasets: [
            {
              label: 'Balance',
              data: data.data.map(row => row.balance),
              yAxisID: 'y'
            },
            {
              label: 'Tickets',
              data: data.data.map(row => row.tickets),
              borderColor: 'white',
              backgroundColor: 'black',
              yAxisID: 'y1'
            }
          ]
        },
      }
    )
  }, [data])

  return (
    <div className='flex flex-col gap-8 w-full h-full max-w-6xl'>
      <h1 className='text-4xl'>Welcome Back</h1>
      {/* Stats Row */}
      <div className='flex flex-col gap-3 md:flex-row md:justify-between w-full'>
        <StatBox stat='Raffles Joined' value={data ? 204 : undefined}>
          <Link href='https://rustclash.com/raffle' target='_blank'>
            <SecondaryButton text='View Raffles' />
          </Link>
        </StatBox>
        <StatBox stat='Tickets Remaining' value={data?.user.tickets}>
          <PrimaryButton icon='/raffle.svg' text='Buy More' />
        </StatBox>
        <StatBox stat='Balance' value={data ? `$${data?.user.balance}` : undefined}>
          <SecondaryButton icon='/ltc.svg' text='Copy LTC' />
        </StatBox>
      </div>

      {/* Graph */}
      <div className='tile shadow-md pb-14 bg-black/90 z-20 backdrop-blur-sm rounded-md p-3 flex flex-col min-w-full h-[30rem] gap-2 mt-auto '>
        <h1 className='text-3xl'>Balance</h1>
        <canvas width='100%' id='graph' />
      </div>
    </div>
  )
}
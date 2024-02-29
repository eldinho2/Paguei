'use client'

import * as React from "react"
import { useState, useEffect } from "react"
import { type CarouselApi } from "@/components/ui/carousel"
import { useSelectedMonth } from "@/stores/selectedMonth-store"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
]


export default function CarouselComponent() {
  const month = useSelectedMonth((state: any) => state.month)
  const updateSelecteMonth = useSelectedMonth((state: any) => state.updateSelecteMonth)
  const currentMonth = new Date().getMonth()
  
  const [api, setApi] = useState<CarouselApi>()
  const [selectedMonth, setSelectedMonth] = React.useState(0)
  updateSelecteMonth(selectedMonth)
  

  useEffect(() => {
    if (!api) {
      return
    }

    setSelectedMonth(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setSelectedMonth(api.selectedScrollSnap() + 1)
    })
    
    
  }, [api])


  const handleClick = () => {
    if (api) {
      api.scrollTo(currentMonth, false)
    }
  }

  console.log('selectedMonth', selectedMonth) 

  return (
    <Carousel
      setApi={setApi}
      className="w-20 max-w-sm select-none"
      opts={{
        startIndex: currentMonth,
      }}
    >
      <CarouselContent className="">
        {months.map((month, index) => (
          <CarouselItem key={index} className="">
            <div className="flex items-center justify-center">
              <Card className="w-16 h-16 bg-transparent shadow-none border-none">
                <CardContent className="flex aspect-square items-center justify-center p-0 m-0">
                  <span className="text-1xl text-white font-semibold">{month}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div onClick={handleClick} className="absolute inset-0 bg-transparent"></div>
      <CarouselPrevious variant='ghost' className=" text-white border-none h-6  hover:bg-transparent active:bg-white/65 hover:text-white" />
      <CarouselNext variant='ghost' className=" text-white border-none h-6  hover:bg-transparent active:bg-white/65 hover:text-white" />
    </Carousel>
  )
}
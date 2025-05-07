"use client"

import { Loader } from "@googlemaps/js-api-loader"
import React, { useEffect, useRef } from "react"

export function GoogleMap() {
    const mapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
                version: "weekly",
                libraries: ["places", "marker"],
            })

            const { Map } = await loader.importLibrary("maps")
            const { AdvancedMarkerElement } = await loader.importLibrary("marker")

            const location = {
                lat: 48.946232047449165,
                lng: 2.3272384490529476,
            }

            const map = new Map(mapRef.current as HTMLElement, {
                center: location,
                zoom: 15,
                mapId: "abc1234567890def",
                mapTypeId: "roadmap",
            })

            new AdvancedMarkerElement({
                map,
                position: location,
                title: "Street Café",
            })
        }
        initMap()
    }, [])

    return (
        <div
            ref={mapRef}
            className="w-[280px] h-[225px] rounded-2xl shadow-md overflow-hidden"
        />
    )
}

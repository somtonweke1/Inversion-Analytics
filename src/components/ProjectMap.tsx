'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// Dynamically import Leaflet components with no SSR
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

export interface ProjectLocation {
  id: string
  companyName: string
  city?: string
  state?: string
  latitude: number
  longitude: number
  status: string
  projectedLifespanMonths?: number
  capitalAvoidance?: number
}

interface ProjectMapProps {
  projects: ProjectLocation[]
  height?: string
}

export default function ProjectMap({ projects, height = '500px' }: ProjectMapProps) {
  const [isMounted, setIsMounted] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [leafletIcon, setLeafletIcon] = useState<any>(null)

  useEffect(() => {
    setIsMounted(true)

    // Import Leaflet and create custom icons
    import('leaflet').then((L) => {
      // Fix for default marker icons in Next.js
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      })

      // Custom icon for different statuses
      const createCustomIcon = (color: string) => {
        return L.divIcon({
          className: 'custom-marker',
          html: `<div style="background-color: ${color}; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
          iconSize: [25, 25],
          iconAnchor: [12, 12],
        })
      }

      setLeafletIcon({
        PENDING: createCustomIcon('#f59e0b'),
        DATA_SUBMITTED: createCustomIcon('#3b82f6'),
        REPORT_GENERATED: createCustomIcon('#10b981'),
      })
    })
  }, [])

  if (!isMounted || !leafletIcon) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Project Locations</CardTitle>
          <CardDescription>Geographic distribution of PFAS treatment sites</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center" style={{ height }}>
            <p className="text-slate-500">Loading map...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Calculate center based on projects or default to US center
  const center: [number, number] = projects.length > 0
    ? [
        projects.reduce((sum, p) => sum + p.latitude, 0) / projects.length,
        projects.reduce((sum, p) => sum + p.longitude, 0) / projects.length,
      ]
    : [39.8283, -98.5795] // Center of USA

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return leafletIcon.PENDING
      case 'DATA_SUBMITTED':
        return leafletIcon.DATA_SUBMITTED
      case 'REPORT_GENERATED':
        return leafletIcon.REPORT_GENERATED
      default:
        return leafletIcon.PENDING
    }
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://unpkg.com/leaflet@1.7.1/dist/leaflet.css');

        .leaflet-container {
          border-radius: 0.5rem;
          z-index: 0;
        }

        .custom-marker {
          background: none;
          border: none;
        }

        .leaflet-popup-content-wrapper {
          border-radius: 0.5rem;
          padding: 0;
        }

        .leaflet-popup-content {
          margin: 0;
          min-width: 200px;
        }
      `}</style>

      <Card>
        <CardHeader>
          <CardTitle>Project Locations</CardTitle>
          <CardDescription>
            Geographic distribution of PFAS treatment sites
            <span className="ml-4">
              <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-1"></span> Pending
              <span className="inline-block w-3 h-3 rounded-full bg-blue-500 ml-3 mr-1"></span> Data Submitted
              <span className="inline-block w-3 h-3 rounded-full bg-green-500 ml-3 mr-1"></span> Report Generated
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <div className="flex items-center justify-center text-slate-500" style={{ height }}>
              No projects with location data available
            </div>
          ) : (
            <MapContainer
              center={center}
              zoom={projects.length === 1 ? 10 : 4}
              style={{ height, width: '100%' }}
              className="rounded-lg"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {projects.map((project) => (
                <Marker
                  key={project.id}
                  position={[project.latitude, project.longitude]}
                  icon={getMarkerColor(project.status)}
                >
                  <Popup>
                    <div className="p-3">
                      <h3 className="font-semibold text-lg mb-2">{project.companyName}</h3>
                      {project.city && project.state && (
                        <p className="text-sm text-slate-600 mb-2">
                          {project.city}, {project.state}
                        </p>
                      )}
                      <p className="text-xs text-slate-500 mb-2">
                        Status: <span className="font-medium">{project.status.replace('_', ' ')}</span>
                      </p>
                      {project.projectedLifespanMonths && (
                        <p className="text-sm">
                          <span className="font-medium text-blue-600">
                            {project.projectedLifespanMonths.toFixed(1)} months
                          </span>{' '}
                          projected lifespan
                        </p>
                      )}
                      {project.capitalAvoidance && (
                        <p className="text-sm">
                          <span className="font-medium text-green-600">
                            ${project.capitalAvoidance.toLocaleString()}
                          </span>{' '}
                          capital avoidance
                        </p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </CardContent>
      </Card>
    </>
  )
}

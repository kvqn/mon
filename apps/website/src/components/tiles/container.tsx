"use client"

import { getMonitorTileInfo } from "@/lib/server/actions/get-monitor-tile-info"

import { MonitorDialog } from "../dialogs/monitor-dialog"
import { BaseTile } from "./_base"

import { useQuery } from "@tanstack/react-query"
import { Monitor } from "lucide-react"

export function ContainerTile({
  dbKey,
  r_span,
  c_span,
}: {
  dbKey: string
  r_span: number
  c_span: number
}) {
  const { data, isFetched } = useQuery({
    queryKey: ["monitor-config", "container", dbKey],
    queryFn: async () => await getMonitorTileInfo("container", dbKey),
  })
  if (!isFetched || !data) {
    return <div>loading</div>
  }

  const { config, status } = data
  if (!config) {
    throw new Error(
      `Container tile with key "${dbKey}" not found in configuration.`,
    )
  }
  let title: string
  const name = config.name ?? config.key

  if (r_span === 1 && c_span === 1) {
    title = name.length > 3 ? name[0]!.toUpperCase() : name
  } else {
    title = config.name ?? config.key
  }

  let orientation: "horizontal" | "vertical" = "horizontal"

  if (c_span == 1 && r_span > 1) {
    orientation = "vertical"
  }

  return (
    <MonitorDialog type="container" dbKey={dbKey}>
      <BaseTile
        r_span={r_span}
        c_span={c_span}
        status={status}
        title={title}
        orientation={orientation}
        icon={config.icon}
        top_right_icon="mdi:docker"
      />
    </MonitorDialog>
  )
}

"use client"

import { useSelectionBounds } from "@/hooks/use-selection-bounds"
import { useSelf, useStorage } from "@/liveblocks.config"
import { LayerType, Side, XYHW } from "@/types/canvas"
import { memo } from "react"

interface SelectionBoxProps {
  onResizeHandlePointerDown: (corner: Side, initialBound: XYHW) => void
}

const HANDLE_WIDTH = 8

export const SelectionBox = memo(({ onResizeHandlePointerDown }: SelectionBoxProps) => {
  const soleLayerId = useSelf((me) => me.presence.selection.length === 1 ? me.presence.selection[0] : null)

  const isShowingHandles = useStorage((root) => soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path)

  const bounds = useSelectionBounds();

  if (!bounds) {
    return null
  }

  const leftXAxysCursor = bounds.x - HANDLE_WIDTH / 2
  const centerXAxysCursor = bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2
  const rightXAxysCursor = bounds.x + bounds.width - HANDLE_WIDTH / 2
  const upperYAxysCursor = bounds.y - HANDLE_WIDTH / 2
  const centerYAxysCursor = bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2
  const bottomYAxysCursor = bounds.y + bounds.height - HANDLE_WIDTH / 2

  return (
    <>
      <rect
        className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
        style={{ transform: `translate(${bounds.x}px, ${bounds.y}px)` }}
        x={0}
        y={0}
        width={bounds.width}
        height={bounds.height}
      />
      {isShowingHandles && (
        <>
          {/* upper left */}
          <rect
            className="fill-white stroke-blue-500 stroke-1"
            style={{
              cursor: 'nw-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(${leftXAxysCursor}px, ${upperYAxysCursor}px)`
            }}
            x={0}
            y={0}
            onPointerDown={(e) => {
              e.stopPropagation()
              onResizeHandlePointerDown(Side.Top + Side.Left, bounds)
            }}
          />
          {/* upper center */}
          <rect
            className="fill-white stroke-blue-500 stroke-1"
            style={{
              cursor: 'n-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(${centerXAxysCursor}px, ${upperYAxysCursor}px)`
            }}
            x={0}
            y={0}
            onPointerDown={(e) => {
              e.stopPropagation()
              onResizeHandlePointerDown(Side.Top, bounds)
            }}
          />
          {/* upper right */}
          <rect
            className="fill-white stroke-blue-500 stroke-1"
            style={{
              cursor: 'ne-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(${rightXAxysCursor}px, ${upperYAxysCursor}px)`
            }}
            x={0}
            y={0}
            onPointerDown={(e) => {
              e.stopPropagation()
              onResizeHandlePointerDown(Side.Top + Side.Right, bounds)
            }}
          />
          {/* center left */}
          <rect
            className="fill-white stroke-blue-500 stroke-1"
            style={{
              cursor: 'w-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(${leftXAxysCursor}px, ${centerYAxysCursor}px)`
            }}
            x={0}
            y={0}
            onPointerDown={(e) => {
              e.stopPropagation()
              onResizeHandlePointerDown(Side.Left, bounds)
            }}
          />
          {/* center right */}
          <rect
            className="fill-white stroke-blue-500 stroke-1"
            style={{
              cursor: 'e-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(${rightXAxysCursor}px, ${centerYAxysCursor}px)`
            }}
            x={0}
            y={0}
            onPointerDown={(e) => {
              e.stopPropagation()
              onResizeHandlePointerDown(Side.Right, bounds)
            }}
          />
          {/* bottom left */}
          <rect
            className="fill-white stroke-blue-500 stroke-1"
            style={{
              cursor: 'nesw-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(${leftXAxysCursor}px, ${bottomYAxysCursor}px)`
            }}
            x={0}
            y={0}
            onPointerDown={(e) => {
              e.stopPropagation()
              onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds)
            }}
          />
          {/* bottom center */}
          <rect
            className="fill-white stroke-blue-500 stroke-1"
            style={{
              cursor: 'ns-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(${centerXAxysCursor}px, ${bottomYAxysCursor}px)`
            }}
            x={0}
            y={0}
            onPointerDown={(e) => {
              e.stopPropagation()
              onResizeHandlePointerDown(Side.Bottom, bounds)
            }}
          />
          {/* bottom right */}
          <rect
            className="fill-white stroke-blue-500 stroke-1"
            style={{
              cursor: 'nwse-resize',
              width: `${HANDLE_WIDTH}px`,
              height: `${HANDLE_WIDTH}px`,
              transform: `translate(${rightXAxysCursor}px, ${bottomYAxysCursor}px)`
            }}
            x={0}
            y={0}
            onPointerDown={(e) => {
              e.stopPropagation()
              onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds)
            }}
          />
        </>
      )}
    </>
  )
})

SelectionBox.displayName = 'SelectionBox'
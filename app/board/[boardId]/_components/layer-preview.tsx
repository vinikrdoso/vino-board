"use client"

import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/types/canvas";
import { memo } from "react";
import { Rectangle } from "./rectangle-layer";
import { Ellipse } from "./ellipse-layer";
import { Text } from "./text-layer";
import { Note } from "./note-layer";

interface LayerPreviewProps {
  layerId: string
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string
}

export const LayerPreview = memo(({ layerId, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
  const layer = useStorage((root) => root.layers.get(layerId))

  if (!layer) return null

  switch (layer.type) {
    case LayerType.Note:
      return (
        <Note
          id={layerId}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      )
    case LayerType.Text:
      return (
        <Text
          id={layerId}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      )
    case LayerType.Ellipse:
      return (
        <Ellipse
          id={layerId}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      )
    case LayerType.Rectangle:
      return (
        <Rectangle
          id={layerId}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      )
    default:
      console.warn('Unknown layer type')
      return null
  }
})

LayerPreview.displayName = 'LayerPreview'
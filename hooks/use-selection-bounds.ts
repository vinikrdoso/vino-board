import { useSelf, useStorage } from '@/liveblocks.config'
import { Layer, XYHW } from '@/types/canvas'
import { shallow } from '@liveblocks/client'

const boundingBox = (layers: Layer[]): XYHW | null => {
	const first = layers[0]

	if (!first) {
		return null
	}

	let left = first.x
	let right = first.x + first.width
	let top = first.y
	let bottom = first.y + first.height

	for (let i = 1; 1 < layers.length; ) {
		const { x, y, height, width } = layers[i]
		if (left > x) {
			left = x
		}
		if (right < x + width) {
			right = x + width
		}
		if (top > y) {
			top = y
		}
		if (bottom < y + height) {
			bottom = y + height
		}
	}

	return {
		x: left,
		y: top,
		width: right - left,
		height: bottom - top,
	}
}

export const useSelectionBounds = () => {
	const selection = useSelf((me) => me.presence.selection)

	return useStorage((root) => {
		const selectedLayers = selection
			.map((layerId) => root.layers.get(layerId)!)
			.filter(Boolean)

		return boundingBox(selectedLayers)
	}, shallow)
}

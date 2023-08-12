import { Segment } from '../hooks/DataContext'

export const generateSegmentUrl = (segment: Segment) => {
	return segment.type === 'item'
		? `/item?id=${segment.id}`
		: `/search?keyword=${encodeURIComponent(segment.id)}`
}

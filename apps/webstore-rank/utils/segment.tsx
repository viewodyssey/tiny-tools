import { Segment } from '../hooks/DataContext'
import { BASEPATH } from './misc'

export const generateSegmentUrl = (segment: Segment) => {
	return segment.type === 'item'
		? `${BASEPATH}/item?id=${segment.id}`
		: `${BASEPATH}/search?keyword=${encodeURIComponent(segment.id)}`
}

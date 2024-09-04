import { useState, useMemo } from 'react'
import { Item } from './Item'
import { Task } from 'src/utils/types'

type Props = {
	items: Task[]
	onDelete: (id: Task['id']) => void
	onToggle: (id: Task['id']) => void
}

export const List = ({ items, onDelete, onToggle }: Props) => {
	const [filter, setFilter] = useState<boolean>(false)

	const filteredItems = useMemo(() => {
		return filter ? items.filter(item => !item.done) : items
	}, [filter, items])

	const toggleFilter = () => setFilter(prevFilter => !prevFilter)

	const getButtonText = () => {
		return filter ? 'Все задачи' : 'Невыполненные задачи'
	}

	const buttonClass = `button ${filter ? 'button-all' : 'button-active'}`

	return (
		<>
			<button onClick={toggleFilter} className={buttonClass}>
				{getButtonText()}
			</button>
			<ul className='task-list tasks' data-testid='task-list'>
				{filteredItems.map(item => (
					<Item
						{...item}
						key={item.id}
						onDelete={onDelete}
						onToggle={onToggle}
					/>
				))}
			</ul>
		</>
	)
}

import ue from '@testing-library/user-event'
import { App } from '../../src/App'
import { List } from '../../src/components/List'

import { render, screen } from '@testing-library/react'
import { Task } from 'src/utils/types'

const userEvent = ue.setup({
	advanceTimers: jest.advanceTimersByTime
})

describe('Список задач', () => {
	it('С включенным фильтром', async () => {
		const onDelete = jest.fn()
		const onToggle = jest.fn()

		const items: Task[] = [
			{ id: '325235', header: 'убраться дома', done: false },
			{ id: '22377', header: 'приготовить ужин', done: false },
			{ id: '42', header: 'выполнить дз', done: false }
		]

		render(<App />)
		const { rerender, asFragment } = render(
			<List items={items} onDelete={onDelete} onToggle={onToggle} />
		)

		const screenFirstRender = asFragment()

		await userEvent.click(screen.getByText(/Невыполненные задачи/i))

		expect(screen.queryByText('доделать отчет по работе')).toBeNull()

		rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />)

		const screenSecondRender = asFragment()

		expect(screen.queryByText('доделать отчет по работе')).toBeNull()
		expect(screen.getByText('убраться дома')).toBeInTheDocument()
		expect(screen.getByText('выполнить дз')).toBeInTheDocument()
		expect(screen.getByText('приготовить ужин')).toBeInTheDocument()

		expect(screenFirstRender).toMatchDiffSnapshot(screenSecondRender)
	})

	it('C выключенным фильтром', async () => {
		const onDelete = jest.fn()
		const onToggle = jest.fn()

		const items: Task[] = [
			{ id: '325235', header: 'убраться дома', done: true },
			{ id: '22377', header: 'приготовить ужин', done: false },
			{ id: '42', header: 'выполнить дз', done: true }
		]

		render(<List items={items} onDelete={onDelete} onToggle={onToggle} />)

		await userEvent.click(screen.getByText(/Невыполненные задачи/i))

		expect(screen.queryByText('убраться дома')).toBeNull()
		expect(screen.queryByText('выполнить дз')).toBeNull()

		await userEvent.click(screen.getByText(/Все задачи/i))

		expect(screen.getByText('убраться дома')).toBeInTheDocument()
		expect(screen.getByText('приготовить ужин')).toBeInTheDocument()
		expect(screen.getByText('выполнить дз')).toBeInTheDocument()
	})
})

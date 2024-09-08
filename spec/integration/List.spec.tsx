import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from 'src/store/configureStore'
import { List } from 'src/components/List'
import { addTask } from 'src/store/taskSlice'
import { Task } from 'src/utils/types'

describe('Интеграционный тест для списка задач', () => {
	it('Список не содержит больше 10 невыполненных задач', () => {
		const onDelete = jest.fn()
		const onToggle = jest.fn()

		const initialTasks: Task[] = [
			...Array.from({ length: 10 }, (_, i) => ({
				id: `task${i + 1}`,
				header: `Задача ${i + 1}`,
				done: false
			})),
			{ id: 'task11', header: 'Задача 11', done: true },
			{ id: 'task12', header: 'Задача 12', done: true }
		]

		initialTasks.forEach(task => store.dispatch(addTask(task.header)))

		render(
			<Provider store={store}>
				<List items={initialTasks} onDelete={onDelete} onToggle={onToggle} />
			</Provider>
		)

		store.dispatch(addTask('Новая задача'))

		const listItems = screen.getAllByRole('listitem')
		const uncompletedTasks = listItems.filter(
			item =>
				!(item.querySelector('input[type="checkbox"]') as HTMLInputElement)
					.checked
		)

		expect(uncompletedTasks.length).toBe(10)

		expect(store.getState().taskList.notification).toBe(
			'Невозможно добавить больше 10 невыполненных задач'
		)
	})
})

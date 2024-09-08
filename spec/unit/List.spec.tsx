import { render, screen } from '@testing-library/react'
import { List } from 'src/components/List'
import { Task } from 'src/utils/types'

it('отображение списка задач', () => {
	const onDelete = jest.fn()
	const onToggle = jest.fn()

	const items: Task[] = [
		{
			id: '1',
			header: 'купить хлеб',
			done: false
		},
		{
			id: '2',
			header: 'купить молоко',
			done: false
		},
		{
			id: '3',
			header: 'выгулять собаку',
			done: true
		}
	]

	const { rerender, asFragment } = render(
		<List items={items} onDelete={onDelete} onToggle={onToggle} />
	)
	const firstRender = asFragment()

	items.pop()

	rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />)
	const secondRender = asFragment()

	expect(firstRender).toMatchDiffSnapshot(secondRender)
})

it('Список содержит не больше 10 невыполненных задач', () => {
	const onDelete = jest.fn()
	const onToggle = jest.fn()

	const items: Task[] = [
		{ id: 'a1b2c3', header: 'Сделать покупку', done: false },
		{ id: 'd4e5f6', header: 'Позвонить врачу', done: false },
		{ id: 'g7h8i9', header: 'Закончить проект', done: true },
		{ id: 'j0k1l2', header: 'Оплатить счета', done: false },
		{ id: 'm3n4o5', header: 'Убраться в квартире', done: false },
		{ id: 'p6q7r8', header: 'Прочитать книгу', done: false },
		{ id: 's9t0u1', header: 'Написать отчет', done: false },
		{ id: 'v2w3x4', header: 'Подготовить презентацию', done: false },
		{ id: 'y5z6a7', header: 'Запланировать отпуск', done: false },
		{ id: 'b8c9d0', header: 'Купить подарок', done: false },
		{ id: 'e1f2g3', header: 'Посмотреть фильм', done: true },
		{ id: 'h4i5j6', header: 'Сделать зарядку', done: false }
	]

	render(<List items={items} onDelete={onDelete} onToggle={onToggle} />)

	const listItems = screen.getAllByRole('listitem')

	const uncompletedTasks = listItems.filter(
		item =>
			!(item.querySelector('input[type="checkbox"]') as HTMLInputElement)
				.checked
	)

	expect(uncompletedTasks.length).toBeLessThanOrEqual(10)
})

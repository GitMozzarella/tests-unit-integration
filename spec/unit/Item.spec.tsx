import { render, screen } from '@testing-library/react'
import { Item } from 'src/components/Item'
import { Task } from 'src/utils/types'
describe('Элемент списка задач', () => {
	const onDelete = jest.fn()
	const onToggle = jest.fn()

	const task = { id: '42', header: 'Приготовить ужин', done: true }

	it('название не должно быть больше 32 символов', () => {
		render(<Item {...task} onDelete={onDelete} onToggle={onToggle} />)
		expect(screen.getByText(task.header)).toHaveTextContent(/^.{0,32}$/)
	})
	it.todo('название не должно быть пустым')
	it.todo('нельзя удалять невыполненные задачи')
})

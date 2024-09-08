import { render, screen } from '@testing-library/react'
import { Item } from 'src/components/Item'
import { Task } from 'src/utils/types'
describe('Элемент списка задач', () => {
	const onDelete = jest.fn()
	const onToggle = jest.fn()

	const task = { id: '42', header: 'Приготовить ужин', done: false }

	it('название не должно быть больше 32 символов', () => {
		render(<Item {...task} onDelete={onDelete} onToggle={onToggle} />)
		expect(screen.getByText(task.header)).toHaveTextContent(/^.{0,32}$/)
	})
	it('название не должно быть пустым', () => {
		render(<Item {...task} onDelete={onDelete} onToggle={onToggle} />)
		expect(screen.getByText(task.header)).not.toBeEmptyDOMElement() // проверяем на пустое название
	})
	it('нельзя удалять невыполненные задачи', () => {
		render(<Item {...task} onDelete={onDelete} onToggle={onToggle} />)
		const deleteButton = screen.getByRole('button')
		expect(deleteButton).toBeDisabled() //кнопка удаления должна быть недоступна
	})
	it('при клике на задачу вызывается onToggle', () => {
		render(<Item {...task} onDelete={onDelete} onToggle={onToggle} />)

		const label = screen.getByLabelText(task.header)
		label.click()

		expect(onToggle).toHaveBeenCalledWith(task.id)
	})
})

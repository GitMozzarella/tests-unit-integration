import { render, screen } from '@testing-library/react'
import { Notifier } from 'src/components/Notifier'

describe('Оповещение при выполнении задачи', () => {
	it('при выполнении задачи должно появляться оповещение', () => {
		const onClose = jest.fn()
		render(<Notifier task='Прочитать ТЗ' open={true} onClose={onClose} />)
		expect(screen.getByText('Прочитать ТЗ')).toBeInTheDocument()
	})

	it('одновременно может быть только одно оповещение', () => {
		const onClose = jest.fn()
		const { rerender } = render(
			<Notifier task='Прочитать ТЗ' open={true} onClose={onClose} />
		)
		rerender(<Notifier task='Приготовить ужин' open={true} onClose={onClose} />)
		expect(screen.getByText('Приготовить ужин')).toBeInTheDocument()
		expect(screen.queryByText('Прочитать ТЗ')).not.toBeInTheDocument()
	})
})

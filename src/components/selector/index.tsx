import { MdRemoveCircleOutline } from 'react-icons/md'
import { useKey } from 'react-use'
import { useStore } from '../../util'
import styles from './.module.css'

const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

const Selector = () => {
	const selected = useStore((s) => s.selected)
	const setSelected = useStore((s) => s.setSelected)

	useKey(({ key }) => {
		const number = Number(key)
		if (number > -1 && number < 10) {
			setSelected(Number(key))
		}

		if (key === 'Backspace') {
			setSelected(0)
		}

		if (key === '-' || key === 'ArrowLeft') {
			setSelected((((selected - 1) % 10) + 10) % 10)
		}

		if (key === '+' || key === '=' || key === 'ArrowRight') {
			setSelected((selected + 1) % 10)
		}

		if (key === 'ArrowUp') {
			setSelected((((selected - 5) % 10) + 10) % 10)
		}

		if (key === 'ArrowDown') {
			setSelected((selected + 5) % 10)
		}

		return false
	})

	const count: {
		[key: number]: number
	} = {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
		6: 0,
		7: 0,
		8: 0,
		9: 0,
		0: 0,
	}

	Array.from(useStore((s) => s.board).values()).forEach(({ value }) => {
		count[value || 0] += 1
	})
	return (
		<div className={styles.grid}>
			{buttons.map((b) => {
				const val = Number(b) || 0
				return (
					<button
						key={b}
						name={b}
						type="submit"
						className={`${selected === val ? styles.icon_active : styles.icon}`}
						onClick={() => setSelected(val)}
					>
						{val || <MdRemoveCircleOutline />}
						<div className={styles.quantity}>
							{((val ? 9 : 0) - count[val || 0]) * (val ? 1 : -1) || ''}
						</div>
					</button>
				)
			})}
		</div>
	)
}

export default Selector

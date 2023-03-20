import { useStore, invalidSpot } from '../../util'
import Tile from '../tile'
import styles from './.module.css'

const Board = () => {
	const selected = useStore((s) => s.selected)
	const board = useStore((s) => s.board)
	const keys = Array.from(board)

	const countAt = (i: number) => {
		const tile = keys[i][1]
		if (!tile) {
			return 0
		}

		let count = 0
		for (let j = i - 1; j >= 0; j -= 1) {
			const [_key, t] = keys[j]
			if (t && t.value === tile.value) {
				count += 1
			}
		}

		return count
	}

	const countAtLocked = (i: number) => {
		const tile = keys[i][1]
		if (!tile) {
			return 0
		}

		let count = 0
		for (let j = i - 1; j >= 0; j -= 1) {
			const [_key, t] = keys[j]
			if (t && t.locked) {
				count += 1
			}
		}

		return count
	}

	return (
		<div className={styles.board}>
			{keys.map(
				([key, tile], i) =>
					tile && (
						<Tile
							key={key}
							id={key}
							selected={selected === tile.value}
							tile={tile}
							count={countAt(i)}
							lockCount={countAtLocked(i)}
							valid={invalidSpot(board, key, selected)}
						/>
					),
			)}
			<div
				className={styles.overlay}
				style={{
					flexDirection: 'column',
				}}
			>
				<span />
				<span className={styles.horz} />
				<span className={styles.horz} />
				<span />
			</div>
			<div className={styles.overlay}>
				<span />
				<span className={styles.vert} />
				<span className={styles.vert} />
				<span />
			</div>
		</div>
	)
}

export default Board

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { PRIMARY } from '../../App'
import { Tile, useStore } from '../../util'
import styles from './.module.css'

const Tile = ({
	tile,
	selected,
	count,
	lockCount,
	id,
	valid,
}: {
	tile: Tile
	selected: boolean
	count: number
	lockCount: number
	id: string
	valid: boolean
}) => {
	const setTile = useStore((s) => s.setTile)
	const [click, setClick] = useState(true)

	useEffect(() => {
		setClick(false)
	}, [selected])
	return (
		<div className={styles.container}>
			<motion.div
				className={styles.circle}
				initial="none"
				variants={{
					selected: {
						background: PRIMARY + 90,
						scale: 1,
						transition: {
							delay: click ? 0 : count * 0.05,
						},
					},
					none: { background: '#0000000', scale: 0 },
				}}
				animate={selected ? 'selected' : 'none'}
			/>
			{tile.locked && (
				<motion.div
					className={styles.circle}
					initial="none"
					animate="locked"
					variants={{
						locked: { background: PRIMARY + 20, scale: 1 },
						none: { background: '#0000000', scale: 0 },
					}}
					transition={{
						delay: lockCount * 0.05,
					}}
				/>
			)}
			<motion.button
				variants={{
					selected: { color: ['#dddddd'] },
					locked: { color: '#bbbbbb' },
					none: { color: '#ffffff' },
				}}
				animate={selected ? 'selected' : tile.locked ? 'locked' : 'none'}
				transition={{
					delay: click ? 0 : count * 0.05,
					duration: 1,
				}}
				type="button"
				className={styles.tile}
				onClick={() => {
					setClick(true)
					setTile(id)
					console.log(tile)
				}}
			>
				{tile.value ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,
						}}
						transition={{
							delay: 0.1,
						}}
					>
						{tile.value}
					</motion.div>
				) : (
					<div className={styles.notes} />
				)}
				<div className={styles.delimiter} />
			</motion.button>
		</div>
	)
}

export default Tile

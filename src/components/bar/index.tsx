import { useState } from 'react'
import { MdArrowBack, MdPalette } from 'react-icons/md'
import { useInterval } from 'react-use'
import { Duration } from 'luxon'
import styles from './.module.css'

const Bar = () => {
	const [timer, setTimer] = useState(0)

	useInterval(() => {
		setTimer(timer + 1)
	}, 1000)

	return (
		<>
			<header className={styles.nav}>
				<button type="button" className={styles.icon} name="Back">
					<MdArrowBack />
				</button>
				<span className={styles.timer}>
					{Duration.fromMillis(timer * 1000).toFormat(
						timer > 3599 ? 'hh:mm:ss' : 'mm:ss',
					)}
				</span>
				<button type="button" className={styles.icon} name="Theme">
					<MdPalette />
				</button>
			</header>
			<div className={styles.spacer} />
		</>
	)
}

export default Bar

import { MdCheck, MdEdit, MdReplay, MdUndo } from 'react-icons/md'
import { useStore } from '../../util'
import styles from './.module.css'

const Nav = () => {
	const { undo, redo, clear } = useStore.temporal.getState()

	return (
		<div className={styles.nav}>
			<button type="button" className={styles.button} name="Replay">
				<MdReplay />
			</button>
			<button type="button" className={styles.button} name="Check">
				<MdCheck />
			</button>
			<button type="button" className={styles.button} name="Edit">
				<MdEdit />
			</button>
			<button type="button" className={styles.button} name="Undo">
				<MdUndo />
			</button>
		</div>
	)
}

export default Nav

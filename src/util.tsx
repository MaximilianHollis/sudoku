import { nanoid } from 'nanoid'
import { create } from 'zustand'
import { temporal } from 'zundo'
import { devtools } from 'zustand/middleware'

const preset = [
	[0, 0, 3, 0, 2, 0, 6, 0, 0],
	[9, 0, 0, 3, 0, 5, 0, 0, 1],
	[0, 0, 1, 8, 0, 6, 4, 0, 0],
	[0, 0, 8, 1, 0, 2, 9, 0, 0],
	[7, 0, 0, 0, 0, 0, 0, 0, 8],
	[0, 0, 6, 7, 0, 8, 2, 0, 0],
	[0, 0, 2, 6, 0, 9, 5, 0, 0],
	[8, 0, 0, 2, 0, 3, 0, 0, 9],
	[0, 0, 5, 0, 1, 0, 3, 0, 0],
].flat()

export interface Tile {
	value: number | null
	notes: number[]
	locked: boolean
	i: number
	row: number
	column: number
	box: number
}

export type Board = Map<string, Tile>

const createBoard = () => {
	const board: Board = new Map()
	const tiles = new Array(81).fill(0).map(() => nanoid())

	tiles.forEach((t, i) => {
		const val = preset[i] || null
		board.set(t, {
			locked: !!val,
			notes: [],
			value: val,
			i,
			row: Math.floor(i / 9),
			column: i % 9,
			box: Math.floor(Math.floor(i / 9) / 3) * 3 + Math.floor((i % 9) / 3),
		})
	})
	return board
}

export const mod = (n: number, m: number) => ((n % m) + m) % m

export const isRelated = (x: Tile, y: Tile) =>
	x.box === y.box || x.column === y.column || x.row === y.row

export const invalidSpot = (board: Board, key: string, value: number) => {
	if (value < 1) {
		return false
	}

	const tile = board.get(key)
	if (!tile || tile.locked || tile.value) {
		return false
	}

	return !!Array.from(board)
		.map(([_k, v]) => v)
		.filter((t) => isRelated(t, tile))
		.find((t) => t.value === tile.value)
}

interface Store {
	selected: number
	setSelected: (selected: number) => void
	board: Board
	generateBoard: () => void
	clearBoard: () => void
	setTile: (key: string, number?: number) => void
	setNote: (key: string, note: number) => void
}

export const useStore = create<Store>()(
	devtools(
		temporal(
			/* Persist( */
			(set, get) => ({
				selected: -1,
				setSelected: (selected: number) =>
					set((state) =>
						state.selected === selected ? { selected: -1 } : { selected },
					),
				board: createBoard(),
				generateBoard() {
					set({ board: createBoard() })
				},
				clearBoard() {
					set((state) => {
						const board = new Map(state.board)
						board.forEach((tile, key) => {
							if (!tile.locked) {
								board.set(key, { ...tile, value: null })
							}
						})
						return { board }
					})
				},
				setTile(key: string, number?: number) {
					set((state) => {
						const board = new Map(state.board)
						if (!number) {
							if (state.selected > 0) {
								number = state.selected
							}
						}

						const tile = board.get(key)
						if (!tile || tile.locked) {
							return { board }
						}

						board.set(key, {
							...tile,
							value: number && tile.value !== number ? number : null,
						})
						return { board }
					})
				},
				setNote(key: string, note: number) {
					set((state) => {
						const board = new Map(state.board)
						const tile = board.get(key)
						if (!tile) {
							return { board }
						}

						const { notes } = tile
						board.set(key, {
							...tile,
							notes: tile.notes.includes(note)
								? tile.notes.filter((n) => n !== note)
								: [...notes, note],
						})
						return { board }
					})
				},
			}),
			/* 			{
				name: 'store',
			},
		), */
			{
				limit: 10,
				partialize(state) {
					const { board, ..._rest } = state
					return { board }
				},
			},
		),
	),
)

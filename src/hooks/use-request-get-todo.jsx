import { useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectorSortByAlphabet, selectorSearchTodo } from '../selectors';
import { setLoader, setSortedTodos } from '../actions';

export const useRequestGetTodo = () => {
	const dispatch = useDispatch();
	const sortByAlphabet = useSelector(selectorSortByAlphabet);
	const searchTodo = useSelector(selectorSearchTodo);

	useEffect(() => {
		dispatch(setLoader(true));

		const requestDbRef = ref(db, 'todos');

		return onValue(requestDbRef, (snapshot) => {
			const loadedTodos = snapshot.val() || {};

			let tempSortedTodos = { ...loadedTodos };

			if (sortByAlphabet) {
				tempSortedTodos = Object.fromEntries(
					Object.entries(loadedTodos).sort(([, a], [, b]) =>
						a.title.localeCompare(b.title),
					),
				);
			}

			if (searchTodo) {
				tempSortedTodos = Object.fromEntries(
					Object.entries(tempSortedTodos).filter(([, todo]) =>
						todo.title.toLowerCase().includes(searchTodo.toLowerCase()),
					),
				);
			}

			dispatch(setSortedTodos(tempSortedTodos));

			dispatch(setLoader(false));
		});
	}, [sortByAlphabet, searchTodo]);
};

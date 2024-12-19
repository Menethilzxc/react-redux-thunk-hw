import { ref, set } from 'firebase/database';
import { db } from '../firebase';
import {
	selectorSelectedTodoId,
	selectorTodoText,
	selectorIsUpdating,
} from '../selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
	setErrorParagraph,
	setIsUpdating,
	setTodoText,
	setSelectedTodoId,
} from '../actions';

export const useRequestChangeTodo = () => {
	const dispatch = useDispatch();
	const selectedTodoId = useSelector(selectorSelectedTodoId);
	const todoText = useSelector(selectorTodoText);
	const isUpdating = useSelector(selectorIsUpdating);

	const requestChangeTodo = () => {
		if (!todoText.trim()) {
			dispatch(setErrorParagraph(true));
			return;
		}

		if (!selectedTodoId) {
			dispatch(setErrorParagraph(true));
			return;
		}

		dispatch(setIsUpdating(true));

		const changeDbRef = ref(db, `todos/${selectedTodoId}`);

		set(changeDbRef, {
			title: todoText,
		})
			.then(() => {
				dispatch(setTodoText(''));
				dispatch(setErrorParagraph(false));
				dispatch(setSelectedTodoId(null));
			})
			.finally(() => {
				dispatch(setIsUpdating(false));
				dispatch(setErrorParagraph(false));
			});
	};

	return { requestChangeTodo, isUpdating };
};

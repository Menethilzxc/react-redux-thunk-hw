import { ref, push } from 'firebase/database';
import { db } from '../firebase';
import { setErrorParagraph, setTodoText, setIsCreating } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectorIsCreating, selectorTodoText } from '../selectors';

export const useRequestAddTodo = (refreshTodo) => {
	const isCreating = useSelector(selectorIsCreating);
	const todoText = useSelector(selectorTodoText);
	const dispatch = useDispatch();

	const requestAddTodo = () => {
		if (!todoText.trim()) {
			dispatch(setErrorParagraph(true));
			return;
		}

		dispatch(setIsCreating(true));

		const todosDbRef = ref(db, 'todos');

		push(todosDbRef, {
			title: todoText,
		})
			.then(() => {
				refreshTodo();
				dispatch(setTodoText(''));
				dispatch(setErrorParagraph(false));
			})
			.finally(() => {
				dispatch(setIsCreating(false));
				dispatch(setErrorParagraph(false));
			});
	};

	return { requestAddTodo, isCreating };
};

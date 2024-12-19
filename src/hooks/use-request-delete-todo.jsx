import { ref, remove } from 'firebase/database';
import { db } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectorIsDeleting, selectorSelectedTodoId } from '../selectors';
import { setIsDeleting } from '../actions';

export const useRequestDeleteTodo = (refreshTodo) => {
	const dispatch = useDispatch();
	const isDeleting = useSelector(selectorIsDeleting);
	const selectedTodoId = useSelector(selectorSelectedTodoId);

	const requestDeleteTodo = () => {
		dispatch(setIsDeleting(true));

		const requestDeleteTodo = ref(db, `todos/${selectedTodoId}`);
		remove(requestDeleteTodo)
			.then(() => {
				refreshTodo();
			})
			.finally(() => {
				dispatch(setIsDeleting(false));
			});
	};

	return { requestDeleteTodo, isDeleting };
};

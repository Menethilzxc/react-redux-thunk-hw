import { useDispatch, useSelector } from 'react-redux';
import {
	selectorErorParagraph,
	selectorRefreshTodoFlag,
	selectorSearchTodo,
	selectorSelectedTodoId,
	selectorSortByAlphabet,
	selectorSortedTodos,
	selectorTodoText,
	selectorLoader,
} from './selectors';
import {
	setRefreshTodoFlag,
	setSearchTodo,
	setSelectedTodoId,
	setTodoText,
	setToggleSortByAlphabet,
} from './actions';
import {
	useRequestGetTodo,
	useRequestAddTodo,
	useRequestChangeTodo,
	useRequestDeleteTodo,
} from './hooks';
import styles from './App.module.css';

function App() {
	const dispatch = useDispatch();
	const errorParagraph = useSelector(selectorErorParagraph);
	const refreshTodoFlag = useSelector(selectorRefreshTodoFlag);
	const searchTodo = useSelector(selectorSearchTodo);
	const selectedTodoId = useSelector(selectorSelectedTodoId);
	const sortByAlphabet = useSelector(selectorSortByAlphabet);
	const sortedTodos = useSelector(selectorSortedTodos);
	const todoText = useSelector(selectorTodoText);
	const loader = useSelector(selectorLoader);

	const refreshTodo = () => setRefreshTodoFlag(!refreshTodoFlag);

	const onChange = ({ target }) => {
		dispatch(setTodoText(target.value));
	};

	const toggleSortByAlphabet = () => {
		dispatch(setToggleSortByAlphabet);
	};

	const hundleSearhTodo = ({ target }) => {
		setSearchTodo(target.value);
	};

	const selectTodo = (id) => {
		dispatch(setSelectedTodoId(id));
	};

	useRequestGetTodo(
		(todos) => todos.sort((a, b) => a.title.localeCompare(b.title)),
		(query, todos) =>
			todos.filter((todo) =>
				todo.title.toLowerCase().includes(query.toLowerCase()),
			),
	);

	const { requestAddTodo, isCreating } = useRequestAddTodo(refreshTodo);

	const { requestChangeTodo, isUpdating } = useRequestChangeTodo();

	const { requestDeleteTodo, isDeleting } = useRequestDeleteTodo(refreshTodo);

	return (
		<>
			<div className={styles.app}>
				<h1>Todo list</h1>
				{errorParagraph ? (
					<p style={{ color: 'red' }}>Поле не должно быть пустым</p>
				) : (
					''
				)}
				<input
					type="text"
					name="text"
					value={todoText}
					placeholder="Введите название дела"
					onChange={onChange}
				/>
				<div className={styles.crud}>
					<button onClick={requestAddTodo} disabled={isCreating}>
						Добавить дело
					</button>
					<button onClick={requestChangeTodo} disabled={isUpdating}>
						Изменить дело
					</button>
					<button
						onClick={requestDeleteTodo}
						disabled={
							!selectedTodoId || isDeleting || sortedTodos.length === 0
						}
					>
						Удалить дело
					</button>
				</div>
				<div className={styles.sortButton}>
					<button onClick={toggleSortByAlphabet}>
						{sortByAlphabet ? 'Включить сортировку' : 'Отключить сортировку'}
					</button>
				</div>

				<input
					type="text"
					placeholder="Поиск дела"
					value={searchTodo}
					onChange={hundleSearhTodo}
				/>

				<ol>
					{loader ? (
						<div className={styles.loader}></div>
					) : (
						sortedTodos &&
						Object.entries(sortedTodos).map(([id, { title }], index) => (
							<li
								key={id}
								onClick={() => selectTodo(id)}
								style={{
									background: selectedTodoId === id ? 'white' : '',
									color: selectedTodoId === id ? 'black' : '',
								}}
							>
								<span>{index + 1}.</span>

								{title}
							</li>
						))
					)}
				</ol>
			</div>
		</>
	);
}

export default App;

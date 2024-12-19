export const initialFirstState = {
	sortByAlphabet: false,
	searchTodo: '',
	sortedTodos: {},
	loader: true,
	todoText: '',
};

export const firstReducer = (state = initialFirstState, action) => {
	switch (action.type) {
		case 'TOGGLE_SORT':
			return {
				...state,
				sortByAlphabet: !state.sortByAlphabet,
			};
		case 'SET_SEARCH_TODO':
			return {
				...state,
				searchTodo: action.payload,
			};
		case 'SET_SORTED_TODOS':
			return {
				...state,
				sortedTodos: action.payload,
			};
		case 'SET_LOADER':
			return {
				...state,
				loader: action.payload,
			};
		case 'SET_TODO_TEXT':
			return {
				...state,
				todoText: action.payload,
			};
		default:
			return state;
	}
};

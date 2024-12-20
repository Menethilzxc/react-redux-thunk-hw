export const initialSecondState = {
	selectedTodoId: null,
	refreshTodoFlag: false,
	errorParagraph: false,
	isDeleting: true,
	isUpdating: false,
	isCreating: false,
};

export const secondReducer = (state = initialSecondState, action) => {
	switch (action.type) {
		case 'SET_SELECTED_TODO_ID':
			return {
				...state,
				selectedTodoId: action.payload,
			};
		case 'SET_REFRESH_TODO_FLAG':
			return {
				...state,
				refreshTodoFlag: !state.refreshTodoFlag,
			};
		case 'SET_IS_DELETING':
			return {
				...state,
				isDeleting: action.payload,
			};
		case 'SET_IS_UPDATING':
			return {
				...state,
				isUpdating: action.payload,
			};
		case 'SET_IS_CREATING':
			return {
				...state,
				isCreating: action.payload,
			};
		case 'SET_ERROR_PARAGRAPH':
			return {
				...state,
				errorParagraph: action.payload,
			};
		default:
			return state;
	}
};

export const ADD_WIDGET = "ADD_WIDGET";
export const REMOVE_WIDGET = "REMOVE_WIDGET";

export const addWidget = (categoryIndex,widget) => ({
    type: ADD_WIDGET,
    payload: {
        categoryIndex,
        widget
    }
});

export const removeWidget = (categoryIndex, widgetIndex) => ({
    type: REMOVE_WIDGET,
    payload: {
        categoryIndex,
        widgetIndex
    }
});
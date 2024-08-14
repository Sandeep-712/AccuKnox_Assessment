// reducer.js
import { ADD_WIDGET, REMOVE_WIDGET } from './action';

const initialState = {
    categories: [
        {
            name: "CSPM Executive Dashboard",
            widgets: [
                {
                    name: "Widget 1",
                    text: "Random Text 1"
                },
                {
                    name: "Widget 2",
                    text: "Random Text 2"
                }
            ]
        },
        {
            name: "CWPP Dashboard",
            widgets: [
                {
                    name: "Widget 1",
                    text: "Random Text 1"
                },
                {
                    name:'Widget 2',
                    text:'Random Text 2'
                }
            ]
        },
        {
            name:"Registry Scan",
            widgets:[
                {
                    name:"Widget 1",
                    text:"Random Text 1"
                },
                {
                    name:'Widget 2',
                    text:'Random Text 2'
                }
            ]
        }
    ]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_WIDGET:
            return {
                ...state,
                categories: state.categories.map((category, index) =>
                    index === parseInt(action.payload.categoryIndex)
                        ? {
                            ...category,
                            widgets: [...category.widgets, action.payload.widget]
                        }
                        : category
                )
            };

        case REMOVE_WIDGET:
            return {
                ...state,
                categories: state.categories.map((category, index) =>
                    index === action.payload.categoryIndex
                        ? {
                            ...category,
                            widgets: category.widgets.filter((_, idx) => idx !== action.payload.widgetIndex)
                        }
                        : category
                )
            };

        default:
            return state;
    }
};

export default reducer;

import { initialState } from "./initialState";

const shopOperations = (state = initialState, action) => {
  switch (action.type) {
    case "DECREMENT_ITEM": {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case "INCREMENT_ITEM": {
      const newItems = state.items.slice(0, -1);
      return {
        ...state,
        items: newItems,
      };
    }
  }
};

import { createSlice } from "@reduxjs/toolkit";

export const thingsToBuySlice = createSlice({
  name: "thingsToBuy",
  initialState: {
    isSaving: false,
    messageSaved: "",
    groups: [],
    items: [],
    activeGroup: null,
    activeItem: null,
    // activeGroup: {
    //     id: '123456',
    //     title: 'Peña de los vagos',
    //     note: 'Festejamos cumple de Juanga',
    //     date: 123456,
    //     items: [
    //         {
    //             id: '123456',
    //             text: 'Comprar pan'
    //         },
    //         {
    //             id: '123455',
    //             text: 'Comprar ensalada'
    //         }
    //     ]
    // }
  },
  reducers: {
    savingNewGroup: (state) => {
      state.isSaving = true;
    },
    savingNewItem: (state) => {
      state.isSaving = true;
    },
    addNewEmptyGroup: (state, action) => {
      state.groups.push(action.payload);
      state.isSaving = false;
    },
    addNewEmptyItem: (state, action) => {
      state.items.push(action.payload);
      state.isSaving = false;
    },
    setActiveGroup: (state, action) => {
      state.activeGroup = action.payload;
    },
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setActiveItem: (state, action) => {
      state.activeItem = action.payload;
    },
    setNewItemToBuy: (state, action) => {},
    setSavingItemToBuy: (state) => {},
    updateItemToBuy: (state, action) => {},
    deleteItemById: (state, action) => {},
    deleteGroupById: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyGroup,
  setActiveItem,
  addNewEmptyItem,
  savingNewItem,
  setItems,
  setActiveGroup,
  setNewItemToBuy,
  setSavingItemToBuy,
  updateItemToBuy,
  deleteItemById,
  setGroups,
  deleteGroupById,
  savingNewGroup,
} = thingsToBuySlice.actions;

import { createSlice } from "@reduxjs/toolkit";

export const thingsToBuySlice = createSlice({
  name: "thingsToBuy",
  initialState: {
    isSaving: false,
    isDeleting: false,
    messageSaved: "",
    groups: [],
    items: [],
    user: [],
    userFound: true,
    activeGroup: null,
    activeItem: null,
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
    setUsers: (state, action) => {
      state.user = action.payload;
    },
    setActiveItem: (state, action) => {
      state.activeItem = action.payload;
    },
    setUserFound: (state, action) => {
      state.userFound = action.payload;
    },
    setNewItemToBuy: (state, action) => {},
    setSavingItemToBuy: (state) => {},
    updateItemToBuy: (state, action) => {},
    deleteItemById: (state, action) => {
      state.isDeleting = false;
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    deleteGroupById: (state, action) => {
      state.groups = state.groups.filter((group) => group.id !== action.payload);
    },
    deletingItem: (state, action) => {
      state.isDeleting = true;
    },
    cancelDeleting: (state) => {
      state.activeItem = null;
      state.activeGroup = null;
    },
    navigateToMenu: (state) => {
      state.activeGroup = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserFound,
  setUsers,
  navigateToMenu,
  cancelDeleting,
  deletingItem,
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

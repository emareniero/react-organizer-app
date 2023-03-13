import { createSlice } from "@reduxjs/toolkit";

export const thingsToBuySlice = createSlice({
  name: "thingsToBuy",
  initialState: {
    isSaving: false,
    isDeleting: false,
    isChecked: false,
    isInviting: false,
    messageSaved: "",
    groups: [],
    invitations: [],
    items: [],
    user: [],
    updatingItem: null,
    userFound: true,
    activeGroupId: null,
    groupAdminId: null,
    activeItemId: null,
  },
  reducers: {
    savingNewGroup: (state) => {
      state.isSaving = true;
    },
    userInvitation: (state, action) => {
      state.isInviting = true
    },
    userInvitationCancel: ( state ) => {
      state.isInviting = false
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
    setUpdatingItem: (state, action) => {
      state.activeGroupId = state.groups.filter((group) => group.id === action.payload);
    },
    updateItem: (state, action) => {
      state.items.push(action.payload);
    },
    setActiveGroup: (state, action) => {
      state.activeGroupId = action.payload
    },
    setActiveAdminGroupId: (state, action) => {
      state.groupAdminId = action.payload
    },
    setGroups: (state, action) => {
      state.groups = action.payload;
      // state.groups.push(action.payload)
    },
    setInvitations: (state, action) => {
      state.invitations = action.payload
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setUsers: (state, action) => {
      state.user = action.payload;
    },
    setActiveItem: (state, action) => {
      state.activeItemId = action.payload;
      // state.activeItem = state.items.filter((item) => item.id === action.payload)
    },
    setUpdatingItem: (state, action) => {
      state.updatingItem = state.items.filter((item) => item.id === action.payload);
    },
    setUserFound: (state, action) => {
      state.userFound = action.payload;
    },
    deleteItemById: (state, action) => {
      state.isDeleting = false;
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    deleteGroupById: (state, action) => {
      state.groups = state.groups.filter((group) => group.id !== action.payload);
      state.activeGroupId = null
    },
    deletingItem: (state, action) => {
      state.isDeleting = true;
      state.activeItemId = action.payload;
    },
    deletingGroup: (state, action) => {
      state.isDeleting = true;
      state.activeGroupId = action.payload;
    },
    cancelDeleting: (state, action) => {
      state.isDeleting = false;
      state.activeItemId = null;
      state.activeGroupId = null;
    },
    setItemChecked: (state, action) => {
      state.isChecked = true;
      state.activeItemId = action.payload;
    },
    setItemUnchecked: (state, action) => {
      state.isChecked = false;
      state.activeItemId = null;
    },
    navigateToMenu: (state) => {
      state.activeGroupId = null;
      state.activeItemId = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setActiveAdminGroupId,
  setInvitations,
  userInvitationCancel,
  userInvitation,
  deletingGroup,
  setUpdatingItem,
  setItemUnchecked,
  setItemChecked,
  updatingItem,
  setItemDoneState,
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

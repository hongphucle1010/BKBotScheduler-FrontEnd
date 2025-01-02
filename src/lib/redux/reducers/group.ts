import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Group } from './types'

interface GroupState {
  groups: Group[]
}

const groupSlice = createSlice({
  name: 'group',
  initialState: {
    groups: []
  } as GroupState,
  reducers: {
    setGroups: (state, action: PayloadAction<Group[]>) => {
      state.groups = action.payload
    },
    clearGroup: (state) => {
      state.groups = []
    }
  }
})

export const { setGroups, clearGroup } = groupSlice.actions
export default groupSlice.reducer

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
    }
  }
})

export const { setGroups } = groupSlice.actions
export default groupSlice.reducer
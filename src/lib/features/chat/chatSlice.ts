import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction, current } from "@reduxjs/toolkit";
// import type { RootState } from "../../store";

interface ChatStoreState {
  currentSession: string;
  // chats: {
  //   [currentSession: string]: { req: string; res: string }[];
  // };
  chats: any;
  showChat: boolean;
}

const initialState: ChatStoreState = {
  currentSession: "",
  showChat: false,
  chats: {},
};

export const counterSlice = createSlice({
  name: "chat-store",
  initialState,
  reducers: {
    setCurrentSession: (state, action) => {
      state.currentSession = action.payload;
    },

    setShowChat: (state, action) => {
      state.showChat = action.payload;
    },
    addNewChat: (state, action) => {
      const { currentSession } = state;
      if (!state.chats[currentSession]) {
        state.chats[currentSession] = [];
      }
      if (action.payload.req !== "" && action.payload.res !== "") {
        const { req, res } = action.payload;
        state.chats[currentSession].push({ req, res });
      }
    },
  },
});

export const { setCurrentSession, addNewChat, setShowChat } =
  counterSlice.actions;
export default counterSlice.reducer;

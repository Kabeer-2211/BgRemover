import { createSlice } from "@reduxjs/toolkit";

const initialState = { images: [], activeImage: 0 };

const bgRemoverSlice = createSlice({
  name: "bgRemover",
  initialState,
  reducers: {
    addImage: (state, action) => {
      if (state.images.length < 4) {
        state.images.push(action.payload);
      }
    },
    updateImage: (state, action) => {
      if (state.images[action.payload.index]) {
        state.images[action.payload.index] = {
          ...state.images[action.payload.index],
          ...action.payload.updatedImage,
        };
      }
    },
    deleteImage: (state, action) => {
      state.images = state.images.filter((_, i) => i !== action.payload);
    },
    setActiveImage: (state, action) => {
      state.activeImage = action.payload;
    },
  },
});

export const { addImage, deleteImage, updateImage, setActiveImage } =
  bgRemoverSlice.actions;

export default bgRemoverSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// localStorage se pastes ko retrieve karte hain aur agar parse karne mein error aaye to handle karte hain
const getpastesfromlocalstorage = () => {
  try {
    // localStorage se "pastes" key ke under stored data ko get karna
    const storedPastes = localStorage.getItem("pastes");
    // Agar data milta hai, to usse JSON parse karke return karte hain, warna empty array return karte hain
    return storedPastes ? JSON.parse(storedPastes) : [];
  } catch (error) {
    // Agar parsing mein koi error aaye, to usse console mein log karenge aur localStorage se corrupted data ko remove karenge
    console.error("Error parsing pastes from localStorage:", error);
    localStorage.removeItem("pastes");
    return []; // Agar error aaye to empty array return karte hain
  }
};

// Initial state jisme pastes ko localStorage se retrieve karke set kiya jata hai
const initialState = {
  pastes: getpastesfromlocalstorage(), // "pastes" key se data fetch karna
};

// Redux slice banate hain pastes ko manage karne ke liye
const pasteSlice = createSlice({
  name: 'paste', // Slice ka naam
  initialState,  // Initial state
  reducers: {    // Reducers define karte hain ki state ko kaise update karna hai

    // Ek naya paste add karte hain list mein
    addToPastes: (state, action) => {
      const paste = action.payload; // Jo paste add karna hai wo payload mein hoga
      state.pastes.push(paste); // Paste ko state mein add karna
      localStorage.setItem("pastes", JSON.stringify(state.pastes)); // Updated data ko localStorage mein store karte hain
      toast.success("Paste Created Successfully", { position: "top-right" }); // Notification show karte hain
    },

    // Koi existing paste ko update karna
    updateToPastes: (state, action) => {
      const paste = action.payload; // Jo paste update karna hai wo payload mein hoga
      const index = state.pastes.findIndex((item) => item._id === paste._id); // Paste ko find karte hain by _id

      if (index >= 0) {
        state.pastes[index] = paste; // Agar paste mil gaya, to usse update karte hain
        localStorage.setItem("pastes", JSON.stringify(state.pastes)); // Updated data ko localStorage mein store karte hain
        toast.success("Paste updated.", { position: "top-right" }); // Success notification show karte hain
      }
    },

    // Sare pastes ko reset (clear) karna
    resetAllPastes: (state, action) => {
      state.pastes = []; // Paste ko empty array se replace karna
      localStorage.removeItem("pastes"); // localStorage se "pastes" ko remove karte hain
      toast.success("All pastes deleted.", { position: "top-right" }); // Notification show karte hain
    },

    // Koi specific paste ko remove karna
    removeFromPastes: (state, action) => {
      const pasteId = action.payload; // Jo paste delete karna hai, uska ID payload mein hoga
      console.log("pasteID:", pasteId);

      const index = state.pastes.findIndex((item) => item._id === pasteId); // Paste ko find karte hain by _id
        console.log("index:",index)
      if (index >= 0) {
        state.pastes.splice(index, 1); // Agar paste mil gaya to usse list se remove karte hain
        localStorage.setItem("pastes", JSON.stringify(state.pastes)); // Updated data ko localStorage mein store karte hain
        toast.success("Your paste is deleted.", { position: "top-right" }); // Notification show karte hain
      }
    }
  }
});

// Actions ko export karte hain taaki components mein use ho sake
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions;

// Reducer ko export karte hain jo store mein use hoga
export default pasteSlice.reducer;

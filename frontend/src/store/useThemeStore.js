import { create } from 'zustand'

export const useThemeStore = create((set) => ({
    theme : localStorage.getItem("streamOn-theme") || "night",
    setTheme: (theme) => {
        localStorage.setItem("streamOn-theme", theme);
        set({ theme })
    },
}))
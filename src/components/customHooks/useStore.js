import create from "zustand";


const useStore = create(set => ({
    activeRef: undefined,
    imgs: [],
    setActiveRef: (img) => set(state => ({ activeRef: img })),
    setImgs: (nImgs) => set(state => ({imgs: nImgs}))
}))

export default useStore
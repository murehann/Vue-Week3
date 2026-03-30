import { ref, watch } from "vue";

export function useDebounce(source, delay) {
    const debounced = ref(source.value)
    let timeout

    watch(source, (newVal) => {
        clearTimeout
        timeout = setTimeout(() => {
            debounced.value = newVal
        }, delay)
    })

    return debounced;
}
export const getInput = (label, required, col, icon, others) => {
    return {
        type: 'custom-input',
        label,
        required,
        col,
        icon,
        ...others
    }
}

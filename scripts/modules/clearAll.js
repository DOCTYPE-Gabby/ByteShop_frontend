export function clearAllInputs(){
    const allInputs = Array.from(document.querySelectorAll('input'));
    allInputs.forEach(inp => {
        if (inp.value != "") {
            inp.value = ""
        }
    })
}
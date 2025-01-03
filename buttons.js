import { state, setIsValid } from "./state.js";
import {clearSudoku, toggleSums, undoAction} from "./utils.js";
import {resetDeleteBox, addBackDeletedBox, deleteBox, createBox} from "./box.js";
import {setBoxHoverAnimationOn} from "./animation.js";

const { togglingSums, deletingBox, currentBox, active_cell } = state;

// Helper function to set up event listeners for buttons
export function setUpButtons() {
    document.getElementById("clearButton").addEventListener("click", function() {
        clearSudoku();
    });
    document.getElementById("undoButton").addEventListener("click", function() {
        if (togglingSums){
            state.currentBox = deleteBox[currentBox.length - 1];
            addBackDeletedBox();
            return;
        }
        undoAction((state.active_cell[active_cell.length - 1]))
        resetDeleteBox()
    });

    document.getElementById("newBoxButton").addEventListener("click", function() {
        resetDeleteBox();
        createBox();
    });

    const delBoxButton = document.getElementById("delBoxButton");
    delBoxButton.addEventListener("click", function() {
        if (state.addingBox){
            return;
        }
        if (deletingBox) {
            resetDeleteBox()
        }
        else if (!deletingBox) {
            setBoxHoverAnimationOn();
            document.getElementById("grid").classList.add("selectBox");
            document.getElementById("delBoxButton").textContent = "Select a box";
            state.deletingBox = true;
            console.log("Deleting box:" + state.deletingBox);
        }
    });

    document.getElementById("setBoxButton").addEventListener("click", function() {
        if (state.addingBox){
            return;
        }
        if (deletingBox) {
            resetDeleteBox()
        }
        else {
        document.getElementById("grid").classList.add("selectBox");
        document.getElementById("setBoxButton").textContent = "Select a box";
        state.settingBoxTotal = true;
        }

    });

    const killerToggler = document.getElementById("killerButton");

    // Toggle sums when the button is clicked
    killerToggler.addEventListener("click", function () {
        resetDeleteBox();
        if (!state.isValid) {
            if (!state.togglingSums) {
                alert("Please remove errors from the board before toggling the sums.");
                return;
            }
            setIsValid(true);
        }
        toggleSums();

        // Update button text based on the state
        killerToggler.textContent = state.togglingSums ? "Exit Killer" : "Killer Mode";
        killerToggler.classList.toggle("active");
    });
}

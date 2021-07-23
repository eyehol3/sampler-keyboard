import React, { useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

// import "./styles.css";

const defaultLayout = {
	default: [
		"` 1 2 3 4 5 6 7 8 9 0 - =",
		"q w e r t y u i o p [ ] \\",
		"a s d f g h j k l ; '",
		"{shiftleft} z x c v b n m , . / {shiftright}",
		"{space}",
	],
	shift: [
		"~ ! @ # $ % ^ & * ( ) _ +",
		"Q W E R T Y U I O P { } |",
		'A S D F G H J K L : "',
		"{shiftleft} Z X C V B N M < > ? {shiftright}",
		"{space}",
	],
};

const display = {
	"{escape}": "esc ⎋",
	"{tab}": "tab ⇥",
	"{backspace}": "backspace ⌫",
	"{enter}": "enter ↵",
	"{capslock}": "caps lock ⇪",
	"{shiftleft}": "shift ⇧",
	"{shiftright}": "shift ⇧",
	"{controlleft}": "ctrl ⌃",
	"{controlright}": "ctrl ⌃",
	"{altleft}": "alt ⌥",
	"{altright}": "alt ⌥",
	"{metaleft}": "cmd ⌘",
	"{metaright}": "cmd ⌘"
};

export const Keys = () => {
	const [input, setInput] = useState("");
	const [layout, setLayout] = useState("default");
	const keyboard = useRef();

	const onChange = (input) => {
		setInput(input);
		console.log("Input changed", input);
	};
    

	const handleShift = () => {
		const newLayoutName = layout === "default" ? "shift" : "default";

		setLayout(newLayoutName);
	};

	const onKeyPress = (button) => {
		console.log("Button pressed", button);

		/**
		 * If you want to handle the shift and caps lock buttons
		 */
		if (button === "{shift}" || button === "{lock}" || button === "{shiftright}" || button === "{shiftleft}") handleShift();
	};

	const onChangeInput = (event) => {
		const input = event.target.value;
		setInput(input);
		keyboard.current.setInput(input);
	};

	return (
		<div className="App">
			<input
				value={input}
				placeholder={"Tap on the virtual keyboard to start"}
				onChange={onChangeInput}
			/>
			<Keyboard
				keyboardRef={(r) => (keyboard.current = r)}
				layoutName={layout}
				onChange={onChange}
				onKeyPress={onKeyPress}
				physicalKeyboardHighlight={true}
				physicalKeyboardHighlightPress={true}
                // disableButtonHold={true}
				syncInstanceInputs={true}
                layout={defaultLayout}
				display={display}
			/>
		</div>
	);
};

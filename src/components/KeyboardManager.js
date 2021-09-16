import React, { useState, useEffect } from "react";
import { Keys } from "./Keys";

export const keyboardReducer = (state, action) => {
	switch (action.type) {
		case "increment":
			return { count: state.count + 1 };
		case "decrement":
			return { count: state.count - 1 };
		default:
			throw new Error();
	}
};
const KeyboardLayout = [
	"1 2 3 4 5 6 7 8 9 0 - =",
	"q w e r t y u i o p [ ]",
	"a s d f g h j k l ; '",
	"shift z x c v b n m , . /",
	"space",
];

export const KeyboardManager = () => {
	const [shiftState, setShiftState] = useState(false);
	const [pressedKeys, setPressedKeys] = useState([]);

	useEffect(() => {
		setShiftState(
			pressedKeys.find(
				(code) => code === "ShiftRight" || code === "ShiftLeft"
			)
		);
		// console.log(shiftState);
	}, [pressedKeys]);

	const onKeyDown = (button) => {
		setPressedKeys([...pressedKeys, button.code]);
		let el = document.querySelector(`#${button.code}`);
		if (el) {
			document
				.querySelector(`#${button.code}`)
				?.classList.add("key-down");
		}
		if (
			pressedKeys.find(
				(code) => code === "ShiftRight" || code === "ShiftLeft"
			)
		)
			setShiftState(true);
	};
	const onKeyUp = (button) => {
		setPressedKeys(pressedKeys.filter((code) => button.code !== code));
		let el = document.querySelector(`#${button.code}`);
		console.log("Button released", button.code);
		if (el) {
			document
				.querySelector(`#${button.code}`)
				.classList.remove("key-down");
		}
	};

	return (
		<div>
			<Keys
				KeyboardLayout={KeyboardLayout}
				shiftState={shiftState}
				onKeyDown={onKeyDown}
				onKeyUp={onKeyUp}
			/>
		</div>
	);
};

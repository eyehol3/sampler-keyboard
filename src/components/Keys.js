// eslint-disable-next-line
import React, { useRef, useState, useEffect } from "react";
import { Key } from "./Key";
import { keyCodes } from "./KeyCodes";
import { SoundEngine } from "./SoundEngine";

import "./Keys.scss";

const KeyboardLayout = [
	"1 2 3 4 5 6 7 8 9 0 - =",
	"q w e r t y u i o p [ ]",
	"a s d f g h j k l ; '",
	"shift z x c v b n m , . /",
	"space",
];

export const Keys = () => {
	// const [input, setInput] = useState("");
	const [shiftState, setShiftState] = useState(false);
	const [pressedKeys, setPressedKeys] = useState([]);
	const keyboard = useRef();

	useEffect(() => {
		keyboard.current.focus();
	}, []);
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

	const renderKeyboard = () =>
		KeyboardLayout.map((row, i) => (
			<div className="key-row" key={i}>
				{row.split(" ").map((keyName) => {
					let keyCode = keyCodes.find((k) => k.name === keyName).code;
					return (
						<Key
							keyName={keyName}
							key={keyName}
							keyCode={keyCode}
							shiftState={shiftState}
							// ref={keyCode}
						/>
					);
				})}
			</div>
		));

	return (
		<div
			className="keyboard"
			onKeyDown={onKeyDown}
			onKeyUp={onKeyUp}
			tabIndex="0"
			ref={keyboard}
		>
			{/* <input
				// value={input}
				placeholder={"lalalalal"}
				// onChange={onChangeInput}
			/> */}
			{renderKeyboard()}
            <SoundEngine/>
		</div>
	);
};

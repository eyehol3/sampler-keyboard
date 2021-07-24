// eslint-disable-next-line
import React, { useRef, useState, useEffect } from "react";
import { Key } from "./Key";
import { keyCodes } from "./KeyCodes";

import "./Keys.scss";

const KeyboardLayout = [
	"q w e r t y u i o p [ ]",
	"a s d f g h j k l ; '",
	"shift z x c v b n m , . /",
	"space",
];

export const Keys = () => {
	// const [input, setInput] = useState("");
	// const [pressedKeys, setLayout] = useState();
	const keyboard = useRef();

	useEffect(() => {
		keyboard.current.focus();
	}, []);

	const onKeyDown = (button) => {
		console.log("Button pressed", button.code);
		let el = document.querySelector(`#${button.code}`);
		if (el) {
			document
				.querySelector(`#${button.code}`)
				?.classList.add("key-down");
		}

		if (button.code === "ShiftRight" || button.code === "ShiftLeft")
			handleShift();
	};
	const onKeyUp = (button) => {
		let el = document.querySelector(`#${button.code}`);
		console.log("Button released", button.code);
		if (el) {
			document
				.querySelector(`#${button.code}`)
				.classList.remove("key-down");
		}
	};

	const handleShift = () => {
		console.log("DLKJFL:SDKJF:DLSKJFL:D");
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
			<input
				// value={input}
				placeholder={"lalalalal"}
				// onChange={onChangeInput}
			/>
			{renderKeyboard()}
		</div>
	);
};

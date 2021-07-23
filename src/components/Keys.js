// eslint-disable-next-line
import React, { useRef, useState } from "react";

import "./Keys.css";

const KeyboardLayout = [
	"q w e r t y u i o p [ ]",
	"a s d f g h j k l ; '",
	"shift z x c v b n m , . /",
	"space",
];

export const Keys = () => {
	// const [input, setInput] = useState("");
	// const [layout, setLayout] = useState("default");
	// const keyboard = useRef();

	// const onChange = (input) => {
	// 	setInput(input);
	// 	console.log("Input changed", input);
	// };

	// const handleShift = () => {
	// 	const newLayoutName = layout === "default" ? "shift" : "default";

	// 	setLayout(newLayoutName);
	// };

	// const onKeyPress = (button) => {
	// 	console.log("Button pressed", button);

	// 	/**
	// 	 * If you want to handle the shift and caps lock buttons
	// 	 */
	// 	if (button === "{shift}" || button === "{lock}" || button === "{shiftright}" || button === "{shiftleft}") handleShift();
	// };

	const renderKeyboard = () =>(
		KeyboardLayout.map((row) => (
            <div className="key-row">
			{row.split(" ").map((char) => {
                let keyClassName = `key ${char}`;
				return <div className={keyClassName}>{char}</div>;
			})}
            </div>
		)
        )
    )

	// const onChangeInput = (event) => {
	// 	const input = event.target.value;
	// 	setInput(input);
	// 	keyboard.current.setInput(input);
	// };

	return (
		<div className="keyboard">
			<input
				// value={input}
				placeholder={"lalalalal"}
				// onChange={onChangeInput}
			/>
			{renderKeyboard()}
		</div>
	);
};

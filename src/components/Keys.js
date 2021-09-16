// eslint-disable-next-line
import React, { useRef, useState, useEffect } from "react";
import { Key } from "./Key";
import { keyCodes } from "./KeyCodes";
import { SoundEngine } from "./SoundEngine";

import "./Keys.scss";

export const Keys = (props) => {
	const { KeyboardLayout, shiftState, onKeyDown, onKeyUp } = props;
	const keyboard = useRef();

	useEffect(() => {
		keyboard.current.focus();
	}, []);

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
			{renderKeyboard()}
			<SoundEngine />
		</div>
	);
};

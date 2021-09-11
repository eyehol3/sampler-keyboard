import React, { useState } from "react";
// import MicRecorder from "mic-recorder-to-mp3";
const recordAudio = () =>
	new Promise(async (resolve) => {
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: true,
		});
		const mediaRecorder = new MediaRecorder(stream);
		const audioChunks = [];

		mediaRecorder.addEventListener("dataavailable", (event) => {
			audioChunks.push(event.data);
		});

		const start = () => mediaRecorder.start();

		const stop = () =>
			new Promise((resolve) => {
				mediaRecorder.addEventListener("stop", () => {
					const audioBlob = new Blob(audioChunks);
					const audioUrl = URL.createObjectURL(audioBlob);
					const audio = new Audio(audioUrl);
					const play = () => audio.play();
					resolve({ audioBlob, audioUrl, play });
				});

				mediaRecorder.stop();
			});

		resolve({ start, stop });
	});

// const fuck = async () => {
// 	const recorder = await recordAudio();
// 	console.log(recorder);
// 	return recorder;
// };

export const SoundEngine = () => {
	// const Mp3Recorder = new MicRecorder({ bitRate: 128 });
	// const recorder = recordAudio().then(r=>r)
	const [recorder, setRecorder] = useState();

	const [state, setState] = useState({
		isRecording: false,
		blobURL: "",
		isBlocked: false,
		audio: null,
	});

	// useEffect(() => {
	// 	recordAudio().then((r) => {
	// 		setState({ isBlocked: false });
	// 		recorder.current = r;
	// 	});
	// }, []);

	const start = () => {
		if (state.isBlocked) {
			console.log("Permission Denied");
		} else {
			console.log(recorder);
			recordAudio().then((r) => {
				r.start();
				setRecorder(r);
				setState({ isRecording: true });
			});
		}
	};

	const stop = () => {
		recorder
			.stop()
			.then((recordedAudio) => {
				setState({ audio: recordedAudio, isRecording: false });
			})
			.catch((e) => console.log(e));
	};

	const play = () => {
		console.log(state.audio);
		state.audio.play();
	};
	// audio.play();
	return (
		<div>
			<button
				onClick={start}
				disabled={state.isRecording || state.isBlocked}
			>
				Record
			</button>
			<button onClick={stop} disabled={!state.isRecording}>
				Stop
			</button>
			{/* <button onClick={play} disabled={!state.audio}> */}
			<button onClick={play} disabled={!state.audio}>
				Play
			</button>
			<audio
				src={state.audio ? state.audio.audioUrl : null}
				controls="controls"
			/>
		</div>
	);
};

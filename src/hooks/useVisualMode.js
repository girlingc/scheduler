import { useState } from "react";

export default function useVisualMode(initial) {
	const [history, setHistory] = useState([initial]);

	const transition = function (newMode, replace = false) {
		const newHistory = [...history];
		if (replace) {
			newHistory.pop();
			newHistory.push(newMode);
			setHistory(newHistory);
			return;
		}
		newHistory.push(newMode);
		setHistory(newHistory);
	};

	const back = function () {
		if (history.length === 1) {
			return;
		}
		const newHistory = [...history];
		newHistory.pop();
		setHistory(newHistory);
	};

	const mode = history.slice(-1)[0];

	return { mode, transition, back };
}
export const throttleEvent = (cb, interval) => {

	let enabled = true;

	return (...args) => {

		if(!enabled) return;
		
		enabled = false;
		cb.apply(this, args);

		setTimeout(() => enabled = true, interval);
	}
}
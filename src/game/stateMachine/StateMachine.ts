interface IState {
	name: string;
	onEnter?: () => void;
	onUpdate?: (dt: number) => void;
	onExit?: () => void;
}

export default class StateMachine {
	private states = new Map<string, IState>();
	private currentState?: IState;

	addState(name: string, config?: { onEnter?: () => void, onUpdate?: (dt: number) => void, onExit?: () => void }) {
		this.states.set(name, {
			name,
			...config
		});
	}

	setState(name: string) {
		if (this.currentState?.name === name) return;

		this.currentState?.onExit?.();

		const newState = this.states.get(name);
		if (!newState) {
			console.warn(`State ${name} not found`);
			return;
		}

		this.currentState = newState;
		this.currentState.onEnter?.();
	}

	update(dt: number) {
		this.currentState?.onUpdate?.(dt);
	}

	getCurrentState(): string | undefined {
		return this.currentState?.name;
	}
}

/// <reference types="vite/client" />

// In a .d.ts file or at the top of your SetServiceArea.tsx file
declare global {
	interface Window {
		initAutocomplete: (() => void) | null;
	}
}

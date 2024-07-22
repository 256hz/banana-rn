export function formatErrorMessage(errorMessage?: string | string[]): string {
	if (!errorMessage) return '';
	return Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage;
}

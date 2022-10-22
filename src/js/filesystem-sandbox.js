import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';

let i = 0;

window.customElements.define('filesystem-sandbox', class extends HTMLElement {
	constructor() {
		super();

		const root = this.attachShadow({ mode: 'open' });
		root.innerHTML = `
		<p>
			<button id="filesystem-sandbox-button">Save File</button>
		</p>
		<p id="filesystem-error-message"></p>
		`;
	}

	connectedCallback() {
		const self = this;
		self.shadowRoot.querySelector('#filesystem-sandbox-button').addEventListener('click', async function(e) {
			try {
				const path = `test-${i++}.txt`;
				console.log(`Saving File to ${path}`);
				Filesystem.writeFile({
					path,
					data: `The time is ${new Date()}`,
					directory: Directory.Documents,
					encoding: Encoding.UTF8,
					recursive: true,
				});
			} catch (e) {
				console.warn('Save File failed', e);
				self.logError(`Save File failed: ${JSON.stringify(e)}`);
			}
		});
	}

	logError(error) {
		const self = this;
		self.shadowRoot.querySelector('#filesystem-error-message').innerHTML = error;
	}
});

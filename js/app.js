// Global variable to store the SDK
let w3wApi;

// Callback when W3W SDK loads
function w3wLoaded(sdk) {
    w3wApi = sdk;
    w3wApi.api.setApiKey('ABC123');
    setupApp();
}

function setupApp() {
    const input = document.getElementById('w3w-input');
    const convertBtn = document.getElementById('convert-btn');
    const resultContainer = document.getElementById('result');
    const latitudeEl = document.getElementById('latitude');
    const longitudeEl = document.getElementById('longitude');

    if (!input || !convertBtn) {
        console.error('Essential elements missing!');
        return;
    }

    convertBtn.addEventListener('click', handleConversion);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleConversion();
    });

    async function handleConversion() {
        const words = input.value.trim();
        
        if (!words) {
            alert('Please enter a 3 word address');
            return;
        }

        try {
            // Show loading state
            convertBtn.disabled = true;
            convertBtn.querySelector('span').textContent = 'Converting...';
            
            // Normalize input (replace spaces with periods)
            const normalizedWords = words.replace(/\s+/g, '.').toLowerCase();
            
            // Convert to coordinates
            const response = await w3wApi.api.convertToCoordinates({
                words: normalizedWords,
                format: 'json'
            });
            
            // Update UI
            const { lat, lng } = response.coordinates;
            latitudeEl.textContent = lat.toFixed(6);
            longitudeEl.textContent = lng.toFixed(6);
            
            // Show results
            resultContainer.classList.remove('hidden');
            setTimeout(() => resultContainer.classList.add('show'), 10);
            
            // Open in Google Maps
            window.open(`https://www.google.com/maps/@${lat},${lng},15z`, '_blank');
            
        } catch (error) {
            console.error('Conversion error:', error);
            alert('Failed to convert. Please check your words and try again.');
        } finally {
            // Reset button state
            convertBtn.disabled = false;
            convertBtn.querySelector('span').textContent = 'Open in Maps';
        }
    }
}

// Fallback if SDK loaded before our script
if (window.w3w) {
    w3wLoaded(window.w3w);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (w3wApi) setupApp();
});
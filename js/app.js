document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('w3w-input');
    const button = document.getElementById('open-btn');
    
    button.addEventListener('click', openWhat3Words);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            openWhat3Words();
        }
    });
    
    function openWhat3Words() {
        const words = input.value.trim();
        
        if (!words) {
            alert('Please enter a 3-word combination');
            return;
        }
        
        // Format the words (replace spaces with periods and remove any other special chars)
        const formattedWords = words
            .replace(/[^\w\s.]/g, '') // Remove special chars except periods and spaces
            .replace(/\s+/g, '.')     // Replace spaces with periods
            .replace(/\.+/g, '.')     // Replace multiple periods with single
            .toLowerCase();
        
        const wordCount = formattedWords.split('.').filter(Boolean).length;
        
        if (wordCount !== 3) {
            alert('Please enter exactly 3 words separated by spaces or periods');
            return;
        }
        
        // Open in new tab
        window.open(`https://what3words.com/${formattedWords}`, '_blank');
    }
});
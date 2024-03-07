const dataAtual = new Date();
const diaAtual = dataAtual.getDate();
const mesAtual = dataAtual.getMonth() + 1;
const anoAtual = dataAtual.getFullYear();
// URL da requisição
const url = 'https://www.sefaria.org/api/calendars/?timezone=America%2FFortaleza&day='+diaAtual+'&month='+mesAtual+'&year='+anoAtual+'';
// Função para fazer a requisição
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        // Array com as informações que vão para a tela
        var dates = [data.calendar_items[12].displayValue.en, data.calendar_items[12].displayValue.he, data.calendar_items[0].title.en + ": " + data.calendar_items[0].displayValue.en ,data.calendar_items[0].title.he + ": " + data.calendar_items[0].displayValue.he];
        var currentIndex = 0;

        function updateHebrewDate() {
            document.getElementById('hebrewDate').textContent = dates[currentIndex];
            currentIndex = (currentIndex + 1) % dates.length;
        }

        // Atualiza a data a cada 8 segundos
        setInterval(updateHebrewDate, 8000);
        // Inicializa as informações na tela
        updateHebrewDate();
        
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Chamada da função com a URL da requisição
fetchData(url);
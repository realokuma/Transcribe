// Here, I will put texts that will be generated

const quotes = [
	'Fato Curioso 3: Provavelmente é um Gabriel que esta fazendo essas peripécias no discord.',
	'Fato Curioso 2: Não tem fato curioso 2',
	'Fato Curioso: Na angola existem angolanos',
    'Magaguinho quando nasce se esparrama pelo chão, vem aqui na minha frente e me de seu coração.',
    'Macaco sobe no galho afim de gargalhar, o galho gargalha afim do macaco subiar',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, aliquid odio quis dicta debitis, nulla cumque est veniam maiores minus, omnis aut quibusdam at? Fugit eligendi nihil quam! Unde, eum.',
    'O galho parado fica, enquanto o macaco em cima dele fica, então se o macaco em cima do galho parado fica, o galho com o macaco parado em cima fica',
    'Meio dia, macaco assobia, panela no fogo barriga vazia',
    'Meio dia, macaco folia, fazendo careta pra dona maria',
    'Macaco sobe no galho afim de gargalhar, o galho gargalha afim do macaco subiar',
    'Galho na árvore com o macaco está, macaco com o galho na árvore fica, se macaco na árvore com o galho é, então árvore no galho macaco fica.',
];

let words = [];
let wordIndex = 0;
let startTime = Date.now();

const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message')
const typedValueElement = document.getElementById('typed-value');

document.getElementById('start').addEventListener('click', function () {
	// Get a quote
	const quoteIndex = Math.floor(Math.random() * quotes.length);
	const quote = quotes[quoteIndex];
	// Put the quote into an array of words
	words = quote.split(' ');
	wordIndex = 0;

	// UI updates
	const spanWords = words.map(function(word) { return `<span>${word} </span>`});
	quoteElement.innerHTML = spanWords.join('');
	quoteElement.childNodes[0].className = 'highlight';
	messageElement.innerText = '';

	typedValueElement.value = '';
	typedValueElement.focus();

	startTime = new Date().getTime();
});

typedValueElement.addEventListener('input', (e) => {
	// Get the current word
	const currentWord = words[wordIndex];
	// Get the current value
	const typedValue = typedValueElement.value;

	if (typedValue === currentWord && wordIndex === words.length - 1) {
		const elapsedTime = new Date().getTime() - startTime;
		const message = `Você levou ${elapsedTime / 1000} segundos para transcrever a frase.`;
		messageElement.innerText = message;
	} else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
		typedValueElement.value = '';
		wordIndex++;
		for (const wordElement of quoteElement.childNodes) {
			wordElement.className = '';
		}  quoteElement.childNodes[wordIndex].className = 'highlight';
	} else if (currentWord.startsWith(typedValue)) {
		typedValueElement.className = '';
	} else {
		// Error state
		typedValueElement.className = 'error';
	}
});
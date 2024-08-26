let btnEncrypt = document.getElementById("button_encrypt");
let btnDecrypt = document.getElementById("button_decrypt");
let btnCopy = document.getElementById("button_copy");
let textInput = document.getElementById("input_text_encrypt");
let textOutput = document.getElementById("output_text_decrypt");
let container = document.querySelector(".result");

const ERRORCLIPBOARD = 'Error al copiar al portapapeles:'
const ERRORCOPY = "Error al copiar el mensaje"
const MSGCOPIED = "El mensaje ha sido copiado"
const NONECOPY = "No hay nada que copiar"
const NOTHINGTODECRYPT = "Ingrese un mensaje a ser desencriptado en el área de texto."
const NOTHINGTOENCRYPT = "Por favor, ingrese el mensaje a ser encriptado en el área de texto."
const REMINDER = "Sólo debe ingresar texto en minúsculas, sin acentos y sin caracteres especiales."

const backgrounds = [
      'url("img/background-a.jpg")',
      'url("img/background-b.jpg")',
      'url("img/background-c.jpg")'
    ];

const encryptDictionary = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat'
};

const decryptDictionary = {
    'ai': 'a',
    'enter': 'e',
    'imes': 'i',
    'ober': 'o',
    'ufat': 'u'
};

document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('input_text_encrypt');
    const errorMessage = document.getElementById('errorMessage');
    
    textarea.addEventListener('input', () => {
        const inputValue = textarea.value;
        
        // Normalizar el texto y convertirlo a minúsculas
        const normalizedValue = inputValue.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const lowercaseValue = normalizedValue.toLowerCase();

        // Filtrar caracteres válidos (solo letras y espacios)
        const validValue = lowercaseValue.replace(/[^a-z\s]/g, '');

        // Verificar si el valor actual es válido
        if (inputValue !== validValue) {
            // Si no es válido, solo mantiene los caracteres válidos
            textarea.value = validValue;
            errorMessage.textContent = REMINDER;
        } else {
            errorMessage.textContent = ''; 
        }
    });
});

function setRandomBackground() {
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  document.body.style.backgroundImage = backgrounds[randomIndex];
}

function encrypt(text) {
    return text.split('').map(character => encryptDictionary[character] || character).join('');
}

function decrypt(text) {
    // Reemplazar primero las secuencias más largas para evitar reemplazos parciales
    let result = text;
    Object.keys(decryptDictionary).forEach(key => {
        const value = decryptDictionary[key];
        const regex = new RegExp(key, 'g');
        result = result.replace(regex, value);
    });
    return result;
}

function showEncrypted() {
	if (textInput.value != "") {
		let textEncrypted = encrypt(textInput.value);
		textOutput.innerHTML = textEncrypted;
		textOutput.value = textEncrypted;
		Refresh();
		textInput.value = "";
	} else {
    myAlert(NOTHINGTOENCRYPT);
    focusTextArea();
	}		
}		
		
function showDecrypted() {
	if (textInput.value != "") {
        let textDecrypted = decrypt(textInput.value);
        textOutput.innerHTML = textDecrypted;
        textOutput.value = textDecrypted;
        Refresh();
	textInput.value = "";
    }
    else {
        myAlert(NOTHINGTODECRYPT);
        focusTextArea();
    }
}	

function copyMessage() {
    if (textOutput && textOutput.value.trim() !== "") {
        navigator.clipboard.writeText(textOutput.value)
            .then(() => {
                myAlert(MSGCOPIED);
            })
            .catch(err => {
                console.error(ERRORCLIPBOARD, err);
                myAlert(ERRORCOPY);
            });
    } else {
        myAlert(NONECOPY);
    }
}		
		
function myAlert(message) {
	var overlay = document.getElementById('overlay');
	var alert = document.getElementById('custom-alert');
	
	overlay.style.display = 'block';
	alert.innerHTML = message;
	alert.classList.remove('fade-out');
	alert.classList.add('fade-in');
	alert.style.display = 'block';

	setTimeout(function() {
		alert.classList.remove('fade-in');
		alert.classList.add('fade-out');
		setTimeout(function() {
			alert.style.display = 'none';
			overlay.style.display = 'none';
		}, 500);
	}, 2000);
}		

function enableButtons() {
    btnEncrypt.disabled = false;
    btnDecrypt.disabled = false;    
}

function Refresh() {
    if(textInput.value !== ""){
        container.classList.remove("no_texto")
    }
    textInput.focus();
}

function focusTextArea() {
    var textarea = document.getElementById("input_text_encrypt");
    textarea.focus();
}

window.onload = setRandomBackground;
btnEncrypt.onclick = showEncrypted;
btnDecrypt.onclick = showDecrypted;
btnCopy.onclick = copyMessage;
textInput.onclick = enableButtons;

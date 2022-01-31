const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

clipboard.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = resultEl.innerText;
	
	if(!password)
	{ alert('Nothing to copy !');
		return;
	 }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
});

generate.addEventListener('click', () => {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;
	
	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});
let count=0;  // for generated PasswordCount
function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	// Doesn't have a selected type
	if(typesCount === 0) {
		return '';
	}
	
	// create a loop
	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	
	const finalPassword = generatedPassword.slice(0, length);

	const generatedPasswordCount=document.getElementById("count-update-saved");
	generatedPasswordCount.innerText=++count;
	
	return finalPassword;
}

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}



// Table list of passwords

function addPassword(){
	const add=document.getElementById("add");
	const passwordInput=document.getElementById("password-input");
	if(resultEl.innerText)
	{
		passwordInput.value=resultEl.innerText;
	}
	else
	{
		alert("Please generate password");
	}
}

let sn_count=0;

// variables declared in a 

function inserItem()
{
	const table=document.getElementById("table")
	const tr=document.createElement("tr");
	const slNo=document.createElement("td");
	const data_name=document.createElement("td");
	data_name.setAttribute("contenteditable","true");
	data_name.style.textTransform="capitalize";
	const data_password=document.createElement("td");
	data_password.setAttribute('contenteditable','true')
	const count_update=document.getElementById("count-update-generated");

	const passwordInput=document.getElementById("password-input");
	const nameInput=document.getElementById("name-input");

	
	data_name.innerText=nameInput.value;
	data_password.innerText=passwordInput.value;

	tr.append(slNo);
	tr.append(data_name);
	tr.append(data_password);

	if(nameInput.value && passwordInput.value)
	{
		table.append(tr);
		slNo.innerText=++sn_count;
		count_update.innerText=sn_count;
		nameInput.value="";
		passwordInput.value="";
	}
	else{
		alert("Required fields are missing !");
	}
}

save.addEventListener("click",inserItem);
add.addEventListener("click",addPassword);

// Download PDF section

// see html file......its there in script part


// Editable on double click............pending

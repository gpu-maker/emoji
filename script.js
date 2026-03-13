const ZW0 = "\u200B"
const ZW1 = "\u200C"

function xorEncrypt(text, key){
if(!key) return text

let result = ""
for(let i=0;i<text.length;i++){
let char = text.charCodeAt(i)
let keyChar = key.charCodeAt(i % key.length)
result += String.fromCharCode(char ^ keyChar)
}

return result
}

function textToBinary(text){
return text.split('').map(c =>
c.charCodeAt(0).toString(2).padStart(8,'0')
).join('')
}

function binaryToText(bin){

let result = ""

for(let i=0;i<bin.length;i+=8){
let byte = bin.substr(i,8)
if(byte.length < 8) continue
result += String.fromCharCode(parseInt(byte,2))
}

return result
}

function encode(){

let cover = document.getElementById("cover").value
let secret = document.getElementById("secret").value
let password = document.getElementById("password").value

let encrypted = xorEncrypt(secret,password)

let binary = textToBinary(encrypted)

let hidden = ""

for(let bit of binary){
hidden += bit === "0" ? ZW0 : ZW1
}

let encoded = cover + hidden

document.getElementById("result").innerText = encoded
}

function decode(){

let text = document.getElementById("cover").value
let password = document.getElementById("password").value

let bits = ""

for(let char of text){
if(char === ZW0) bits += "0"
if(char === ZW1) bits += "1"
}

if(bits.length === 0){
document.getElementById("result").innerText = "No hidden message found."
return
}

let encrypted = binaryToText(bits)

let message = xorEncrypt(encrypted,password)

document.getElementById("result").innerText = "Hidden message: " + message
}

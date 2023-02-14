console.log('hello world');

console.log(document)
console.log(window)


let count = 0;
function increaseCount() {
    count++;
    document.getElementById("count").innerHTML = count.toString();
}

function storeObj() {
    let name = document.getElementById("name-1-input").value;
    let age = document.getElementById("age-input").value;
    let person = {name: name, age: age};
    console.log(person);
}

const input = document.getElementById("name-input")
console.log(input)
const updateName=() => {
    console.log('in update function')
    const userName=input.value
    window.alert(`Hello, Welcome to Class ${userName}`)
}

updateName();

let changeable = true;
const constant = true;
 
function change () {
    let changeable = false;
    const constant = false;
    console.log(changeable, constant)
}
change();
console.log(changeable, constant)

const array =["apple","banana","orange","mango","toast"]

const newArray = array.map((d) => {
    console.log('d', d)
    return `my favourite food is ${d}`
})
console.log(newArray)
const filteredArray = array.filter((d, i) => {
    const onlyToast = d === "toast"
    const onlyFruit = d !== "toast"
    const appleOrOrange = d === "apple" || d === "orange"
    const laterFoods = i >0;
    return appleOrOrange
})
console.log(filteredArray)
console.log(filteredArray.length)

array.forEach(d => console.log ('d', d))

const dataVizClass = {
    day:'Tuesday',
    time: 'late',
    students: 15,
    }

const dayAccessor = 'day'
const day = dataVizClass[dayAccessor]
dataVizClass.daydataVizClass['day']
//console.log('day', day)

const keys = Object.keys(dataVizClass)
console.log(keys)

const values = Objects.values(dataVizClass)
consolelog(values)

const entries = Object.entries(dataVizClass)
console.log(entries)

const apple ='apple'
if (apple === 'apple'){
    console.log("I am an apple")
}else{
    consolelog("I am not an apple")
}

const yesApple = apple ==="apple" ? "I am an apple!" : "I am not an apple"
console.log(yesApple)

const now = new Date ()
console.log(now)

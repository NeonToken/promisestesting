console.log("Hello")
let promisetest = new Promise((resolve,reject) => {
    let a = 5
    switch(a){
    case 1:
        resolve("It worked")
    break;
    case 5:
        reject("It did not work")
    break;
    }
})
promisetest.then((message)=>{
    console.log("We ran the results and" + message)
})
.catch((message)=>{
    console.log("We ran the results and" + message)
})
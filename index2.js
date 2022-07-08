const ApprovedWebsites = ["Facebook","Google","Amazon","Apple"]
const ApprovedRequests = ["Create","Get","Delete","Clone"]
let WebsiteStatus = {
    "Facebook":{
        "Name":"Metaverse",
        "Owner":"Mark Zuckerberg",
        "Email":"Facebook@gmail.com",
        "NetWorth":85000
    },
    "Google":{
        "Name":"GoogleInc",
        "Owner":"Elon Musk",
        "Email":"Google@gmail.com",
        "NetWorth":64000
    },
    "Amazon":{
        "Name":"AmazonInc",
        "Owner":"Jeff Bezos",
        "Email":"Amazon@gmail.com",
        "NetWorth":8500000
    },
    "Apple":{
        "Name":"AppleLLC",
        "Owner":"Steve Jobs",
        "Email":"Apple@gmail.com",
        "NetWorth":698000
    },
}

function EstablishConnection(Website){
    console.log("Sending Request to " + Website)
    let Result = new Promise((resolve,reject)=>{
        for(index=0; index<5; index+=1){
            if(ApprovedWebsites[index]===Website){
                resolve("Succesfull")
                break
            }
            else if(ApprovedWebsites[index]!==Website && index===4){
                console.log("fuck")
                reject("UnSuccesfull")
            }
        }
    })
    return Result
}
function HTTPRequest(Website,Request,Key,Value){
    console.log("Attempting to " + Request + " " + Key + " In " + Website)
    let Result = new Promise((resolve,reject)=>{
        for(index=0; index<5; index+=1){
            if(ApprovedRequests[index]===Request){
                switch(Request){
                    case "Get":
                        resolve(["Succesfull",WebsiteStatus[Website][Key]])
                        break;
                    case "Create":
                        WebsiteStatus[Website][Key] = Value
                        resolve(["Succesfull",Website + Key + "Has been changed to " + Value])
                        break;
                    case "Delete":
                        delete WebsiteStatus[Website][Key]
                        resolve(["Succesfull",Website + Key + "Has been removed"])
                        break;
                    case "Clone":
                        let WebsiteStatusClone = {...WebsiteStatus}
                        resolve(["Succesfull",WebsiteStatusClone])
                        break;
                }
            }
        }
        reject("Unsuccesfull")
    }  
    )
    return Result
}

async function BeginOperation(Website,Request,Key,Value){
    let ConnectionStatus = await EstablishConnection(Website)
    console.log(ConnectionStatus)
    switch(ConnectionStatus){
        case "Succesfull":
            console.log("A connection has been established with " + Website)
            break;
        case "UnSuccesfull":
            console.log("Error: Failed to establish connection with " + Website)
            break;
    }
    HTTPResult = await HTTPRequest(Website,Request,Key,Value).catch(message => {console.log("HTTPResult fucked up" + message)})
    switch(HTTPResult[0]){
        case "Succesfull":
            console.log("HTTPRequest was succesfull! " + HTTPResult[1])
            break;
        case "Unsuccesfull":
            console.log("Error: Failed to" + Request + Key + "From" + Website)
            break;
    }
    console.log(WebsiteStatus)
}

BeginOperation("Apple","Delete","Name","Dogwater")
            //(Name,Request,Key,Value)


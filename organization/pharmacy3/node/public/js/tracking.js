const drugSearchForm=document.querySelector('form')

   //const data=document.querySelector('#exampleInputPassword1')

    drugSearchForm.addEventListener('submit',(event)=>{

    event.preventDefault()

    const d1=document.querySelector('input')

    

    console.log(d1.value)
    
    const messageOne=document.querySelector('#message1')
    const messageTwo=document.querySelector('#message2')
    const messageThree=document.querySelector('#message3')
    const messageFour=document.querySelector('#message4')
    const messageFive=document.querySelector('#message5')
    const messageSix=document.querySelector('#message6')
    const messageSeven=document.querySelector('#message7')
    const messageEight=document.querySelector('#message8')
    const messageNine=document.querySelector('#message9')
    const messageTen=document.querySelector('#message10')
    const messageEleven=document.querySelector('#message11')
    const messageTwelve=document.querySelector('#message12')
    const messageThirteen=document.querySelector('#message13')
    const messageFourteen=document.querySelector('#message14')

    messageOne.textContent='Loading.... '


    fetch('http://localhost:3000/search?rawMaterial='+d1.value).then((response)=>{
        response.json().then((data)=>{


            if(data.error){
                messageOne.textContent=data.error
            }

            else{
                if (data.RawMaterialName != " " ){
                    messageOne.textContent='Drug ID:   '+data.ID
                    messageTwo.textContent='Drug Name:  '+data.Name
                    messageThree.textContent='Raw Material Name:  '+data.RawMaterialName
                    messageFour.textContent='Raw Material Quantity: ' + data.RawMaterialQuantity + ' g'
                    messageFive.textContent='Raw Material Source: ' + data.Source
                }

                else {
                    messageOne.textContent='Details not Entered Yet'
                } 
                                
                //console.log("checkknnnnnnn/ " + data.RawMaterialUsedQuantity+"/")

                if (data.RawMaterialUsedName != " "){
                messageEleven.textContent='Drug ID:   '+data.ID
                messageTwelve.textContent='Drug Name:  '+data.Name
                messageSix.textContent='Used Raw Material Name:  '+ data.RawMaterialUsedName
                messageSeven.textContent='Used Raw Material Quantity:  '+ data.RawMaterialUsedQuantity + ' g'
                }  
                else {
                    messageEleven.textContent='Details Not Entered Yet'
                } 


                //console.log("checkknnnnnnn/ " + data.Price+"/")
                if (data.Price != " "){
                messageThirteen.textContent='Drug ID:   '+data.ID
                messageFourteen.textContent='Drug Name:  '+data.Name
                messageEight.textContent='Manufacturing Date:  '+ data.ManufacturedDate
                messageNine.textContent='Expiry Date:  '+ data.ExpiryDate
                messageTen.textContent='Price:  '+ data.Price + " Rs"       
                }  
                else {
                    messageThirteen.textContent='Details Not Entered Yet'
                }     

            }

            console.log('value from server:',data)
        })
        console.log('1kkk')

  

          

        })

    })

  


   
console.log("Packaging: client side javascript reached")

const packagingForm=document.querySelector('form')

packagingForm.addEventListener('submit',(event)=>{

        event.preventDefault()

                const DrugID=document.querySelector('#DrugID')
                const DrugName=document.querySelector('#DrugName')
                const ManufacturedDate=document.querySelector('#ManufacturedDate')
                const ExpiryDate=document.querySelector('#ExpiryDate')
                const Price=document.querySelector('#Price')
                
        
                console.log(DrugID.value)
                console.log(DrugName.value)
                console.log(ManufacturedDate.value)
                console.log(ExpiryDate.value)
                console.log(Price.value)
        
        
                fetch('http://localhost:3000/packaging?DrugID='+DrugID.value+'&DrugName=' + DrugName.value + '&ManufacturedDate='+ManufacturedDate.value
                        +'&ExpiryDate='+ExpiryDate.value +'&Price='+Price.value).then((response)=>{
                        response.json().then((data)=>{
                            if(data.error)
                            {
                                console.log(data.error)
                            }
        
                            else{
                                console.log('Packaging Details Sent to Blockchain')
                            }
                        })
                    })
                })

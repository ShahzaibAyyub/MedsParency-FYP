
console.log("client side javascript on the browser Manufacturing")

const weatherForm=document.querySelector('form')

weatherForm.addEventListener('submit',(event)=>{

        event.preventDefault()
        
        //console.log("ayyy")

                const RawMaterialUsedName=document.querySelector('#RawMaterialUsedName')
                const RawMaterialUsedQuantity=document.querySelector('#RawMaterialUsedQuantity')
                const DrugID=document.querySelector('#DrugID')
                const DrugName=document.querySelector('#DrugName')
        
                console.log(DrugID.value)
                console.log(DrugName.value)
                console.log(RawMaterialUsedName.value)
                console.log(RawMaterialUsedQuantity.value)
        
        
        
                fetch('http://localhost:3000/manufacturing?DrugID='+DrugID.value+'&DrugName=' + DrugName.value + '&RawMaterialUsedName='+RawMaterialUsedName.value
                        +'&RawMaterialUsedQuantity='+RawMaterialUsedQuantity.value).then((response)=>{
                        response.json().then((data)=>{
                            if(data.error)
                            {
                                console.log(data.error)
                            }
        
                            else{
                                console.log('Raw Material Info Sent to Blockchain')
                            }
                        })
                    })
                })

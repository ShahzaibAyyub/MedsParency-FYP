
console.log("client side javascript on the browser")

const weatherForm=document.querySelector('form')

weatherForm.addEventListener('submit',(event)=>{

        event.preventDefault()

        
        const RawMaterialName=document.querySelector('#RawMaterialName')
        const RawMaterialQuantity=document.querySelector('#RawMaterialQuantity')
        const RawMaterialSource=document.querySelector('#RawMaterialSource')
        const DrugID=document.querySelector('#DrugID')
        const DrugName=document.querySelector('#DrugName')

        console.log(DrugID.value)
        console.log(DrugName.value)
        console.log(RawMaterialName.value)
        console.log(RawMaterialQuantity.value)
        console.log(RawMaterialSource.value)

        fetch('http://localhost:3000/pharmacy?DrugID='+DrugID.value+'&DrugName=' + DrugName.value + '&RawMaterialName='+RawMaterialName.value
                +'&RawMaterialQuantity='+RawMaterialQuantity.value + '&RawMaterialSource=' + RawMaterialSource.value).then((response)=>{
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



/*
        const weatherForm=document.querySelector('form')

        weatherForm.addEventListener('submit',(event)=>{
        
                event.preventDefault()
        
                
                const RawMaterialName=document.querySelector('#RawMaterialName')
                const RawMaterialQuantity=document.querySelector('#RawMaterialQuantity')
                const RawMaterialSource=document.querySelector('#RawMaterialSource')
                const DrugID=document.querySelector('#DrugID')
                const DrugName=document.querySelector('#DrugName')
        
        
        
        
                fetch('http://localhost:3000/pharmacy?DrugID='+DrugID.value+'&DrugName=' + DrugName.value + '&RawMaterialName='+RawMaterialName.value
                        +'&RawMaterialQuantity='+RawMaterialQuantity.value + '&RawMaterialSource=' + RawMaterialSource.value).then((response)=>{
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

*/
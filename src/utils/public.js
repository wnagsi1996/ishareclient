import api from '@/api/index.js'
 

export const saveId=(u)=>{
	api.user.savetjID({u}).then(res=>{
		if(res.rescode==0){
			console.log('ID submitted successfully')
		}
	}).catch(xhr=>{
		
	})
}


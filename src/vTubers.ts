import hermitpurple from 'hermitpurple';
import get from 'axios';

export const wiki = async (data: string) => {

let obj={}
const wikia = new hermitpurple("virtualyoutuber", 1); // fandom, search limit
try{
await  wikia.search(data).then(async(a)=>{
     await a
    //console.log(a[0])
let id=Number(a[0].id)
let img= a[0].img
await get(`https://virtualyoutuber.fandom.com/api.php?action=query&prop=revisions&pageids=${id}&rvprop=content&format=json`).then(async (rp)=>{
var data = rp.data.query.pages[id].revisions[0]['*']
//console.log(data)
var s1= data.split('{{')
//console.log(s1)
var s2 = s1.filter(m=>m.includes('channel'))
//console.log(s2)
var s3= s2[0].split('|')
var s4 = s3.filter(m=>m.includes('='))
//console.log(s4)
var s5 = s4.filter(m=>!m.includes('}}')&&!m.includes('=='))
//console.log(s5)
var s6 =data.split('\n')
var s7 =s6.filter(m=>!m.includes('}}')&&!m.includes('==')&&!m.includes('=')&&m.includes(`'''`))
s5.push(`description  = ${s7[0].replace(` '''`,'* ').replace(`'''`,'*')}`)
s5.push(`image_url  = ${img}`)
s5.push(`more  = ${a[0].url}`)


for (const key of s5) {
    var e1= [key][0].split('=')
    var e2 = e1[0].trim()
    obj[e2]=e1[1].replace(`\n`,'').replace('[','').replace(']','').replace('\n','').trim() 
}
//console.log(obj)
return  obj
})
})}catch(err){
  console.log("vTuber not Found")
  obj = null
}
return  obj
}
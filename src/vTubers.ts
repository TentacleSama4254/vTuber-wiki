const HermitPurple = require('hermitpurple').default
import axios from 'axios'

export const wiki = async (data: string): Promise<IVtuber | null> => {
    const obj: Partial<IVtuber> = {}
    const wikia = new HermitPurple('virtualyoutuber', 1) // fandom, search limit
    try {
        const a = await wikia.search(data)
        const id = Number(a[0].id)
        const img = a[0].img
        const { data: resp } = await axios.get(
            `https://virtualyoutuber.fandom.com/api.php?action=query&prop=revisions&pageids=${id}&rvprop=content&format=json`
        )
        const resdata = resp.query.pages[id].revisions[0]['*']
        const s = resdata
            .split('{{')
            ?.filter((m: string) => m.includes('channel'))[0]
            .split('|')
            .filter((m: string) => m.includes('='))
        const s2 = s.filter((m: string) => !m.includes('}}') && !m.includes('=='))
        s2.push(
            `description  = ${resdata
                .split('\n')
                .filter(
                    (m: string) => !m.includes('}}') && !m.includes('==') && !m.includes('=') && m.includes(`'''`)
                )[0]
                .replace(` '''`, '* ')
                .replace(`'''`, '*')}`,
            `image_url  = ${img}`,
            `more  = ${a[0].url}`
        )

<<<<<<< HEAD
let obj:any={}
const wikia =new HermitPurple("virtualyoutuber", 1); // fandom, search limit
try{
await  wikia.search(data).then(async(a:any)=>{
     await a
    //console.log(a[0])
let id=Number(a[0].id)
let img= a[0].img
await get(`https://virtualyoutuber.fandom.com/api.php?action=query&prop=revisions&pageids=${id}&rvprop=content&format=json`).then(async (rp)=>{
var data = rp.data.query.pages[id].revisions[0]['*']
//console.log(data)
var s1= data.split('{{')
//console.log(s1)
var s2 = s1.filter((m:string)=>m.includes('channel'))
//console.log(s2)
var s3= s2[0].split('|')
var s4 = s3.filter((m:string)=>m.includes('='))
//console.log(s4)
var s5 = s4.filter((m:string)=>!m.includes('}}')&&!m.includes('=='))
//console.log(s5)
var s6 =data.split('\n')
var s7 =s6.filter((m:string)=>!m.includes('}}')&&!m.includes('==')&&!m.includes('=')&&m.includes(`'''`))
s5.push(`description  = ${s7[0].replace(` '''`,'* ').replace(`'''`,'*')}`)
s5.push(`image_url  = ${img}`)
s5.push(`more  = ${a[0].url}`)


for (const key of s5) {
    var e1= [key][0].split('=')
    var e2 = e1[0].trim()
    obj[e2]=e1[1].replace(`\n`,'').replace('[','').replace(']','').replace('\n','').trim() 
=======
        for (const key of s2) {
            const e1 = [key][0].split('=')
            const e2 = e1[0].trim()
            obj[e2 as keyof IVtuber] = e1[1]
                .replace(`\n`, '')
                .replace('[', '')
                .replace(']', '')
                .replace('\n', '')
                .trim()
        }
        return obj as IVtuber
    } catch (err) {
        return null
    }
>>>>>>> ca0c50d45a5c3708013c83b2012628218325cf6d
}

export interface IVtuber {
    title1: string
    image1: string
    caption1: string
    original_name: string
    nick_name: string
    debut_date: string
    character_designer: string
    affiliation: string
    channel: string
    social_media: string
    official_website: string
}

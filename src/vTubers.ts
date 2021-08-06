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

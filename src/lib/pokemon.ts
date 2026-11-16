


export default function idFromUrl(url: string): number {

// url.includes("https://pokeapi.co/api/v2/pokemon/")

    if (url.length > 34) {
        let idSlice = url.slice(34);
        if (idSlice.charAt(idSlice.length - 1) === '/') {
            return Number(idSlice.substring(0, idSlice.length -1))
        } else {
            return Number(idSlice)

        }
    } else {
        throw new Error ("No Pokemon ID found in URL")
    }

    

}
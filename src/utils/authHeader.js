export default async function authHeader () {
    const { store } = (await import("../redux/store"))
    if(!store) return {}
    const accessToken = store.getState().authState.userInfo.token
    if(!accessToken) return {}
    return { Authorization: `Bearer ${accessToken}`} 
}
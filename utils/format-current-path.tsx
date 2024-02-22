/**
 * @description
 * formatCurrentPath: format current path to be more readable
 * example from /master/user/page to Master User Page
 * @param path string path to be formatted
 * @todo provide functional to breadcrumb component
 * 
 * @returns string formatted path
 * 
 * @example
 * formatCurrentPath('/master/user/page')
 */
const formatCurrentPath = (path: string) => {
    if (path === null) {
        return '';
    }
    const pathArray = path.replace(/-/g, ' ').split('/')
    const formattedPath = pathArray.map((path) => {
        if (path === '') {
            return ''
        }
        return path[0].toUpperCase() + path.slice(1)
    })
    return formattedPath.join(' ')
}

export default formatCurrentPath
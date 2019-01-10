
const serverURL = 'https://kd-api.palmfuture.space';

export const generatePathPO = (pathPO) => {
    if (pathPO === '//none') {
        return pathPO;
    } else {
        return `${serverURL}/${pathPO}`;
    }
}

export const selectPDFicon = (pathPO) => {
    if (pathPO === '//none') {
        return 'red';
    } else {
        return 'green';
    }
}
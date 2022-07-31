/**
 * set alert
 */

const setAlert = ( msg , type="danger" ) =>{

    return `<p class="alert alert-${type} d-flex justify-content-between"> ${msg} <button class="btn-close" data-bs-dismiss="alert"></button></p>`;

}

/**
 * READE LS value
 */

const readeLSData = (key) =>{

    if (localStorage.getItem(key)) {
        
        return JSON.parse(localStorage.getItem(key));

    } else {
        
        return false;

    }

}


/**
 * Create LS value
 */

const createLSData = (key,value) =>{

    let data = [];

    if (localStorage.getItem(key)) {
        
        data = JSON.parse(localStorage.getItem(key));

    }

    data.push(value);

    localStorage.setItem(key , JSON.stringify(data));

}

/**
 * update LS value
 */

const updateLSData = (key,array) =>{

    localStorage.setItem(key , JSON.stringify(array));

}
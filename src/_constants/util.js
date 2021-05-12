import queryString from 'query-string'
export const util = {
    setValue,
    authHeader,
    jsonRespuesta,
    obtenerParametro,
    actualizarHistoriaNavegador
}

function setValue(e) {
    this.setState({ [e.target.id]: e.target.value });
}

function authHeader() {
    return { 'Content-Type': 'application/json' };
}

function jsonRespuesta(response) {
    return response.json();
}

function obtenerParametro(search, nombre, valorDefecto) {
    const values = queryString.parse(search)
    console.log(search);
    
    let value = values[nombre];
    if (value == null || value === "")
        value = valorDefecto;
    return value;
}

function actualizarHistoriaNavegador(props, location, data) {
    let url = queryString.stringify(data);
    console.log(location);
    url = "?" + url;
    props.history.push({
        pathname: location.pathname,
        search: url
    });
}
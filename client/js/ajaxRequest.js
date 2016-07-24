export default function ajaxRequest(opts) {
  let {
    url = '/',
    method = 'GET',
    callback = () => {},
    data = {},
  } = opts;

  let xhr = new XMLHttpRequest();

  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));
  xhr.onreadystatechange = () => {
    if(xhr.status === 200 && xhr.readyState === 4) {
      callback(xhr.responseText);
    }
  };
}
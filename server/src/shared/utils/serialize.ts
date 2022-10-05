interface serializeObject {
  [title: string]: string;
}

export function serialize(obj: serializeObject) {
  let str: string[] = [];

  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      str.push(encodeURIComponent(prop) + "=" + encodeURIComponent(obj[prop]));
    }
  }
  return str.join("&");
}

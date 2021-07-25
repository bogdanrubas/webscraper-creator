export default function deleteElement(id: string, state: any) {
  let arr = [...state];

  for (let i = 0; i < arr.length; i++) {
    let depth = arr[i];

    if (depth.id === id) {
      arr.splice(i, 1);
    }
  }

  return arr;
}

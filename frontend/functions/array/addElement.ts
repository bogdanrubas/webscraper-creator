export default function addElement(element: any, state: any, setState: any) {
  let arr = [...state];

  arr.push(element);
  setState(arr);
}

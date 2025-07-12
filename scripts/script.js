//implementation
class Node{
  constructor(data){
    this.data = data;
    this.next = null;
  }
}

class LinkedList{
  constructor(){
    this.head = null;
    this.length = 0;
  }

  //insert at beginning
  insertAtBeginning(val) {
    const newNode = new Node(val);
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
  }

  //insert at end
  insertAtEnd(val) {
    const newNode = new Node(val);
    if(!this.head){
      this.head = newNode;
    }else{
      let temp = this.head;
      while(temp.next){
        temp = temp.next;
      }
      temp.next = newNode;
    }
    this.length++;
  }

  //insert at specific position
  insertAtPosition(val, position){
    if(position < 0 || position > this.length){
      throw new Error("Invalid position");
    }

    if(position === 0) {
      this.insertAtBeginning(val);
      return;
    }

    const newNode = new Node(val);
    let temp = this.head;
    for(let i = 0; i < position - 1; i++) {
      temp = temp.next;
    }

    temp.next = newNode;
    newNode.next = temp.next;
    this.length++;
  }

  //delete by value
  deleteByValue(val) {
    if(!this.head){
      return false;
    }

    if(this.head.data === val) {
      this.head = this.head.next;
      this.length--;
      return true;
    }

    let temp = this.head;
    while(temp.next && temp.next.data !== val) {
        temp = temp.next;
      }

    if(temp.next) {
      temp.next = temp.next.next;
      this.length--;
      return true;
    }
    return false;
  }
  
  // search
  search(val) {
    let temp = this.head;
    let position = 0;
    while(temp){
      if(temp.data === val) return position;
      temp = temp.next;
      position++;
    }
    return -1; // not found
  }

  getHead(){
    return this.head? this.head.data : null;
  }

  getTail(){
    if(!this.head) return null;
    let temp = this.head;
    while(temp.next){
      temp = temp.next;
    }
    return temp.data;
  }

  // to array
  toArray() {
    const arr = [];
    let temp = this.head;
    while(temp) {
      arr.push(temp.data);
      temp = temp.next;
    }
    return arr;
  }

  // clear the list
  clear() {
    this.head = null;
    this.length = 0;
  }

  // check if list is empty
  isEmpty() {
    return this.length === 0;
  }

  // get len
  getLength() {
    return this.length;
  }
}

// -----------------------------------------------
const linkedlist = new LinkedList();

const listContainer = document.getElementById('listContainer');
const emptyState = document.getElementById('emptyState');
const nodeValueInput = document.getElementById('nodeValue');
const nodePositionInput = document.getElementById('nodePosition');
const listLength = document.getElementById('listLength');
const headValue = document.getElementById('headValue');
const tailValue = document.getElementById('tailValue');
const operationResult = document.getElementById('operationResult');

// -------------------------------------------

function getInputValue(){
  const val = Number.parseInt(nodeValueInput.value);
  if(isNaN(val)) throw new Error("Invalid input value");
  return val;
}

function getPositionValue(){
  const pos = Number.parseInt(nodePositionInput.value);
  if(isNaN(pos) || pos < 0) throw new Error("Invalid position value");
  return pos;
}

function clearInputs(){
  nodeValueInput.value = '';
  nodePositionInput.value = '';
}

function updateStatus(){
  listLength.textContent = linkedlist.getLength();
  headValue.textContent = linkedlist.getHead() !== null ? linkedlist.getHead() : 'null';
  tailValue.testContent - linkedlist.getTail() !== null? linkedlist.getTail() : 'null';
}
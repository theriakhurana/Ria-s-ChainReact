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

    newNode.next = temp.next;
    temp.next = newNode;
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
  tailValue.textContent = linkedlist.getTail() !== null? linkedlist.getTail() : 'null';
}

function showResult(msg, type="info"){
  operationResult.textContent = msg;
  operationResult.className = `operation-result ${type}`;

  // clear after 4 seconds
  setTimeout(() => {
    operationResult.textContent = "Ready for operations";
    operationResult.className = "operation-result";
  }, 4000);
}

function createNode(value, index, isHighlighted = false, isFound = false){
  const nodeDiv = document.createElement('div');
  nodeDiv.className = `node ${isHighlighted ? "highlight" : ""} ${isFound ? "found" : ""}`

  nodeDiv.innerHTML = 
  `
    <div class="node-value">${value}</div>
    <div class="node-label">${index === 0 ? "Head" : `Node ${index}`}</div>

  `;
  return nodeDiv;
}

function createArrow(){
  const arrowDiv = document.createElement('div');
  arrowDiv.className = "arrow";
  arrowDiv.innerHTML = '<i class="fas fa-arrow-right"></i>';
  return arrowDiv;
}

function createNullElement(){
  const nullDiv = document.createElement('div');
  nullDiv.className = "null-pointer";
  nullDiv.textContent = "NULL";
  return nullDiv;
}

function visualizeList(highlightedIndex = -1, foundIndex = -1){
  // empty container
  listContainer.innerHTML = '';

  if(linkedlist.isEmpty()){
    listContainer.appendChild(emptyState);
    updateStatus();
    return;
  }

  const values = linkedlist.toArray();

  values.forEach((value, index) => {
    const isHighlighted = index === highlightedIndex;
    const isFound = index === foundIndex;

    // create node
    const node = createNode(value, index, isHighlighted, isFound);
    listContainer.appendChild(node);

    // add arrow (not on last node)
    if(index < values.length - 1){
      listContainer.appendChild(createArrow());
    }
  })

  // null at the end
  listContainer.appendChild(createArrow());
  listContainer.appendChild(createNullElement());

  updateStatus();
}

// operations

function insertAtBeginning(){
  try{
    const value = getInputValue();
    linkedlist.insertAtBeginning(value);
    visualizeList(0); // highlight the new head
    showResult(`Inserted ${value} at the beginning`, "success");

    clearInputs();

  } catch(error) {
    showResult(error.message, "error");
  }
}

function insertAtEnd(){
  try{
    const value = getInputValue();
    const oldLen = linkedlist.getLength();
    linkedlist.insertAtEnd(value);
    visualizeList(oldLen); // highlight the new tail
    showResult(`Inserted ${value} at the end`, "success");

    clearInputs();

  } catch (error) {
    showResult(error.message, "error");
  }
}

function insertAtPosition(){
  try{
    const value = getInputValue();
    const position = getPositionValue();
    linkedlist.insertAtPosition(value, position);
    visualizeList(position); // highlight it
    showResult(`Inserted ${value} at position ${position}`, "success");

    clearInputs();

  } catch (error) {
    showResult(error.message, "error");
  }
}

function deleteByValue(){
  try{
    const value = getInputValue();
    const deleted = linkedlist.deleteByValue(value);
    if(deleted) {
      visualizeList();
      showResult(`Deleted ${value}`, "success");
    } else{
      showResult(`Value ${value} not found in the list`, "error");
    }

    clearInputs();

  } catch(error){
    showResult(error.message, "error");
  }
}

function searchValue(){
  try{
    const value = getInputValue();
    const position = linkedlist.search(value);
    if(position !== -1){
      visualizeList(-1, position); // highlight found node
      showResult(`Found ${value} at position ${position}`, "success");
    } else{
      visualizeList();
      showResult(`Value ${value} not found in the list`, "error");
    }

    clearInputs();

  } catch(error){
    showResult(error.message, "error");
  }
}

function clearList(){
  linkedlist.clear();
  visualizeList();
  showResult("List cleared successfully", "success");
  clearInputs();
} 


// Code section functions
function showTab(tabName){
  //hide all tabs
  document.querySelectorAll('.code-tab').forEach(tab => tab.classList.remove("active"));

  //remove active class from tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove("active"));

  // show
  document.getElementById(`tab-${tabName}`).classList.add('active');

  // activate button
  event.target.classList.add('active'); 
}
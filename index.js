
//1
class ListItem {
    constructor(v) {
        this._data = v;
        this.next = null;
        this.prev = null;
    }
    get data() {
        return this._data;
    }
    set data(v) {
        this._data = v;
    }
}

class LinkedList {
    constructor(...args) {
        this.length = 0;
        this.head = null;
        this.tail = null;
        for (const value of args) {
            this.push(value);
        }
    }

    push(value) {
        const newItem = new ListItem(value);
        if (this.length === 0) {
            this.head = newItem;
            this.tail = newItem;
        } else {
            this.tail.next = newItem;
            newItem.prev = this.tail;
            this.tail = newItem;
        }
        return ++this.length;
    }

    pop() {
        if (this.length === 0) return null;
        const deleted = this.tail;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        this.length--;
        return deleted;
    }

    shift() {
        if (this.length === 0) return null;
        const deleted = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        this.length--;
        return deleted;
    }

    unshift(value) {
        const newItem = new ListItem(value);
        if (this.length === 0) {
            this.head = newItem;
            this.tail = newItem;
        } else {
            newItem.next = this.head;
            this.head.prev = newItem;
            this.head = newItem;
        }
        return ++this.length;
    }

    deleteItem(value) {
        let currentItem = this.head;
        while (currentItem !== null) {
            if (currentItem.data === value) {
                if (currentItem === this.head) {
                    return this.shift();
                }
                if (currentItem === this.tail) {
                    return this.pop();
                }
                currentItem.prev.next = currentItem.next;
                currentItem.next.prev = currentItem.prev;
                this.length--;
                return currentItem;
            }
            currentItem = currentItem.next;
        }
        return null;
    }

    addNthElement(data, position) {
        if (position < 0 || position > this.length) {
            console.log("Invalid position");
            return;
        }

        const newItem = new ListItem(data);

        if (position === 0) {
            return this.unshift(data);
        }

        if (position === this.length) {
            return this.push(data);
        }

        let currentItem = this.head;
        let index = 0;

        while (currentItem !== null && index < position) {
            currentItem = currentItem.next;
            index++;
        }

        newItem.next = currentItem;
        newItem.prev = currentItem.prev;
        currentItem.prev.next = newItem;
        currentItem.prev = newItem;

        this.length++;
    }

    toArray() {
        const arr = [];
        for (const item of this) {
            arr.push(item.data);
        }
        return arr;
    }

    [Symbol.iterator]() {
        return new LinkedListIterator(this);
    }
}

class LinkedListIterator {
    constructor(list) {
        this.list = list;
        this.currentNode = null;
    }

    next() {
        this.currentNode = this.currentNode ? this.currentNode.next : this.list.head;
        return {
            value: this.currentNode,
            done: !this.currentNode,
        };
    }
}


const ll = new LinkedList(1, 2, 3, 4);


console.log(ll.toArray()); 

ll.deleteItem(3); 
console.log(ll); 

ll.addNthElement(5, 1); 
console.log(ll.toArray()); 


//2+3
class MyCollection {
  constructor() {
    this.counter = 0;
  }

  add(value) {
    this.counter++;
    this[`*${this.counter}*`] = value;
  }

  get(key) {
    return this[key];
  }

  delete(key) {
    delete this[key];
  }

  [Symbol.iterator]() {
    const keys = Object.keys(this);
    let index = 0;

    return {
      next: () => {
        if (index < keys.length - 1) {
          const key = keys[index];
          index++;
          return { value: this[key], done: false };
        } else {
          return { done: true };
        }
      },
    };
  }
}

const collection = new MyCollection();
collection.add("first value");
collection.add("second value");
collection.add("third value");

console.log(collection);

//4


//4
class Stack {
    constructor(maxSize, ...arr){
        this._maxSize = maxSize;
        this._size = 0;
        
       for (const item of arr) {
            this.push(item)
       }
    }
    get size() {
        return this._size;
    }
    get isEmpty() {
        return this._size === 0;
    }
    push(value) {
        
        if (this._size >= this._maxSize) {
            throw new RangeError('Stack overflow')
        }
        this[`_${this._size}`] = value;
        this._size++;
        return this._size;
    }
    pop(){
        
        if (this._size <= 0) {
            return
        }
        const lastItem = this[`_${this._size - 1}`];
        delete this[`_${this._size - 1}`];
        this._size--;
        return lastItem;
    }
    pick() {
        return this[`_${this._size - 1}`];
    }
}


const brackets = {
    '(': ')',
    '{': '}',
    '[': ']',
    '<': '>'
}

function isSequenceRight(str, brackets) {

    const stack = new Stack(str.length);
    const closeBrackets = Object.values(brackets);
    for (const symb of str) {
       if(brackets[symb]) {
        stack.push(symb);
        continue;
       }
       if (stack.isEmpty && closeBrackets.includes(symb)) {
        return false;
       }
       const lastItemFromStack = stack.pick();
       const correctCloseBracket = brackets[lastItemFromStack];
       if (symb === correctCloseBracket) {
        stack.pop();
        continue;
       } 
       if (closeBrackets.includes(symb)) {
        return false;
       }
      
    }

    return stack.isEmpty;
}

console.log(isSequenceRight("((){})", brackets)); 
console.log(isSequenceRight("({[]})", brackets)); 
console.log(isSequenceRight("(]><{{]]", brackets)); 
console.log(isSequenceRight("([{<>}])", brackets)); 



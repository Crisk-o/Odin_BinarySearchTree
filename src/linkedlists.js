export class Node{
    constructor(info){
        this.info = info;
        this.nextNode = null;
    }
    toString() { return `Node(${this.info}) `; }
}

export class LinkedLists{
    // give constructor a node to be the head/root
    constructor(rootNode){
        this.root = rootNode;
    }
    //gets root Node
    head(){
        if(this.root == null){
            return undefined;
        }
        return this.root;
    }
    //gets tail Node
    tail(){
        let head = this.root;
        if(head == null){
            return undefined;
        }
        while(head.nextNode !== null){
            head = head.nextNode;
        }
        return head.toString();
    }
    // creates a node w/ provided value, 
    // newNode placed at beginning of LL.
    prepend(value){
        let newNode = new Node(value);
        if(this.root === null){
            this.root = newNode;
        }
        newNode.nextNode = this.root;
        this.root = newNode;
    }
    // create node, place at end of LL.
    append(value){
        let prev = null;
        let head = this.root;
        let newNode = new Node(value);
        if(head === null){
            head = newNode;
        }
        while(head.nextNode !== null){ // go to end of
            head = head.nextNode;
        }
        head.nextNode = newNode;
    }
    
    printLL(){
        let current = this.root;
        while(current !== null){
            console.log(current.toString());
            current = current.nextNode;
        }
        console.log(" ");
    }

    size(){
        let count = 0;
        let head = this.root;
        if(head === null || head === undefined)
            return 0;
        while(head !== null){
            count ++;
            head = head.nextNode;
        }
        return count;
    }
    atIndex(index){
        let count = 0;
        let head = this.root;
        const size = this.size();
        if(index >= size){
            return undefined;
        }
        while(count != index && head.nextNode !== null){
            head = head.nextNode;
            count++;
        }
        return `Node at index ${index} is ${head.toString()}`;
    }
    //removes head node and returns its value
    pop(){
        if(this.root == null || this.root == undefined){
            return undefined;
        }
        let headVal = this.root.info;
        let newHead = this.root.nextNode;
        this.root = newHead;
        return headVal;

    }
    // returns t/f if value is in LL
    contains(value){
        let head = this.root;
        if(head === null){
            return false;
        }
        while(head !== null){
            if(head.info == value){
                return true;
            }
            head = head.nextNode;
        }
        return false;
    }
    // returns index of node w/ value. Returns undef if not in LL.
    findIndex(value){
        let index = 0;
        let head = this.root;
        if(head === null)
            return -1;

        while(head !== null){
            if(head.info === value){
                return index;
            }
            index++;
            head = head.nextNode;
        }
        return -1;
    }
    // inserts given values at given index. Retain order of LL.
    insertAt(index, ...values){
        let size = this.size();
        if(index >= size){
            throw RangeError();
        }
        let prev = null;
        let count = 0;
        let current = this.root;
        // move to given index
        while(count != index && current.nextNode !== null){
            prev = current;
            current = current.nextNode;
            prev.nextNode = current;
            count++;
        }
        // create one node/value and make connections
        // current node will be AT the index. prev is node right before index.
        for(let i = 0; i < values.length; i++){
            const newNode = new Node(values[i]);
            prev.nextNode = newNode;
            prev = newNode;
            newNode.nextNode = current; 
        }
        return prev;
    }
    removeAt(index){
        if(index == 0){
            this.pop();
        }
        let size = this.size();
        if(index >= size){
            throw RangeError();
        }
        let prev = null;
        let count = 0;
        let current = this.root;
        while(count != index && current.nextNode !== null){
            prev = current;
            current = current.nextNode;
            prev.nextNode = current;
            count++;
        }
        // current node will be AT the index. prev is node right before index.
        current = current.nextNode;
        prev.nextNode = current; // should overwrite the value;
    }
    isEmpty(){
        if(this.size() == 0) return true;
        return false;
    }

    toString(){
        let result = "";
        let head = this.root;
        if(head === null)
            return "";
        while(head !== null){
            result = result + head.toString() + "-> ";
            head = head.nextNode;
        }
        return result + "null\n";
    }

}
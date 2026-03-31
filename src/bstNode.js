import { LinkedLists } from "./linkedlists.js";
import { Queue } from "./queue.js";
export class BSTNode{
    constructor(info){
        this.left = null;
        this.right = null;
        this.info = info;
    }

    toString(){ return "Node(" + this.info + ")";}
}

export class Tree{
    constructor(array){
        this.sortedArray = this.sortArray(array);
        this.root = this.buildTree(this.sortedArray);
    }

    BSTadd(node, value){
        if(node == null){
            return new BSTNode(value);
        }
        if(value <= node.info){
            node.left = this.BSTadd(node.left, value);
        }
        else{
            node.right = this.BSTadd(node.right, value);
        }
        return node;
    }

    buildTree(array){
        const sorted = array;
        if(sorted.length === 0) return null;
        // Root should be the mid index of sorted array to keep tree balanced.
        let mid = Math.floor(sorted.length / 2);
        let newNode = new BSTNode(sorted[mid]);
        newNode.left = this.buildTree(sorted.slice(0,mid));
        newNode.right = this.buildTree(sorted.slice(mid+1));
        return newNode;
    }
    // sorts given array, removes dupes, and returns sorted array
    sortArray(array){
        const givenArr = array;
        for(let i = 0; i < givenArr.length-1; i++){
            let minIndex = i;
            for(let j = i+1; j < givenArr.length; j++){
                if(givenArr[j] < givenArr[minIndex]){
                    minIndex = j;
                }
                // for handling dupes.
                if(givenArr[j] == givenArr[i]){
                    givenArr.splice(j, 1);
                }
            }     
            // swapping array[i] and array[minIndex];
            let temp = givenArr[i];
            givenArr[i] = givenArr[minIndex];
            givenArr[minIndex] = temp;     
        }
        return givenArr;
    }
    // returns t/f if value is found in tree or not.
    includes(value){
        return this.includesHelper(this.root, value);
    }
    includesHelper(node, value){
        if(node == null){
            return null;
        }
        else if(value == node.info){
            return true;
        }
        // if value is less than node.info, 
        // value must be to left of node.
        else if(value <= node.info){
            return this.includesHelper(node.left, value);
        }
        return this.includesHelper(node.right, value);
    }
    // takes given value, creates bstnode, and places in tree.
    // if value already in tree, do nothing.
    insert(value){
        if(this.includes(value))
            return; // val in tree. Do nothing.
        let newNode = this.BSTadd(this.root, value);
    }

    
    deleteItem(value){}

    // traverses tree in breadth-first order
    // if no callback provided, throw an Error that callback is req.
    levelOrderForEach(callback){
        if(typeof callback !== "function"){
            throw new Error("Must provide a function as argument to levelOrderForEach");
        }
        if(this.root == null || this.root == undefined) return;
        
        let myQ = new Queue();
        myQ.enqueue(this.root);
        while(!myQ.isEmpty()){
            let current = myQ.dequeue();
            callback(current);
            if(current.left != null)
                myQ.enqueue(current.left);
            if(current.right != null)
                myQ.enqueue(current.right);
        }
    }
    // prints tree to console one node at time.
    printTree = (current) => {
        console.log(current.info + " ");
    };
    // traverse tree in respective depth-first orders. throw error if no callback provided.
    inOrderForEach(callback){}
    preOrderForEach(callback){}
    postOrderForEach(callback){}
    // returns height of node with given value. Return undef if not found.
    height(value){}
    // returns depth of node with given value. Return undef if not found.
    depth(value){}
    // checks if tree is balanced. 
    // height diff btwn left/right subtrees is no more than 1 
    //    and both left/right subtrees are also balanced.
    isBalanced(){};
    // Rebalances unbalanced trees. 
    // Use traversal method to provide new array to buildTree funct.
    rebalance(){}



}
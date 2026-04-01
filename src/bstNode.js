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
        this.sortedArray = this.#sortArray(array);
        this.root = this.#buildTree(this.sortedArray);
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

    #buildTree(array){
        const sorted = array;
        if(sorted.length === 0) return null;
        // Root should be the mid index of sorted array to keep tree balanced.
        let mid = Math.floor(sorted.length / 2);
        let newNode = new BSTNode(sorted[mid]);
        newNode.left = this.#buildTree(sorted.slice(0,mid));
        newNode.right = this.#buildTree(sorted.slice(mid+1));
        return newNode;
    }
    // sorts given array, removes dupes, and returns sorted array
    #sortArray(array){
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
        if(this.includesHelper(this.root, value))
            return true;

        return false;
    }
    // function iterates through tree to find node.
    includesHelper(node, value){
        if(node == null){
            return null;
        }
        else if(value == node.info){
            return node;
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

    // will return true on successful removal.
    deleteItem(value){
        // must search from root, find val, 3 cases:
        // 1) Leaf Node - cut tie from parent to child.
        // 2) Removing a Parent w/ one child - must connect parent of removed one to child of removed one.
        // 2.5) w/ two children - remove the val of 'removed' node itself w/ a child. must maintain rules of BST.  -- use min & max functions
        // predecessors and successors in alphabetical terms
        // 3) Removing Parents of Parents -
        if(this.includes(value)){
            this.deleteItemHelperRecursively(this.root, value);
        }
        else{
            return false;
        }
        return true;
    }
    // this is much better than my OG approach as it works for trees with large depths.
    // my prev iterative approach only handled shallow trees and was getting very long/difficult to work with.
    deleteItemHelperRecursively(node, value){
        if(node === null) return null;
        // searching for target....
        // The parent is "waiting" for the result of the function to update its pointer
        if(value < node.info){ // val is left of node
            node.left = this.deleteItemHelperRecursively(node.left, value);
        }
        else if(value > node.info){ // val is right of node
            node.right = this.deleteItemHelperRecursively(node.right, value);
        }
        // target found! value == node.info
        else{ 
            // case 1 and 2: Leaf and one child.
            /* Explanation:
                target node is found. Code enters 'else' block.
                code checks if target.left is null. If so, returns the right side.
                if target.right returns null, target node is updated with returned null value. (leaf)
                if target.right or target.left != null, returns that value and OVW target's val. (one child)                
            */
            if(node.left === null) return node.right; // <--- IF LEAF, WE EXIT HERE with null
            if(node.right === null) return node.left; // <--- IF ONE CHILD (LEFT), WE EXIT HERE
            // case 3: two children
            // get 'in-order' successor  (smallest in right subtree of target node)
            let successor = this.min(node.right);
            node.info = successor.info;
            node.right = this.deleteItemHelperRecursively(node.right, successor.info);
        }
        return node;
    }
    // finds smallest value in tree starting from node down.
    min(node){
        while(node.left !== null)
            node = node.left;
        return node;
    }
    // finds largest value in tree starting from node down.
    max(node){
        while(node.right !== null)
            node = node.right;
        return node;
    }
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

    // traverse tree in respective depth-first orders. throw error if no callback provided.
    // traverse tree: left -> root -> right
    inOrderForEach(callback){
        if(typeof callback !== "function"){
            throw new Error("Must provide a function as argument to inOrderForEach");
        }
        if(this.root == null || this.root == undefined) return;
        return this.inOrderHelper(this.root, callback); 
    }
    inOrderHelper(node, callback){
        if(node === null) return;
        // go left
        this.inOrderHelper(node.left, callback);
        // visit node
        callback(node);
        // go right
        this.inOrderHelper(node.right, callback);
        

    }
    // traverse tree: root -> left -> right
    preOrderForEach(callback){
        if(typeof callback !== "function"){
            throw new Error("Must provide a function as argument to preOrderForEach");
        }
        let current = this.root;
        if(current == null || current == undefined) return;
        callback(current);
        this.preOrderForEach(current.left);
        this.preOrderForEach(current.right);
    }
    // traverse tree: left -> right -> root
    postOrderForEach(callback){
        if(typeof callback !== "function"){
            throw new Error("Must provide a function as argument to postOrderForEach");
        }
        let current = this.root;
        if(current == null || current == undefined) return;
        this.postOrderForEach(current.left);
        this.postOrderForEach(current.right);
        callback(current);
    }

    // prints node to console. Pass to forEach traversal methods.
    printTree(current){
        if(current === null) return;
        console.log(current.info + " ");
    }
    // returns height of node with given value. Return undef if not found.
    height(value){
        if(this.includes(value)){
            let height = 0;            
            if(this.root.info == value){
                return height;
            }
            while(this.root.left != null || this.root.right != null){
                
                height++;
            }
            // traverse to target node.

            
        }
        return undefined;
    }
    // returns depth of node with given value. Return undef if not found.
    depth(value){
        if(this.includes(value)){

        }
        return undefined;
    }
    // checks if tree is balanced. 
    // height diff btwn left/right subtrees is no more than 1 
    //    and both left/right subtrees are also balanced.
    isBalanced(){};
    // Rebalances unbalanced trees. 
    // Use traversal method to provide new array to buildTree funct.
    rebalance(){}



}
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
            this.deleteItemHelper(this.root, value, this.root);
        }
        else{
            console.log(this.includes(value));
            return "Value not in tree.";
        }
        return true;
    }
    deleteItemHelper(node, value, parentNode){
        let parent = parentNode;        
        if(node === null) return;
        if(value == node.info){
            /* target node is a leaf node */
            if(node.left == null && node.right == null){
                if(parentNode.left == node)
                {
                    parentNode.left = null;
                }
                else if(parentNode.right == node){
                    parentNode.right = null;
                }
                return;
            }
            /* target has ONE child */
            else if((node.left != null && node.right == null) || (node.left == null && node.right != null)){
                // TARGET'S LEFT CHILD EXISTS. NO RIGHT.
                if(node.left != null){
                    // target node is the left child of parent. 
                    if(parentNode.left == node){
                        // grab target's left child's info.
                        let temp = node.left.info;
                        // place that info into target node, overwriting current val.
                        parentNode.left.info = temp;
                        node.left = null;
                    }
                    // target node is the right child of parent. 
                    else{ 
                        // grab target's left child's info.
                        let temp = node.left.info;
                        // place info into target node.
                        parentNode.right.info = temp;
                        // delete target node's child.
                        node.left = null;
                    }
                }
                // TARGET'S RIGHT CHILD EXISTS. NO LEFT.
                else if(node.right != null){
                        // target node is the left child of parent. 
                        if(parentNode.left == node){
                        // grab target's left child's info.
                        let temp = node.right.info;
                        // place that info into target node, overwriting current val.
                        parentNode.left.info = temp;
                        node.right = null;
                    }
                    // target node is the right child of parent. 
                    else{ 
                        // grab target's left child's info.
                        let temp = node.right.info;
                        // place info into target node.
                        parentNode.right.info = temp;
                        // delete target node's child.
                        node.right = null;
                    }
                }
            }
            /* target node has two children */
            else if(node.left != null && node.right != null){
                /* IF TARGET'S CHILDREN ARE PARENTS */
                 if(node.left.left != null || node.left.right != null || node.right.left != null || node.right.right != null){
                    
                 }
                ///////////////////////
                /* TARGET'S CHILDREN AREN'T PARENTS */
                // target is left of parent
                if(parentNode.left == node || parentNode.right == node){
                    // grab target's right child info.
                    let temp = node.right.info;
                    // target node val OVW.
                    node.info = temp;
                    node.right = null;
                    // left child stays.
                }
                // // target is right of parent
                // else if(parentNode.right == node){
                //     let temp = node.right.info;
                //     node.info = temp;
                //     node.right = null;

                // }
            }
        
        }
        else if(value < node.info){
            parentNode = node;
            this.deleteItemHelper(node.left, value, parentNode);
        }
        else{
            parentNode = node;  
            this.deleteItemHelper(node.right, value, parentNode);
        }
        // this.includesHelper(node.right, value);
        // this.includesHelper(node.left, value);
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
    inOrderForEach(callback){}
    preOrderForEach(callback){}
    postOrderForEach(callback){}

        // prints tree to console one node at time.
    printTree = (current) => {
        console.log(current.info + " ");
    };
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
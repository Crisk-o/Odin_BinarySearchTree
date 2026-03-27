export class BSTNode{
    constructor(info){
        this.left = null;
        this.right = null;
        this.info = info;
    }

    toString(){ return "BSTNode ( " + this.info + ")";}
}

export class Tree{
    constructor(array){
        this.root = this.buildTree(array);
    }

    BSTadd(node, value){
        if(node === null){
            return new BSTNode(value);
        }
        if(value <= node.info){
            node.left = BSTadd(node.left, value);
        }
        else{
            node.right = BSTadd(node.right, value);
        }
        return node;
    }
    buildTree(array){
        // create array of LL with size of 
        let root = null;
        let sorted = this.sortArray(array);
        for(let i = 0; i < sorted.length; i++){
            root = this.buildTree(root, sorted[i]);
        }
        return root;
    }
    // sorts given array and removes duplicate entries
    sortArray(array){
        let sortedArr = [];
        for(let i = 0; i < array.length-1; i++){
            let minIndex = i;
            for(let j = i+1; j < array.length; j++){
                if(array[j] < array[minIndex]){
                    minIndex = j;

                }
                // swapping array[i] and array[minIndex];
                let temp = array[i];
                array[i] = array[minIndex];
                array[minIndex] = temp;  
            }        
        }
        return sortedArr;

    }
}
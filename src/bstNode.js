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
        this.root = this.buildTree(array);
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
        const givenArr = array;
        let sorted = this.sortArray(givenArr);
        console.log("after sorting: " + sorted);
        for(let i = 0; i < sorted.length; i++){
            // let newNode = new BSTNode(sorted[i]);
            this.root = this.BSTadd(this.root, sorted[i]);
            
            // root = this.buildTree(root, sorted[i]);
        }
        return this.root;
    }
    // sorts given array, removes dupes, and returns sorted array
    sortArray(array){
        console.log("sortArray(): " + array);
        const givenArr = array;
        for(let i = 0; i < givenArr.length-1; i++){
            let minIndex = i;
            for(let j = i+1; j < givenArr.length; j++){
                if(givenArr[j] < givenArr[minIndex]){
                    minIndex = j;
                }
                // for handling dupes.
                if(givenArr[j] == givenArr[i]){
                    givenArr.splice(i, 1);
                }
            }     
            // swapping array[i] and array[minIndex];
            let temp = givenArr[i];
            givenArr[i] = givenArr[minIndex];
            givenArr[minIndex] = temp;     
        }
        return givenArr;
    }

}
export class Queue{
    //constructor to make a new empty queue
    constructor(){
        this.elements = new Array(5);
        this.numElements = 0;
        this.front = 0;
        this.rear = -1;
    }
    enlarge(){     //  O(N)
        let newArr = new Array(this.elements.length * 2);
        for(let i = 0, j = this.front; i < this.numElements; i++, j=(j+1)% this.elements.length) //  j is wrapping around elements array
            newArr[i] = elements[j];
        this.front = 0;
        this.rear = numElements-1;
        this.elements = newArr;
    }
    // enqueue operation
    // 1. create node for new eleemnt
    // 2. add new node at rear of queue
    // 3. update reference to rear of the queue
    // 4. Incremenet number of elements
    enqueue(val){
        if(this.isFull()){
            enlarge();
        }
        this.rear = (this.rear + 1) % this.elements.length; // ex: rear = 0, (0+1)%5 = 1%5=1, rear = 1- (1+1)%5=2, rear = 2....5%%=0 raar = 0.
        this.elements[this.rear] = val;
        this.numElements++;
        }


    isFull(){return this.numElements == this.elements.length;}
    isEmpty(){return this.numElements == 0;}

    dequeue(){
        let temp = this.elements[this.front];
        this.front = (this.front+1) % this.elements.length;
        this.numElements--;
        return temp;
    }

}
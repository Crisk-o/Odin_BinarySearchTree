import { BSTNode, Tree} from "./bstNode.js";
import { LinkedLists } from "./linkedlists.js";
import { Queue } from "./queue.js";
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.info}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}
let myArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 55];
let myTree = new Tree(myArr);


console.log("testing includes(): " + myTree.includes(4)); // true
myTree.levelOrderForEach(myTree.printTree);
console.log("testing insert(value): " + myTree.insert(33));
myTree.levelOrderForEach(myTree.printTree);
console.log("testing deleteItem(5555) (val not in tree): " + myTree.deleteItem(5555));
console.log("testing deleteItem(33) (leaf node): " + myTree.deleteItem(33));

prettyPrint(myTree.root);

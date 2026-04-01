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


console.log("testing includes(4): " + myTree.includes(4)); // true
console.log("testing insert(33): " + myTree.insert(33));
console.log("testing deleteItem(5555) (val not in tree): " + myTree.deleteItem(5555));
console.log("testing deleteItem(33) (leaf node): " + myTree.deleteItem(33));
prettyPrint(myTree.root);
console.log("testing deleteItem(8) (node w/ one child - on left): " + myTree.deleteItem(8));
prettyPrint(myTree.root);
console.log("testing deleteItem(7) (node w/ one child - on right): " + myTree.deleteItem(7));
prettyPrint(myTree.root);
console.log("testing deleteItem(3) (node w/ two children): " + myTree.deleteItem(3));
prettyPrint(myTree.root);
console.log("testing deleteItem(5) (node w/ one child who is parent): " + myTree.deleteItem(5));
prettyPrint(myTree.root);
// traversal testing:
myTree.levelOrderForEach(myTree.printTree);
console.log("preOrder: ");
myTree.preOrderForEach(myTree.printTree);
console.log("inOrder: ")
myTree.inOrderForEach(myTree.printTree);
console.log("postOrder: ");
myTree.postOrderForEach(myTree.printTree);



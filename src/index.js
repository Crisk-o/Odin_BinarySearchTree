import { BSTNode, Tree} from "./bstNode.js";
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}


let myArr = [5, 6, 6, 2, 4];
let myTree = new Tree(myArr);



console.log("Root: " + myTree.root.toString());
console.log("root: left=" + myTree.root.left + " & right=" + myTree.root.right)
console.log(prettyPrint(myTree));

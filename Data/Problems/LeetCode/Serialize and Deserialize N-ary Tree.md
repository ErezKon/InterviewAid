# 428. Serialize and Deserialize N-ary Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/serialize-and-deserialize-n-ary-tree](https://leetcode.com/problems/serialize-and-deserialize-n-ary-tree)
**Companies:** Amazon, Apple, Bloomberg, Google, Microsoft, Tiktok

---

## Problem Description

Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize an N-ary tree. An N-ary tree is a rooted tree in which each node has no more than N children. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that an N-ary tree can be serialized to a string and this string can be deserialized to the original tree structure.

For example, you may serialize the following `3-ary` tree (root `1` with children `3, 2, 4`; node `3` has children `5, 6`) as `[1 [3[5 6] 2 4]]`. Note that this is just an example, you do not necessarily need to follow this format.

Or you can follow LeetCode's level order traversal serialization format, where each group of children is separated by the null value. For example, a larger tree may be serialized as `[1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]`.

You do not necessarily need to follow the above-suggested formats, there are many more different formats that work so please be creative and come up with different approaches yourself.

**Constraints:**

- The number of nodes in the tree is in the range `[0, 10^4]`.
- `0 <= Node.val <= 10^4`
- The height of the n-ary tree is less than or equal to `1000`
- Do not use class member/global/static variables to store states. Your encode and decode algorithms should be stateless.

---

## Approach: Preorder with Child Count ✅

```text
FUNCTION serialize(root):
    IF root == null: RETURN ""
    tokens ← []
    FUNCTION dfs(node):
        tokens.APPEND(str(node.val))
        tokens.APPEND(str(LENGTH(node.children)))
        FOR child IN node.children:
            dfs(child)
    dfs(root)
    RETURN JOIN(tokens, ",")

FUNCTION deserialize(data):
    IF data == "": RETURN null
    tokens ← SPLIT(data, ",")
    index ← 0
    FUNCTION build():
        val ← INT(tokens[index]); index ← index + 1
        childCount ← INT(tokens[index]); index ← index + 1
        node ← NEW Node(val)
        FOR _ ← 1 TO childCount:
            node.children.APPEND(build())
        RETURN node
    RETURN build()
```

---

## Examples

```
Example 1:
  Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
  Output: [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
```

```
Example 2:
  Input: root = [1,null,3,2,4,null,5,6]
  Output: [1,null,3,2,4,null,5,6]
  (with the value + child-count preorder format: "1,3,3,2,5,0,6,0,2,0,4,0")
```

```
Example 3:
  Input: root = []
  Output: []
```

---

## Walkthrough

Take the N-ary tree `1` with children `2,3,4`; `3` has children `5,6`.

| Step | Action | Tokens consumed | Constructed node |
|------|--------|----------------|-----------------|
| 1 | deserialize root value `1` and child count `3` | `1,3` | node `1` |
| 2 | build first child: value `2`, count `0` | `2,0` | leaf `2` attached to `1` |
| 3 | build second child: value `3`, count `2` | `3,2` | node `3` attached to `1` |
| 4 | build `3`'s first child: `5,0` → leaf `5` |
| 5 | build `3`'s second child: `6,0` → leaf `6` |
| 6 | build third child of `1`: value `4`, count `0` → leaf `4` |

Resulting structure matches the original.

---

## Complexity Analysis

- **Time:** O(n) where n is total number of nodes (each node visited once).
- **Space:** O(n) for the serialized string and recursion stack.

---

## Follow-Up Questions

1. How would you modify the format to avoid recursion depth limits?
2. Can you design a compact binary representation instead of a comma-separated string?
3. How would you handle trees with duplicate node values?

---

## Key Takeaway

By recording each node’s value followed by its child count in preorder, an N-ary tree can be uniquely serialized and reconstructed without extra delimiters.

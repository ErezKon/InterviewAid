# 428. Serialize and Deserialize N-ary Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/serialize-and-deserialize-n-ary-tree](https://leetcode.com/problems/serialize-and-deserialize-n-ary-tree)
**Companies:** Amazon, Apple, Bloomberg, Google, Microsoft, Tiktok

---

## Problem Description

Design serialization/deserialization for an N-ary tree. Each node can have any number of children.

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

**Example 1:**
```
Input: root = [1,null,2,3,4,null,5,6]
Serialized: "1,3,2,0,3,2,5,0,6,0,4,0"
Deserialized tree matches the original N‑ary tree.
```
**Example 2:**
```
Input: root = []
Serialized: ""
Deserialized tree is null.
```

---

## Walkthrough

Take the N‑ary tree `1` with children `2,3,4`; `3` has children `5,6`.

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
2. Can you design a compact binary representation instead of a comma‑separated string?
3. How would you handle trees with duplicate node values?

---

## Key Takeaway

By recording each node’s value followed by its child count in preorder, an N‑ary tree can be uniquely serialized and reconstructed without extra delimiters.

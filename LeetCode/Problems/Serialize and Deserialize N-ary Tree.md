# 428. Serialize and Deserialize N-ary Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/serialize-and-deserialize-n-ary-tree](https://leetcode.com/problems/serialize-and-deserialize-n-ary-tree)
**Companies:** Amazon, Apple, Bloomberg, Google, Microsoft, Tiktok

---

## Problem Description

Design serialization/deserialization for an N-ary tree. Each node can have any number of children.

---

## Approach: Preorder with Child Count ✅

```
FUNCTION serialize(root):
    IF root == null: RETURN ""
    tokens = []
    FUNCTION dfs(node):
        tokens.ADD(str(node.val))
        tokens.ADD(str(len(node.children)))
        FOR child IN node.children:
            dfs(child)
    dfs(root)
    RETURN JOIN(tokens, ",")

FUNCTION deserialize(data):
    IF data == "": RETURN null
    tokens = data.SPLIT(",")
    idx = 0

    FUNCTION build():
        val = int(tokens[idx]); idx += 1
        numChildren = int(tokens[idx]); idx += 1
        node = Node(val)
        FOR _ ← 0 TO numChildren - 1:
            node.children.ADD(build())
        RETURN node

    RETURN build()
```

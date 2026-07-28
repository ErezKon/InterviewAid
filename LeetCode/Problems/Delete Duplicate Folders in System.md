# 1948. Delete Duplicate Folders in System

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/delete-duplicate-folders-in-system](https://leetcode.com/problems/delete-duplicate-folders-in-system)
**Companies:** Amazon, Bloomberg, Bookingcom, Google, Microsoft, Nvidia

---

## Problem Description

Given folder paths, delete all subtrees that are structurally identical (duplicate folder structures). Return remaining paths.

---

## Examples

**Example 1:**
```
Input: paths = ["/a","/a/b","/c/d","/c/e","/c/f","/c/d/g","/c/e/h","/c/f/i"]
Output: ["/a","/a/b"]
Explanation: The subtrees rooted at "/c" are identical in structure, so they are removed.
```

**Example 2:**
```
Input: paths = ["/a","/a/b","/a/c","/b/d","/b/e"]
Output: ["/a","/a/b","/a/c","/b/d","/b/e"]
Explanation: No duplicate subtrees exist, so all paths are kept.
```

---

## Approach: Trie + Serialization — O(n·L) ✅

```text
FUNCTION deleteDuplicateFolder(paths):
    // Build a trie from all folder paths
    root ← new TrieNode()
    FOR each path IN paths:
        parts ← split path by '/' ignoring empty
        node ← root
        FOR part IN parts:
            IF part NOT IN node.children:
                node.children[part] ← new TrieNode()
            node ← node.children[part]
    // Serialize subtrees bottom‑up
    map ← empty dictionary (serialization → count)
    FUNCTION serialize(node):
        IF node has no children:
            RETURN "()"
        childSerials ← []
        FOR name, child IN sorted(node.children):
            childSerials.APPEND(name + serialize(child))
        serial ← "(" + join(childSerials, "") + ")"
        map[serial] ← map.get(serial, 0) + 1
        RETURN serial
    serialize(root)
    // Mark nodes for deletion where serialization appears > 1
    FUNCTION mark(node, path):
        serial ← serialize(node) // reuse computed serial
        IF map[serial] > 1:
            RETURN // delete this subtree
        FOR name, child IN node.children:
            mark(child, path + "/" + name)
    result ← []
    mark(root, "")
    RETURN result
```

---

## Walkthrough

| Step | Action | Trie State / Notes |
|------|--------|--------------------|
| 1 | Insert "/a/b" | Creates nodes `a` → `b` |
| 2 | Insert "/c/d" | Creates nodes `c` → `d` |
| 3 | Insert "/c/e" | Adds sibling `e` under `c` |
| 4 | Insert remaining paths | Builds full trie with three identical subtrees under `c` |
| 5 | Serialize bottom‑up | Each leaf returns "()"; subtrees under `c` serialize to the same string |
| 6 | Count serializations | Serialization for each `c` child appears > 1, so marked for deletion |
| 7 | Collect remaining paths | Only paths not under a marked subtree are kept |

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × L) where L = max path length |
| **Space** | O(n × L) |

---

## Follow-Up Questions

1. How would you modify the algorithm to delete only *one* instance of each duplicate subtree instead of all duplicates?
2. Can this approach be adapted to handle file systems where folder names may contain special characters or spaces?
3. What changes are needed if the input is given as a tree structure rather than a list of paths?

---

## Key Takeaway

> **Subtree deduplication via serialization: serialize each subtree bottom‑up into a canonical string, count occurrences, and delete any subtree whose serialization appears more than once.**
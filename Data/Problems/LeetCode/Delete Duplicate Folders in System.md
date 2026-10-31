# 1948. Delete Duplicate Folders in System

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/delete-duplicate-folders-in-system](https://leetcode.com/problems/delete-duplicate-folders-in-system)
**Companies:** Amazon, Bloomberg, Bookingcom, Google, Microsoft, Nvidia

---

## Problem Description

Due to a bug, there are many duplicate folders in a file system. You are given a 2D array `paths`, where `paths[i]` is an array representing an absolute path to the `i`<sup>th</sup> folder in the file system.

- For example, `["one", "two", "three"]` represents the path `"/one/two/three"`.

Two folders (not necessarily on the same level) are **identical** if they contain the **same non-empty** set of identical subfolders and underlying subfolder structure. The folders **do not** need to be at the root level to be identical. If two or more folders are **identical**, then **mark** the folders as well as all their subfolders.

- For example, folders `"/a"` and `"/b"` in the file structure below are identical. They (as well as their subfolders) should **all** be marked:
  - `/a`
  - `/a/x`
  - `/a/x/y`
  - `/a/z`
  - `/b`
  - `/b/x`
  - `/b/x/y`
  - `/b/z`
- However, if the file structure also included the path `"/b/w"`, then the folders `"/a"` and `"/b"` would not be identical. Note that `"/a/x"` and `"/b/x"` would still be considered identical even with the added folder.

Once all the identical folders and their subfolders have been marked, the file system will **delete** all of them. The file system only runs the deletion once, so any folders that become identical after the initial deletion are not deleted.

Return *the 2D array* `ans` *containing the paths of the **remaining** folders after deleting all the marked folders. The paths may be returned in **any** order*.

**Constraints:**

- `1 <= paths.length <= 2 * 10^4`
- `1 <= paths[i].length <= 500`
- `1 <= paths[i][j].length <= 10`
- `1 <= sum(paths[i][j].length) <= 2 * 10^5`
- `path[i][j]` consists of lowercase English letters.
- No two paths lead to the same folder.
- For any folder not at the root level, its parent folder will also be in the input.

---

## Examples

```
Example 1:
  Input: paths = [["a"],["c"],["d"],["a","b"],["c","b"],["d","a"]]
  Output: [["d"],["d","a"]]
  Explanation: The file structure is:
    /a/b, /c/b, /d/a
  Folders "/a" and "/c" (and their subfolders) are marked for deletion because they both contain
  an empty folder named "b".
```

```
Example 2:
  Input: paths = [["a"],["c"],["a","b"],["c","b"],["a","b","x"],["a","b","x","y"],["w"],["w","y"]]
  Output: [["c"],["c","b"],["a"],["a","b"]]
  Explanation: The file structure is:
    /a/b/x/y, /c/b, /w/y
  Folders "/a/b/x" and "/w" (and their subfolders) are marked for deletion because they both contain
  an empty folder named "y".
  Note that folders "/a" and "/c" are identical after the deletion, but they are not deleted because
  they were not marked beforehand.
```

```
Example 3:
  Input: paths = [["a","b"],["c","d"],["c"],["a"]]
  Output: [["c"],["c","d"],["a"],["a","b"]]
  Explanation: All folders are unique in the file system.
  Note that the returned array can be in a different order as the order does not matter.
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
    // Serialize subtrees bottom-up
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
| 5 | Serialize bottom-up | Each leaf returns "()"; subtrees under `c` serialize to the same string |
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

> **Subtree deduplication via serialization: serialize each subtree bottom-up into a canonical string, count occurrences, and delete any subtree whose serialization appears more than once.**
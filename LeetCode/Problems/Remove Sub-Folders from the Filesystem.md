# 1233. Remove Sub-Folders from the Filesystem

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-sub-folders-from-the-filesystem](https://leetcode.com/problems/remove-sub-folders-from-the-filesystem)
**Companies:** Amazon, Google, Meta, Microsoft, Nuro, Snowflake, Uber, Verkada

---

## Approach: Sort + Prefix Check — O(n log n · L) ✅

```
FUNCTION removeSubfolders(folder):
    SORT folder
    result = [folder[0]]

    FOR i ← 1 TO n - 1:
        parent = result[-1] + "/"
        IF NOT folder[i].startswith(parent):
            result.ADD(folder[i])

    RETURN result
```

After sorting, a subfolder immediately follows its parent. Check if current starts with `lastParent/`.

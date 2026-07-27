# 1487. Making File Names Unique

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/making-file-names-unique](https://leetcode.com/problems/making-file-names-unique)
**Companies:** Okta

---

## 1. Problem Description

Given a list of file names, append `(k)` suffix to make duplicates unique. Return the final names.

---

## 2. Approach: Hash Map with Next Counter — O(n) ✅

```
FUNCTION getFolderNames(names):
    used = {}    // name → next suffix number to try
    result = []
    FOR name IN names:
        IF name NOT IN used:
            result.ADD(name)
            used[name] = 1
        ELSE:
            k = used[name]
            WHILE name + "(" + k + ")" IN used: k += 1
            newName = name + "(" + k + ")"
            result.ADD(newName)
            used[name] = k + 1
            used[newName] = 1
    RETURN result
```

| Time | Space |
|------|-------|
| O(n) amortized | O(n) |

---

## 3. Key Takeaway

> Track the next available suffix for each base name. Skip already-used suffixes. Register the new name to handle cascading conflicts.

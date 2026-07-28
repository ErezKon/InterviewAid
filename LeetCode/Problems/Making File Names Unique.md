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

## 3. Examples

**Example 1:**
```
Input: ["doc","doc","image","doc(1)","doc"]
Output: ["doc","doc(1)","image","doc(1)(1)","doc(2)"]
```
**Example 2:**
```
Input: ["a","b","cd"]
Output: ["a","b","cd"]
```

---

## 4. Walkthrough

Take the first example list.
1. "doc" not seen → keep "doc", set used["doc"]=1.
2. Next "doc" seen, k=1 → "doc(1)" unused → use it, update used["doc"]=2, used["doc(1)"]=1.
3. "image" new → keep, used["image"]=1.
4. "doc(1)" already used as a base name → k=1 → try "doc(1)(1)" unused → use it, update counters.
5. Final "doc" again → k=2 → "doc(2)" unused → use it.
Result matches output.

---

## 5. Complexity Analysis

- **Time:** O(n) average, each name processed with constant‑time hash lookups; worst‑case O(n · m) if many collisions but still linear in practice.
- **Space:** O(n) for the hash map storing all unique names.

---

## 6. Follow-Up Questions

- How would you modify the algorithm to handle case‑insensitive file systems?
- Can you output the minimal total number of characters added across all names?
- What if the suffix format changes to `#k` instead of `(k)`?

---

## Key Takeaway

> Track the next available suffix for each base name. Skip already‑used suffixes. Register the new name to handle cascading conflicts.

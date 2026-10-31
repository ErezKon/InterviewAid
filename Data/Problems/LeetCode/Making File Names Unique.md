# 1487. Making File Names Unique

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/making-file-names-unique](https://leetcode.com/problems/making-file-names-unique)
**Companies:** Okta

---

## 1. Problem Description

Given an array of strings `names` of size `n`. You will create `n` folders in your file system **such that**, at the `i^th` minute, you will create a folder with the name `names[i]`.

Since two files **cannot** have the same name, if you enter a folder name that was previously used, the system will have a suffix addition to its name in the form of `(k)`, where, `k` is the **smallest positive integer** such that the obtained name remains unique.

Return *an array of strings of length* `n` where `ans[i]` is the actual name the system will assign to the `i^th` folder when you create it.

**Constraints:**

- `1 <= names.length <= 5 * 10^4`
- `1 <= names[i].length <= 20`
- `names[i]` consists of lowercase English letters, digits, and/or round brackets.

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

```
Example 1:
  Input: names = ["pes","fifa","gta","pes(2019)"]
  Output: ["pes","fifa","gta","pes(2019)"]
  Explanation: Let's see how the file system creates folder names:
  "pes" --> not assigned before, remains "pes"
  "fifa" --> not assigned before, remains "fifa"
  "gta" --> not assigned before, remains "gta"
  "pes(2019)" --> not assigned before, remains "pes(2019)"
```

```
Example 2:
  Input: names = ["gta","gta(1)","gta","avalon"]
  Output: ["gta","gta(1)","gta(2)","avalon"]
  Explanation: Let's see how the file system creates folder names:
  "gta" --> not assigned before, remains "gta"
  "gta(1)" --> not assigned before, remains "gta(1)"
  "gta" --> the name is reserved, system adds (k), since "gta(1)" is also reserved, systems put k = 2. it becomes "gta(2)"
  "avalon" --> not assigned before, remains "avalon"
```

```
Example 3:
  Input: names = ["onepiece","onepiece(1)","onepiece(2)","onepiece(3)","onepiece"]
  Output: ["onepiece","onepiece(1)","onepiece(2)","onepiece(3)","onepiece(4)"]
  Explanation: When the last folder is created, the smallest positive valid k is 4, and it becomes "onepiece(4)".
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

- **Time:** O(n) average, each name processed with constant-time hash lookups; worst-case O(n · m) if many collisions but still linear in practice.
- **Space:** O(n) for the hash map storing all unique names.

---

## 6. Follow-Up Questions

- How would you modify the algorithm to handle case-insensitive file systems?
- Can you output the minimal total number of characters added across all names?
- What if the suffix format changes to `#k` instead of `(k)`?

---

## Key Takeaway

> Track the next available suffix for each base name. Skip already-used suffixes. Register the new name to handle cascading conflicts.

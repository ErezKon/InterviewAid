# 1957. Delete Characters to Make Fancy String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/delete-characters-to-make-fancy-string](https://leetcode.com/problems/delete-characters-to-make-fancy-string)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Wayfair

---

## Problem Description

Remove minimum characters so no three consecutive characters are the same.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| "leeetcode" | "leetcode" | Remove the third 'e' to avoid three consecutive 'e's. |
| "aaabbb" | "aabb" | Remove one 'a' and one 'b' to break triples. |

---

## Approach

```
FUNCTION makeFancyString(s):
    // Build result while ensuring no three identical chars in a row
    result ← []
    FOR c IN s:
        IF LENGTH(result) ≥ 2 AND result[-1] = c AND result[-2] = c:
            CONTINUE
        APPEND c TO result
    RETURN JOIN(result)
```

---

## Walkthrough

Consider the input "leeetcode":

1. result = []
2. 'l' → result = ["l"]
3. 'e' → result = ["l","e"]
4. 'e' → result = ["l","e","e"] (now two 'e's)
5. next 'e' → would create three 'e's, so skip.
6. continue with remaining characters, appending each as they don't create triples.
7. Final result = "leetcode".

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) |

---

## Follow-Up Questions

- How would you modify the algorithm to limit the maximum allowed consecutive identical characters to *k*?
- Can this be solved in-place with O(1) extra space?

---

## Key Takeaway

> **Greedy character filtering: only append if it wouldn't create three consecutive identical characters. Check last two characters in the result.**
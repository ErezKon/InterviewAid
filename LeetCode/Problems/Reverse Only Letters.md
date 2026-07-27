# 917. Reverse Only Letters

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reverse-only-letters](https://leetcode.com/problems/reverse-only-letters)
**Companies:** Amazon, Google, Microsoft, Snowflake, Tanium, Turing

---

## Problem Description

Given a string `s`, reverse only the **letters** (a-z, A-Z), leaving all other characters in their original positions.

---

## Example

- **Input:** `s = "a-bC-dEf-ghIj"`
- **Output:** `"j-Ih-gfE-dCba"`

---

## Approach

```
FUNCTION reverseOnlyLetters(s):
    arr = list(s)
    lo, hi = 0, len(s) - 1
    WHILE lo < hi:
        WHILE lo < hi AND NOT arr[lo].isalpha(): lo += 1
        WHILE lo < hi AND NOT arr[hi].isalpha(): hi -= 1
        SWAP(arr[lo], arr[hi])
        lo += 1; hi -= 1
    RETURN JOIN(arr)
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(n) — two pointers meet in the middle |
| Space  | O(n) — character array (O(1) extra if mutable string) |

---

## Key Takeaway

> Two-pointer with skip — advance pointers past non-letter characters, then swap. The classic pattern for "reverse only elements matching a predicate."

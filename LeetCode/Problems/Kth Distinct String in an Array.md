# 2053. Kth Distinct String in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/kth-distinct-string-in-an-array](https://leetcode.com/problems/kth-distinct-string-in-an-array)
**Companies:** Amazon, Google

---

## 1. Problem Description

Given a string array `arr`, return the **k‑th distinct** string (appearing exactly once). Return `""` if fewer than `k` distinct strings exist.

---

## 2. Approach: Counter + Linear Scan — O(n) ✅

```text
FUNCTION kthDistinct(arr, k):
    count ← Counter(arr) // map string → frequency
    FOR s IN arr:
        IF count[s] == 1:
            k ← k - 1
            IF k == 0:
                RETURN s
    RETURN ""
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Examples

| arr | k | Output |
|-----|---|--------|
| ["d","b","c","b","c","a"] | 2 | "a" |
| ["aaa","aa","a"] | 1 | "aaa" |
| ["a","b","a"] | 3 | "" |

*Explanation:* In the first example, distinct strings are `"d"` and `"a"`; the 2‑nd distinct is `"a"`.

---

## 4. Walkthrough

Take `arr = ["d","b","c","b","c","a"]`, `k = 2`.

1. **Count frequencies:** `{"d":1, "b":2, "c":2, "a":1}`.
2. **Iterate in order:**
   - `"d"` has count 1 → `k` becomes 1.
   - `"b"` count 2 → skip.
   - `"c"` count 2 → skip.
   - `"b"` skip.
   - `"c"` skip.
   - `"a"` count 1 → `k` becomes 0 → return `"a"`.

---

## 5. Complexity Analysis

| Metric | Value |
|--------|-------|
| Time   | O(n) – one pass to count, one pass to find k‑th distinct |
| Space  | O(n) – hashmap for frequencies |

---

## 6. Follow‑Up Questions

- How would you modify the solution to return all distinct strings in order?
- Can you solve it with O(1) extra space if the input array is mutable?

---

## Key Takeaway

> Use a frequency map to identify strings that appear exactly once, then scan the original array to pick the `k`‑th such string.

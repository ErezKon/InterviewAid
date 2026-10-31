# 702. Search in a Sorted Array of Unknown Size

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/search-in-a-sorted-array-of-unknown-size](https://leetcode.com/problems/search-in-a-sorted-array-of-unknown-size)
**Companies:** Google

---

## Problem Description

This is an ***interactive problem***.

You have a sorted array of **unique** elements and an **unknown size**. You do not have an access to the array but you can use the `ArrayReader` interface to access it. You can call `ArrayReader.get(i)` that:

- returns the value at the `i^th` index (**0-indexed**) of the secret array (i.e., `secret[i]`), or
- returns `2^31 - 1` if the `i` is out of the boundary of the array.

You are also given an integer `target`.

Return the index `k` of the hidden array where `secret[k] == target` or return `-1` otherwise.

You must write an algorithm with `O(log n)` runtime complexity.

**Constraints:**

- `1 <= secret.length <= 10^4`
- `-10^4 <= secret[i], target <= 10^4`
- `secret` is sorted in a strictly increasing order.

---

## 2. Examples

```
Example 1:
  Input: secret = [-1,0,3,5,9,12], target = 9
  Output: 4
  Explanation: 9 exists in secret and its index is 4.
```

```
Example 2:
  Input: secret = [-1,0,3,5,9,12], target = 2
  Output: -1
  Explanation: 2 does not exist in secret so return -1.
```

---

## 3. Approach

First find the **search boundary** by doubling the right bound until `reader.get(right) >= target`, then do standard **binary search** within `[left, right]`.

```text
FUNCTION search(reader, target):
    // Expand bounds exponentially
    left ← 0
    right ← 1
    WHILE reader.get(right) < target:
        left ← right
        right ← right * 2

    // Binary search in [left, right]
    WHILE left ≤ right:
        mid ← (left + right) / 2
        val ← reader.get(mid)
        IF val == target:
            RETURN mid
        ELSE IF val < target:
            left ← mid + 1
        ELSE:
            right ← mid - 1
    RETURN -1
```

---

## 4. Walkthrough

Example 1: `secret = [-1,0,3,5,9,12]`, `target = 9`:

| Step | Phase | left | right | mid | reader.get(...) | Action |
|------|-------|------|-------|-----|-----------------|--------|
| 1 | expand | 0 | 1 | - | get(1) = 0 (<9) | left←1, right←2 |
| 2 | expand | 1 | 2 | - | get(2) = 3 (<9) | left←2, right←4 |
| 3 | expand | 2 | 4 | - | get(4) = 9 (not <9) | stop expanding |
| 4 | binary | 2 | 4 | 3 | 5 (<9) | left←4 |
| 5 | binary | 4 | 4 | 4 | 9 (=9) | return 4 |

Output `4`, as expected. For Example 2 (`target = 2`), expansion stops at `[1,2]` (get(2) = 3 ≥ 2); binary search checks mid=1 (0 < 2, left←2), then mid=2 (3 > 2, right←1); `left > right` → return `-1`.

The exponential expansion quickly reaches a bound covering the target, then binary search finds it.

---

## 5. Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time | O(log n) — exponential expansion + binary search |
| Space | O(1) |

---

## 6. Follow-Up Questions

- How would you adapt the algorithm if the array could contain duplicate values?
- Can you modify the approach to work with a descending sorted array?
- What changes are needed if `reader.get` is an expensive I/O operation?

---

## Key Takeaway

> When the search space size is unknown, use **exponential doubling** to find the upper bound first, then binary search — total cost remains O(log n).

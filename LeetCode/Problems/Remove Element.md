# 27. Remove Element

**Difficulty:** 🟢 Easy
**Acceptance:** 58.0%
**LeetCode:** [https://leetcode.com/problems/remove-element](https://leetcode.com/problems/remove-element)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Tcs, Uber, Yandex

---

## 1. Problem Description

Given an array `nums` and a value `val`, remove all occurrences of `val` **in-place**. Return the number of elements not equal to `val`.

---

## 2. Examples

```
Example 1:
  Input:  nums = [3,2,2,3], val = 3
  Output: 2, nums = [2,2,_,_]
```

---

## 3. Approach: Two Pointers — O(n) ✅

```
FUNCTION removeElement(nums, val):
    write = 0
    FOR read ← 0 TO n - 1:
        IF nums[read] != val:
            nums[write] = nums[read]
            write += 1
    RETURN write
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Follow-Up: Minimize moves when `val` is rare?

Swap `nums[write]` with `nums[n-1]`, decrement n. This avoids shifting when the target value is rare.

```
FUNCTION removeElement(nums, val):
    i = 0
    n = len(nums)
    WHILE i < n:
        IF nums[i] == val:
            nums[i] = nums[n-1]
            n -= 1
        ELSE:
            i += 1
    RETURN n
```

---

## Key Takeaway

> Same reader-writer pointer pattern as Move Zeroes and Remove Duplicates. The variant with swap-from-end minimizes writes when removals are infrequent.

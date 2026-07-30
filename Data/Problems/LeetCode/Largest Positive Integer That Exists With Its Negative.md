# 2441. Largest Positive Integer That Exists With Its Negative

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-positive-integer-that-exists-with-its-negative](https://leetcode.com/problems/largest-positive-integer-that-exists-with-its-negative)
**Companies:** Amazon, Bloomberg, Coupang, Google, Microsoft

---

## 1. Problem Description

Find the largest positive integer `k` such that both `k` and `-k` exist in `nums`. Return -1 if none.

---

## 2. Approach: Hash Set — O(n) ✅

```text
FUNCTION findMaxK(nums):
    // Insert all numbers into a set for O(1) lookups
    SET s ← SET(nums)
    SET result ← -1
    FOR num IN nums:
        IF num > 0 AND -num IN s:
            SET result ← MAX(result, num)
    RETURN result
```

---

## 3. Examples

| nums | Output |
|------|--------|
| [3,2,-2,5,-3] | 3 |
| [1,2,3,4] | -1 |

---

## 4. Walkthrough

1. Insert all elements of `nums` into a set `s`.
2. Iterate through each number:
   - For `3`: `-3` is in `s`, update `result` to `3`.
   - For `2`: `-2` is in `s`, `result` remains `3` (max).
   - For `-2`, `5`, `-3`: ignored because they are not positive.
3. After processing all numbers, `result` holds the largest qualifying `k` (`3`).
4. Return `3`. If no positive number has its negative counterpart, `result` stays `-1`.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 6. Follow-Up Questions

- How would you modify the solution to return all such positive integers instead of the maximum?
- Can you solve the problem using sorting instead of a hash set? What would be the time complexity?
- How would the approach change if the input array were read-only and you could only use O(1) extra space?

---

## Key Takeaway

> Put all values in a set, then check each positive number for its negation. Track the maximum.

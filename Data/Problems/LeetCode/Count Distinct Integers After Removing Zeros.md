# 3747. Count Distinct Integers After Removing Zeros

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-distinct-integers-after-removing-zeros](https://leetcode.com/problems/count-distinct-integers-after-removing-zeros)
**Companies:** Google

---

## 1. Problem Description

You are given a **positive** integer `n`.

For every integer `x` from 1 to `n`, we write down the integer obtained by removing all zeros from the decimal representation of `x`.

Return an integer denoting the number of **distinct** integers written down.

**Constraints:**
- `1 <= n <= 10^15`

---

## 2. Approach: Transform + Set — O(n × d) ✅

```text
FUNCTION countDistinct(nums):
    // Use a set to store transformed numbers
    SET seen ← {}
    FOR num IN nums:
        // Remove zeros by filtering digit characters
        SET strippedStr ← "".JOIN(ch FOR ch IN STRING(num) IF ch != '0')
        SET stripped ← INTEGER(strippedStr)
        ADD stripped TO seen
    RETURN SIZE(seen)
```

| Time | Space |
|------|-------|
| O(n × d) where d = max digits | O(n) |

---

## Examples

```
Example 1:
  Input: n = 10
  Output: 9
  Explanation: The integers we wrote down are 1, 2, 3, 4, 5, 6, 7, 8, 9, 1. There are 9 distinct integers (1, 2, 3, 4, 5, 6, 7, 8, 9).
```

```
Example 2:
  Input: n = 3
  Output: 3
  Explanation: The integers we wrote down are 1, 2, 3. There are 3 distinct integers (1, 2, 3).
```

---

## Walkthrough

For the first example `[101, 10, 100]`:
| Step | Original | After removing zeros | Set after insertion |
|------|----------|----------------------|----------------------|
| 1 | 101 | 11 | {11}
| 2 | 10 | 1 | {11, 1}
| 3 | 100 | 1 | {11, 1} (no change) |
The final set size is 2.

---

## Complexity Analysis

- **Time:** Each number is converted to a string of length *d* (max digits) and filtered, giving O(n × d).
- **Space:** The set stores at most *n* transformed integers, O(n).

---

## Follow-Up Questions

1. How would you handle negative numbers or numbers with leading zeros?
2. Can the solution be adapted to work in-place without extra space?
3. What if the transformation rule changes to removing all occurrences of a given digit *k*?

---

## Key Takeaway

> Remove zeros by filtering digit characters, convert back to int, and collect in a set for distinct count.

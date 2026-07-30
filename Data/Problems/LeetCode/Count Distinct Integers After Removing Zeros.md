# 3747. Count Distinct Integers After Removing Zeros

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-distinct-integers-after-removing-zeros](https://leetcode.com/problems/count-distinct-integers-after-removing-zeros)
**Companies:** Google

---

## 1. Problem Description

Given an array of positive integers, for each number remove all zeros from its digits, then count the total number of distinct resulting integers.

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

**Example 1:**
```
Input: nums = [101, 10, 100]
Output: 2
Explanation: Removing zeros yields [11, 1, 1]; the distinct integers are {11, 1}.
```

**Example 2:**
```
Input: nums = [5, 500, 50]
Output: 2
Explanation: After stripping zeros we get [5, 5, 5]; only one distinct value {5}.
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

- **Time:** Each number is converted to a string of length *d* (max digits) and filtered, giving O(n × d).
- **Space:** The set stores at most *n* transformed integers, O(n).

---

## Follow-Up Questions

1. How would you handle negative numbers or numbers with leading zeros?
2. Can the solution be adapted to work in‑place without extra space?
3. What if the transformation rule changes to removing all occurrences of a given digit *k*?

---

## Key Takeaway

> Remove zeros by filtering digit characters, convert back to int, and collect in a set for distinct count.

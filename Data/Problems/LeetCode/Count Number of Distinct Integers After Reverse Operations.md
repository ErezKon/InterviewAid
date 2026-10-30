# 2442. Count Number of Distinct Integers After Reverse Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-number-of-distinct-integers-after-reverse-operations](https://leetcode.com/problems/count-number-of-distinct-integers-after-reverse-operations)
**Companies:** Google

---

## 1. Problem Description

You are given an array `nums` consisting of **positive** integers.

You have to take each integer in the array, **reverse its digits**, and add it to the end of the array. You should apply this operation to the original integers in `nums`.

Return *the number of **distinct** integers in the final array*.

(Equivalently, for each element also add its digit‑reversed version, then count distinct values.)

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^6`

---

## 2. Approach: Set with Reversal — O(n × d) ✅

```text
FUNCTION countDistinctIntegers(nums):
    // d = number of digits in the largest number
    s ← SET()
    FOR num IN nums:
        s.ADD(num)
        rev ← REVERSE_DIGITS(num)
        s.ADD(rev)
    RETURN SIZE(s)

FUNCTION REVERSE_DIGITS(x):
    rev ← 0
    WHILE x > 0:
        rev ← rev * 10 + (x MOD 10)
        x ← x DIV 10
    RETURN rev
```

| Time | Space |
|------|-------|
| O(n × d) | O(n) |

---

## Examples

```
Example 1:
  Input: nums = [1,13,10,12,31]
  Output: 6
  Explanation: After including the reverse of each number, the resulting array is [1,13,10,12,31,1,31,1,21,13].
  The reversed integers that were added to the end of the array are the last five. Note that for the integer 10,
  after reversing it, it becomes 01 which is just 1.
  The number of distinct integers in this array is 6 (The numbers 1, 10, 12, 13, 21, and 31).
```

```
Example 2:
  Input: nums = [2,2,2]
  Output: 1
  Explanation: After including the reverse of each number, the resulting array is [2,2,2,2,2,2].
  The number of distinct integers in this array is 1 (The number 2).
```

---

## Walkthrough

Take `nums = [12, 21]`.
1. Insert 12 into set → {12}
2. Reverse 12 → 21, add → {12,21}
3. Insert 21 (original) → set unchanged.
4. Reverse 21 → 12, already present.
Resulting distinct count = 2.

---

## Complexity Analysis

- **Time:** O(n × d) where *d* is the number of digits of the largest number (reversing each integer).
- **Space:** O(n) for the set storing distinct values.

---

## Follow-Up Questions

1. How would you modify the solution if numbers could be negative?
2. Can the algorithm be adapted to work in‑place without extra storage, assuming the input array can be mutated?
3. What if the reversal operation had a cost and you could only perform it a limited number of times?

---

## Key Takeaway

> Add both each number and its reversal to a set. The set handles deduplication automatically.

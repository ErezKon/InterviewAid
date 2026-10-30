# 2441. Largest Positive Integer That Exists With Its Negative

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-positive-integer-that-exists-with-its-negative](https://leetcode.com/problems/largest-positive-integer-that-exists-with-its-negative)
**Companies:** Amazon, Bloomberg, Coupang, Google, Microsoft

---

## 1. Problem Description

Given an integer array `nums` that **does not contain** any zeros, find **the largest positive** integer `k` such that `-k` also exists in the array.

Return *the positive integer* `k`. If there is no such integer, return `-1`.

**Constraints:**
- `1 <= nums.length <= 1000`
- `-1000 <= nums[i] <= 1000`
- `nums[i] != 0`

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

```
Example 1:
  Input: nums = [-1,2,-3,3]
  Output: 3
  Explanation: 3 is the only valid k we can find in the array.
```

```
Example 2:
  Input: nums = [-1,10,6,7,-7,1]
  Output: 7
  Explanation: Both 1 and 7 have their corresponding negative values in the array. 7 has a larger value.
```

```
Example 3:
  Input: nums = [-10,8,6,7,-2,-3]
  Output: -1
  Explanation: There is no a single valid k, we return -1.
```

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

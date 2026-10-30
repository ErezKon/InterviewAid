# 167. Two Sum II - Input Array Is Sorted

**Difficulty:** 🟡 Medium
**Acceptance:** 63.0%
**LeetCode:** [https://leetcode.com/problems/two-sum-ii-input-array-is-sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Epam Systems, Google, Infosys, Jpmorgan, Meta, Microsoft, Oracle, Tcs, Tiktok, Visa, Yandex, Zoho

---

## 1. Problem Description

Given a **1-indexed** array of integers `numbers` that is already ***sorted in non-decreasing order***, find two numbers such that they add up to a specific `target` number. Let these two numbers be `numbers[index1]` and `numbers[index2]` where `1 <= index1 < index2 <= numbers.length`.

Return *the indices of the two numbers,* `index1` *and* `index2`*, **added by one** as an integer array* `[index1, index2]` *of length 2.*

The tests are generated such that there is **exactly one solution**. You **may not** use the same element twice.

Your solution must use only constant extra space.

**Constraints:**
- `2 <= numbers.length <= 3 * 10^4`
- `-1000 <= numbers[i] <= 1000`
- `numbers` is sorted in **non-decreasing order**.
- `-1000 <= target <= 1000`
- The tests are generated such that there is **exactly one solution**.

---

## 2. Examples

**Example 1:**
```
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].
```

**Example 2:**
```
Input: numbers = [2,3,4], target = 6
Output: [1,3]
Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].
```

**Example 3:**
```
Input: numbers = [-1,0], target = -1
Output: [1,2]
Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].
```

---

## 3. Approach: Two Pointers — O(n) ✅

```text
FUNCTION twoSum(numbers, target):
    lo ← 0
    hi ← len(numbers) - 1
    WHILE lo < hi:
        sum ← numbers[lo] + numbers[hi]
        IF sum == target:
            RETURN [lo + 1, hi + 1]   // 1-indexed
        ELSE IF sum < target:
            lo ← lo + 1
        ELSE:
            hi ← hi - 1
```

---

## 4. Walkthrough

Consider `numbers = [2,7,11,15]`, `target = 9`.
1. lo=0 (2), hi=3 (15) → sum=17 > 9 → move hi left.
2. lo=0 (2), hi=2 (11) → sum=13 > 9 → move hi left.
3. lo=0 (2), hi=1 (7) → sum=9 == target → return [1,2].

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 6. Follow-Up Questions

* How would you modify the algorithm if the array were not sorted?
* Can you solve it using a hash map with O(n) time and O(n) space?

---

## Key Takeaway

> Sorted array + target sum = two pointers from both ends. If sum < target, move left pointer right; if sum > target, move right pointer left.

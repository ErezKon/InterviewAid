# 3732. Maximum Product of Three Elements After One Replacement

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-product-of-three-elements-after-one-replacement](https://leetcode.com/problems/maximum-product-of-three-elements-after-one-replacement)
**Companies:** Google, Meta

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Examples](#examples)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an integer array `nums`.

You **must** replace **exactly one** element in the array with **any** integer value in the range `[-10^5, 10^5]` (inclusive).

After performing this single replacement, determine the **maximum possible product** of **any three** elements at **distinct indices** from the modified array.

Return an integer denoting the **maximum product** achievable.

**Constraints:**
- `3 <= nums.length <= 10^5`
- `-10^5 <= nums[i] <= 10^5`

---

## Key Insight

> Without replacement, the max product is from either the 3 largest or 2 smallest + largest. With one replacement, we can change one element to maximize the product — consider replacing elements adjacent to the critical positions (top 3 largest, bottom 2 smallest).

---

## Approach

```text
FUNCTION maxProduct(nums):
    SORT nums
    n ← LENGTH(nums)
    // Gather extreme candidates (top 4 largest, bottom 3 smallest)
    candidates ← []
    FOR each triple IN COMBINATIONS(nums[0..2] ∪ nums[n-4..n-1], 3):
        APPEND(triple_product(triple)) TO candidates
    // For each candidate triple, consider replacing one element with a large value
    FOR each triple IN candidates:
        // Replace the smallest element of the triple with a very large positive number
        replaced_product ← REPLACE_MIN_WITH_MAX(triple)
        APPEND(replaced_product) TO candidates
    RETURN MAX(candidates)
END FUNCTION
```

---

## Examples

```
Example 1:
  Input: nums = [-5,7,0]
  Output: 3500000
  Explanation: Replacing 0 with -10^5 gives the array [-5, 7, -10^5], which has a product (-5) * 7 * (-10^5) = 3500000.
    The maximum product is 3500000.
```

```
Example 2:
  Input: nums = [-4,-2,-1,-3]
  Output: 1200000
  Explanation: Two ways to achieve the maximum product include:
    - [-4, -2, -3] -> replace -2 with 10^5 -> product = (-4) * 10^5 * (-3) = 1200000.
    - [-4, -1, -3] -> replace -1 with 10^5 -> product = (-4) * 10^5 * (-3) = 1200000.
    The maximum product is 1200000.
```

```
Example 3:
  Input: nums = [0,10,0]
  Output: 0
  Explanation: There is no way to replace an element with another integer and not have a 0 in the array. Hence, the
    product of all three elements will always be 0, and the maximum product is 0.
```

---

## Walkthrough

**Example 1:** `nums = [1,2,3,4]`
1. Sort → `[1,2,3,4]`.
2. Extreme window = `{1,2,3,4}` (top 4, bottom 3 overlap).
3. Evaluate all triples: `1·2·3=6`, `1·2·4=8`, `1·3·4=12`, `2·3·4=24`.
4. Consider replacement: replace the smallest element `1` with a very large value (e.g., `∞`). The best triple becomes `∞·4·3`, effectively `5·4·3 = 60` after choosing the optimal replacement value `5`.
5. Maximum product = `60`.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n log n)** — sorting |
| Space  | **O(1)** — constant |

---

## Follow-Up Questions

1. How would you solve the original "Maximum Product of Three Numbers" without any replacement?
2. Can the approach be extended to "Maximum Product of K Elements" with one replacement?
3. What changes are needed if you are allowed to replace **two** elements?

---

## Key Takeaway

> **Extend the "three numbers" pattern** — with one replacement, consider a slightly larger window of extreme elements (top 4, bottom 3) and evaluate all candidate triples.

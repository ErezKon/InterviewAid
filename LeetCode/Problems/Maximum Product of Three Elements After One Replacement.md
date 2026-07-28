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

Given an array `nums`, you can replace **at most one** element with any value. Return the **maximum product** of any three elements.

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

| nums | Replacement (optional) | Maximum Product |
|------|------------------------|-----------------|
| `[1,2,3,4]` | replace `1` with `5` | `60` |
| `[-10,-10,5,2]` | replace `-10` with `10` | `100` |

*Explanation:* In the first example, after replacing `1` with `5`, the three largest numbers are `5,4,3` giving `5×4×3 = 60`.

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

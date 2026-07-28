# 3891. Minimum Increase to Maximize Special Indices

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-increase-to-maximize-special-indices](https://leetcode.com/problems/minimum-increase-to-maximize-special-indices)
**Companies:** Linkedin

---

## Problem Description

Given an array `nums`, an index `i` is **special** if `nums[i] > nums[i-1]` (for i > 0). You can increase elements. Find the **minimum total increase** to maximize the number of special indices.

## Key Insight

> Greedily process left-to-right. For each potential special index, if `nums[i] <= nums[i-1]`, increase `nums[i]` to `nums[i-1] + 1`. The cost is `nums[i-1] + 1 - nums[i]`. Since only increases are allowed, this yields the minimal cost while maximizing special indices.

## Approach: Greedy — O(n) ✅

```text
FUNCTION minIncrease(nums):
    cost ← 0
    FOR i ← 1 TO n-1:
        IF nums[i] <= nums[i-1]:
            increment ← nums[i-1] + 1 - nums[i]
            cost ← cost + increment
            nums[i] ← nums[i-1] + 1
    RETURN cost
```

## Examples

| nums | Output |
|------|--------|
| [1,1,2,2] | 2 |
| [3,2,1] | 3 |
| [5,5,5,5] | 6 |

*Explanation*: In the first example, increase `nums[1]` to `2` (cost 1) and `nums[3]` to `3` (cost 1) to make indices 1 and 3 special.

## Walkthrough

**Example 1** (`nums = [1,1,2,2]`)

| Step | i | nums before | Condition | Increment | nums after | Cumulative cost |
|------|---|-------------|-----------|-----------|------------|-----------------|
| 1 | 1 | [1,1,2,2] | 1 ≤ 1 | 1 | [1,2,2,2] | 1 |
| 2 | 2 | [1,2,2,2] | 2 ≤ 2 | 1 | [1,2,3,2] | 2 |
| 3 | 3 | [1,2,3,2] | 2 ≤ 3 | 0 | unchanged | 2 |

Final array `[1,2,3,2]` has special indices at positions 1 and 2, total cost 2.

## Complexity Analysis

- **Time**: O(n) – single pass through the array.
- **Space**: O(1) – only a few scalar variables.

## Follow-Up Questions

- How would the solution change if you could also **decrease** elements?
- What if the definition of a special index required `nums[i] >= 2 * nums[i-1]`?
- Can you extend the approach to handle circular arrays where index 0 compares with the last element?

## Key Takeaway

> To maximize strictly‑increasing adjacent pairs with only increases allowed, greedily bump each element to just exceed its predecessor.

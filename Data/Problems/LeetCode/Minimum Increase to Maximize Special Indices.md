# 3891. Minimum Increase to Maximize Special Indices

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-increase-to-maximize-special-indices](https://leetcode.com/problems/minimum-increase-to-maximize-special-indices)
**Companies:** Linkedin

---

## Problem Description

> *Note: the Approach below makes the array strictly increasing (invented). Officially special indices are local peaks, the maximum count is `(n − 1) // 2`, and making index `i` a peak costs `max(0, max(nums[i−1], nums[i+1]) + 1 − nums[i])`. For odd `n` the peaks are forced to be the odd indices; sum their costs. For even `n`, the chosen peaks have exactly one gap of 3 instead of 2. Take the minimum over where the gap goes, using prefix sums of odd-index costs and suffix sums of even-index costs (or a small DP with a "gap used" flag).*

You are given an integer array `nums` of length `n`.

An index `i` (`0 < i < n - 1`) is **special** if `nums[i] > nums[i - 1]` and `nums[i] > nums[i + 1]`.

You may perform operations where you choose **any** index `i` and **increase** `nums[i]` by 1.

Your goal is to:

- **Maximize** the number of **special** indices.
- **Minimize** the total number of **operations** required to achieve that **maximum**.

Return an integer denoting the **minimum** total number of operations required.

**Constraints:**
- `3 <= n <= 10^5`
- `1 <= nums[i] <= 10^9`

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

**Example 1:**
```
Input: nums = [1,2,2]
Output: 1
Explanation: - Start with nums = [1, 2, 2].
- Increase nums[1] by 1, array becomes [1, 3, 2].
- The final array is [1, 3, 2] has 1 special index, which is the maximum achievable.
- It is impossible to achieve this number of special indices with fewer operations. Thus, the answer is 1.
```

**Example 2:**
```
Input: nums = [2,1,1,3]
Output: 2
Explanation: - Start with nums = [2, 1, 1, 3].
- Perform 2 operations at index 1, array becomes [2, 3, 1, 3].
- The final array is [2, 3, 1, 3] has 1 special index, which is the maximum achievable. Thus, the answer is 2.
```

**Example 3:**
```
Input: nums = [5,2,1,4,3]
Output: 4
Explanation: - Start with nums = [5, 2, 1, 4, 3].
- Perform 4 operations at index 1, array becomes [5, 6, 1, 4, 3].
- The final array is [5, 6, 1, 4, 3] has 2 special indices, which is the maximum achievable. Thus, the answer is 4.
```

## Walkthrough

**Example 1** (`nums = [1,1,2,2]`)

| Step | i | nums before | Condition | Increment | nums after | Cumulative cost |
|------|---|-------------|-----------|-----------|------------|-----------------|
| 1 | 1 | [1,1,2,2] | 1 ≤ 1 | 1 | [1,2,2,2] | 1 |
| 2 | 2 | [1,2,2,2] | 2 ≤ 2 | 1 | [1,2,3,2] | 2 |
| 3 | 3 | [1,2,3,2] | 2 ≤ 3 | 0 | unchanged | 2 |

Final array `[1,2,3,2]` has special indices at positions 1 and 2, total cost 2.

## Complexity Analysis

- **Time**: O(n) – single pass through the array.
- **Space**: O(1) – only a few scalar variables.

## Follow-Up Questions

- How would the solution change if you could also **decrease** elements?
- What if the definition of a special index required `nums[i] >= 2 * nums[i-1]`?
- Can you extend the approach to handle circular arrays where index 0 compares with the last element?

## Key Takeaway

> To maximize strictly-increasing adjacent pairs with only increases allowed, greedily bump each element to just exceed its predecessor.

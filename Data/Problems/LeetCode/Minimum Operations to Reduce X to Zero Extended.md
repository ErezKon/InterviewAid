# Complement Technique: Find Middle Instead

---

## Problem Description
Many array problems ask for the minimum number of removals from the **ends** of the array to achieve a target sum. Instead of reasoning about two‑sided deletions, consider the **complement**: the subarray that remains in the middle. If the total sum of the array is `total` and we need to remove elements summing to `x`, the middle subarray must sum to `total - x`. Finding the longest such middle subarray minimizes the number of removals.

## Examples

```
Example 1:
  Input: nums = [1,1,4,2,3], x = 5
  total = 11, target = 6
  Longest subarray with sum 6: [1,1,4] (length 3)
  Answer: 5 - 3 = 2
```

```
Example 2:
  Input: nums = [5,6,7,8,9], x = 4
  total = 35, target = 31
  No subarray sums to 31 → Answer: -1
```

```
Example 3:
  Input: nums = [3,2,20,1,1,3], x = 10
  total = 30, target = 20
  Longest subarray with sum 20: [20] (length 1)
  Answer: 6 - 1 = 5
```

## Approach
The complement insight converts a two‑pointer removal problem into a classic **sliding window** search for a subarray with sum `target = total - x`. Because all numbers are positive, a sliding window can expand to increase the sum and shrink to decrease it, guaranteeing O(n) time.

```text
FUNCTION minOperations(nums, x):
    total ← SUM(nums)
    target ← total - x
    IF target < 0: RETURN -1
    IF target == 0: RETURN LEN(nums)
    left ← 0
    curSum ← 0
    maxLen ← -1
    FOR right ← 0 TO LEN(nums) - 1:
        curSum ← curSum + nums[right]
        WHILE curSum > target:
            curSum ← curSum - nums[left]
            left ← left + 1
        IF curSum == target:
            maxLen ← MAX(maxLen, right - left + 1)
    RETURN LEN(nums) - maxLen IF maxLen != -1 ELSE -1
```

## Walkthrough
Consider `nums = [1,1,4,2,3]`, `x = 5`.
1. `total = 11`, `target = 6`.
2. Slide window:
   - Expand to include first three elements → sum = 6 → `maxLen = 3`.
   - Continue expanding/shrinking; no longer subarray exceeds length 3.
3. Minimum removals = `5 - 3 = 2` (remove the last two elements).

## Complexity Analysis
- **Time:** O(n) – single pass with sliding window.
- **Space:** O(1) – only constant extra variables.

## Follow-Up Questions
1. How does the approach change if the array contains negative numbers?
2. Can the complement technique be applied to circular arrays?
3. What if each removal has a different cost?

## Key Takeaway
Reframing end‑removal problems as a search for the longest middle subarray (the complement) turns a two‑sided challenge into a simple sliding‑window task.

# Kadane's Algorithm Variants

---

## Problem Description
Given an integer array `nums`, find the contiguous subarray (containing at least one number) that has the largest product and return its product. The subarray must consist of consecutive elements.

This is a Kadane's-algorithm variant: because multiplying by a negative number flips the sign, you must track both the maximum and the minimum product of a subarray ending at each position.

**Constraints:**
- `1 <= nums.length <= 2 * 10^4`
- `-10 <= nums[i] <= 10`
- The product of any subarray of `nums` is guaranteed to fit in a 32-bit integer.

> *Note: constraints and examples are derived, not from an official LeetCode source.*

## Examples

```
Example 1:
  Input: nums = [2,3,-2,4]
  Output: 6
  Explanation: The subarray [2,3] has the largest product 6.
```

```
Example 2:
  Input: nums = [-2,0,-1]
  Output: 0
  Explanation: The result cannot be 2, because [-2,-1] is not a contiguous subarray. The best is [0] with product 0.
```

```
Example 3:
  Input: nums = [-2,3,-4]
  Output: 24
  Explanation: The whole array [-2,3,-4] has product 24; the two negatives cancel out, which is why the
    running minimum product (-6 after index 1) must be tracked: -6 * -4 = 24.
```

## Approach
**Kadane's Algorithm Variant — O(n)**

```text
FUNCTION maxProduct(nums):
    maxProd ← minProd ← result ← nums[0]
    FOR i ← 1 TO LENGTH(nums)-1:
        IF nums[i] < 0 THEN SWAP(maxProd, minProd)
        maxProd ← MAX(nums[i], maxProd × nums[i])
        minProd ← MIN(nums[i], minProd × nums[i])
        result ← MAX(result, maxProd)
    RETURN result
```
The algorithm maintains both the maximum and minimum product ending at the current position because a negative number can turn a minimum into a maximum.

## Walkthrough
| i | nums[i] | maxProd (before) | minProd (before) | Action | maxProd (after) | minProd (after) | result |
|---|---------|------------------|------------------|--------|-----------------|-----------------|--------|
| 0 | 2 | 2 | 2 | init | 2 | 2 | 2 |
| 1 | 3 | 2 | 2 | 3>0, no swap | MAX(3,2×3)=6 | MIN(3,2×3)=3 | 6 |
| 2 | -2 | 6 | 3 | swap → maxProd=3, minProd=6 | MAX(-2,3×-2)= -2 | MIN(-2,6×-2)= -12 | 6 |
| 3 | 4 | -2 | -12 | 4>0, no swap | MAX(4,-2×4)=4 | MIN(4,-12×4)= -48 | 6 |

The final `result` is `6`.

## Complexity Analysis
- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – only constant extra variables.

## Follow‑Up Questions
1. How would you modify the algorithm to also return the indices of the maximum‑product subarray?
2. Can the approach be extended to handle circular subarrays (wrapping around the ends)?
3. What changes are needed if the input may contain zeros and you want the longest subarray with maximum product > 1?

## Key Takeaway
Kadane's algorithm can be adapted to products by tracking both maximum and minimum suffix products, allowing a single‑pass solution to the maximum product subarray problem.

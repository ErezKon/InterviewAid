# 898. Bitwise ORs of Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bitwise-ors-of-subarrays](https://leetcode.com/problems/bitwise-ors-of-subarrays)
**Companies:** Amazon, Bloomberg, Bny Mellon, Google, Meta, Microsoft, Tcs

---

## Problem Description
Given an integer array `arr`, return *the number of distinct bitwise ORs of all the non-empty subarrays of* `arr`.

The bitwise OR of a subarray is the bitwise OR of each integer in the subarray. The bitwise OR of a subarray of one integer is that integer.

A **subarray** is a contiguous non-empty sequence of elements within an array.

**Constraints:**
- `1 ≤ arr.length ≤ 5 * 10⁴`
- `0 ≤ arr[i] ≤ 10⁹`

## Examples
```
Example 1:
  Input: arr = [0]
  Output: 1
  Explanation: There is only one possible result: 0.

Example 2:
  Input: arr = [1,1,2]
  Output: 3
  Explanation: The possible subarrays are [1], [1], [2], [1, 1], [1, 2], [1, 1, 2].
  These yield the results 1, 1, 2, 1, 3, 3.
  There are 3 unique values, so the answer is 3.

Example 3:
  Input: arr = [1,2,4]
  Output: 6
  Explanation: The possible results are 1, 2, 3, 4, 6, and 7.
```

## Approach
**Rolling Set** – Maintain a set of OR results for subarrays ending at the current index. For each new element, combine it with all previous OR values (by OR-ing) and also include the element itself. Merge these into a global result set.

```text
FUNCTION subarrayBitwiseORs(arr):
    SET result ← empty set
    SET current ← empty set
    FOR num IN arr:
        // New OR values ending at this position
        SET current ← { num OR x FOR x IN current } ∪ { num }
        // Add to overall distinct results
        result ← result ∪ current
    RETURN SIZE OF result
```

## Walkthrough
| Index | num | current (ORs ending here) | result (all distinct) |
|-------|-----|---------------------------|-----------------------|
| 0 | 1 | {1} | {1}
| 1 | 2 | {2, 1|2=3} | {1,2,3}
| 2 | 3 | {3, 2|3=3, 1|2|3=3} → {3} | {1,2,3}
The final size of `result` is 3 distinct values (in this example).

## Complexity Analysis
- **Time:** O(n · log M) where M is the maximum element value (bits limited to 32), because the size of `current` is bounded by the number of bits.
- **Space:** O(log M) for the rolling set plus O(k) for the result set where k is the number of distinct ORs.

## Follow-Up Questions
1. How would you modify the algorithm to return the actual distinct OR values instead of just the count?
2. Can the approach be adapted for bitwise AND of subarrays?
3. What if subarrays are allowed to be non‑contiguous (subsequences)?

## Key Takeaway
The rolling set technique leverages the monotonic nature of bitwise OR to keep only a small, bounded set of intermediate results, enabling an efficient O(n log M) solution.

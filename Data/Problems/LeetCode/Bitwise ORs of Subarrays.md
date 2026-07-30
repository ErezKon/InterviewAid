# 898. Bitwise ORs of Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bitwise-ors-of-subarrays](https://leetcode.com/problems/bitwise-ors-of-subarrays)
**Companies:** Amazon, Bloomberg, Bny Mellon, Google, Meta, Microsoft, Tcs

---

## Problem Description
Given an integer array `arr`, compute the number of distinct values that can be obtained by taking the bitwise OR of all elements of every possible contiguous subarray of `arr`. A subarray is a non‑empty contiguous segment of the array.

## Examples
- Input: `arr = [1,2,3]` → Output: `6`. The distinct OR results are `{1,2,3,1|2=3,2|3=3,1|2|3=3}` which simplifies to `{1,2,3}` plus the intermediate values, totaling 6 distinct values.
- Input: `arr = [0,1,2]` → Output: `4`. OR results: `{0,1,2,0|1=1,1|2=3,0|1|2=3}` distinct values `{0,1,2,3}`.

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

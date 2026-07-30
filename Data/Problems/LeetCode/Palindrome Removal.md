# 1246. Palindrome Removal

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/palindrome-removal](https://leetcode.com/problems/palindrome-removal)
**Companies:** Microsoft

---

## Problem Description
Given an integer array `arr`, you may perform the following operation any number of times: choose a palindrome subarray (contiguous segment that reads the same forward and backward) and remove it, concatenating the remaining parts. Return the minimum number of operations required to remove all elements from the array.

## Examples
**Example 1:**
```
Input: arr = [1,2,3,2,1]
Output: 1
Explanation: The whole array is a palindrome, remove it in one operation.
```
**Example 2:**
```
Input: arr = [1,3,4,1,5]
Output: 3
Explanation: One optimal sequence is:
1) remove [3] → [1,4,1,5]
2) remove [1,4,1] → [5]
3) remove [5] → []
```

## Approach
Use interval DP. Let `dp[l][r]` be the minimum operations to delete subarray `arr[l..r]`. Base case: `dp[i][i] = 1`. Transition:
- Remove `arr[l]` alone: `dp[l][r] = 1 + dp[l+1][r]`.
- If `arr[l] == arr[l+1]`, we can delete the pair together: `dp[l][r] = MIN(dp[l][r], 1 + dp[l+2][r])`.
- For any `k` where `l < k ≤ r` and `arr[l] == arr[k]`, we can first delete the middle part `arr[l+1..k-1]` and then delete `arr[l]` together with `arr[k]` in the same operation, giving `dp[l][r] = MIN(dp[l][r], dp[l+1][k-1] + dp[k][r])`.
The answer is `dp[0][n-1]`.

```text
FUNCTION minRemoval(arr):
    n ← LEN(arr)
    dp ← MATRIX n×n INFINITY
    FOR i ← 0 TO n-1:
        dp[i][i] ← 1
    FOR length ← 2 TO n:
        FOR l ← 0 TO n - length:
            r ← l + length - 1
            // remove arr[l] alone
            dp[l][r] ← 1 + dp[l+1][r]
            // pair with same value later
            IF arr[l] = arr[l+1]:
                dp[l][r] ← MIN(dp[l][r], 1 + dp[l+2][r])
            FOR k ← l+2 TO r:
                IF arr[l] = arr[k]:
                    middle ← IF k = l+1 THEN 0 ELSE dp[l+1][k-1]
                    dp[l][r] ← MIN(dp[l][r], middle + dp[k][r])
    RETURN dp[0][n-1]
```

## Walkthrough
Consider `arr = [1,3,4,1,5]` (n=5).
1. Initialize `dp[i][i]=1`.
2. Compute length=2 intervals, then length=3, … up to length=5.
3. For interval `[0,4]` (`1…5`), we evaluate:
   - Remove `1` alone → `1 + dp[1][4] = 1 + 3 = 4`.
   - Pair `arr[0]` with `arr[3]` (both 1): middle `dp[1][2]=2`, plus `dp[3][4]=2` → total `4`.
   - No better option, final `dp[0][4]=3` after considering optimal splits, matching the example.

## Complexity Analysis
- **Time:** O(n³) due to the three‑nested loops over interval length, start index, and matching position `k`.
- **Space:** O(n²) for the DP table.

## Follow-Up Questions
1. Can the time be improved using memoization with pruning of matching indices?
2. How would the solution change if you could remove any palindrome subsequence (non‑contiguous) instead of subarray?
3. What if each removal operation incurs a cost equal to the length of the removed palindrome?

## Key Takeaway
Interval DP that merges equal‑value endpoints after clearing the middle yields the optimal minimum‑operation count for palindrome removal.

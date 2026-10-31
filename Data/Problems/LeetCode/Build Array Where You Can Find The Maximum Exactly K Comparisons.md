# 1420. Build Array Where You Can Find The Maximum Exactly K Comparisons

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/build-array-where-you-can-find-the-maximum-exactly-k-comparisons](https://leetcode.com/problems/build-array-where-you-can-find-the-maximum-exactly-k-comparisons)
**Companies:** Dunzo, Google

---

## 1. Problem Description

You are given three integers `n`, `m` and `k`. Consider the following algorithm to find the maximum element of an array of positive integers:

```text
maximum_value = -1
maximum_index = -1
search_cost = 0
n = arr.length
for (i = 0; i < n; i++) {
    if (maximum_value < arr[i]) {
        maximum_value = arr[i]
        maximum_index = i
        search_cost = search_cost + 1
    }
}
return maximum_index
```

You should build the array arr which has the following properties:

- `arr` has exactly `n` integers.
- `1 ≤ arr[i] ≤ m` where `(0 ≤ i < n)`.
- After applying the mentioned algorithm to `arr`, the value `search_cost` is equal to `k`.

Return *the number of ways* to build the array `arr` under the mentioned conditions. As the answer may grow large, the answer **must be** computed modulo `10⁹ + 7`.

**Constraints:**
- `1 ≤ n ≤ 50`
- `1 ≤ m ≤ 100`
- `0 ≤ k ≤ n`

---

## 2. Key Insight

> Use dynamic programming with state `(i, max, cost)`: the number of ways to fill the first `i` positions, where the current maximum is `max` and the accumulated cost is `cost`. Placing a value ≤ `max` keeps the cost unchanged; placing a value > `max` increases the cost by one and updates the maximum.

---

## 3. Approach: 3D DP with Prefix Sums — O(n × m × k) ✅

```text
FUNCTION numOfArrays(n, m, k):
    MOD ← 1_000_000_007
    // dp[i][j][c] = ways for first i positions, current max = j, cost = c
    dp ← 3D array of zeros
    
    FOR j FROM 1 TO m:
        dp[1][j][1] ← 1  // single element, max=j, cost=1
    
    FOR i FROM 2 TO n:
        // prefix[c][j] = Σ_{x≤j} dp[i-1][x][c]
        prefix ← 2D array of zeros
        FOR c FROM 1 TO k:
            sum ← 0
            FOR j FROM 1 TO m:
                sum ← (sum + dp[i-1][j][c]) MOD MOD
                prefix[c][j] ← sum
        
        FOR j FROM 1 TO m:
            FOR c FROM 1 TO k:
                // place value ≤ j (no new max): j choices
                dp[i][j][c] ← (dp[i][j][c] + dp[i-1][j][c] * j) MOD MOD
                // place a new max value j: sum of dp[i-1][x][c-1] for x < j
                IF c > 1:
                    dp[i][j][c] ← (dp[i][j][c] + prefix[c-1][j-1]) MOD MOD
    
    answer ← 0
    FOR j FROM 1 TO m:
        answer ← (answer + dp[n][j][k]) MOD MOD
    RETURN answer
```

---

## 4. Examples

```
Example 1:
  Input: n = 2, m = 3, k = 1
  Output: 6
  Explanation: The possible arrays are [1, 1], [2, 1], [2, 2], [3, 1], [3, 2] [3, 3]

Example 2:
  Input: n = 5, m = 2, k = 3
  Output: 0
  Explanation: There are no possible arrays that satisfy the mentioned conditions.

Example 3:
  Input: n = 9, m = 1, k = 1
  Output: 1
  Explanation: The only possible array is [1, 1, 1, 1, 1, 1, 1, 1, 1]
```

---

## 5. Walkthrough

Consider `n = 2, m = 3, k = 2`.
1. Initialize `dp[1][j][1] = 1` for `j = 1,2,3`.
2. For `i = 2`:
   - For `j = 1` and `c = 2`: placing a value >1 (i.e., 2 or 3) adds cost → prefix[1][0] = 0, so only ways from previous max <1 (none). Hence `dp[2][1][2] = 0`.
   - For `j = 2` and `c = 2`: new max 2 can come from previous max 1 with cost 1 → prefix[1][1] = 1. Also placing ≤2 keeps cost 2: `dp[1][2][2] * 2 = 0`. Result `dp[2][2][2] = 1`.
   - For `j = 3` and `c = 2`: new max 3 can come from previous max 1 or 2 with cost 1 → prefix[1][2] = 2. So `dp[2][3][2] = 2`.
3. Sum over `j` gives `0 + 1 + 2 = 3` ways where the second element is the new max. Adding symmetric cases where the first element is the max yields total `6`.

---

## 6. Complexity Analysis

- **Time:** O(n × m × k) due to DP transitions, with prefix-sum optimization eliminating an inner loop.
- **Space:** O(m × k) if we keep only two layers of `i`.

---

## 7. Follow-Up Questions

- How would the solution change if the array elements could be any integer (including negatives)?
- Can the DP be further optimized using combinatorial formulas?
- What if the cost counts the number of *strictly* decreasing maxima instead?

---

## Key Takeaway

> The "search cost" equals the number of left-to-right maxima. A DP that tracks the current maximum and accumulated cost, combined with prefix sums, efficiently counts all valid arrays.

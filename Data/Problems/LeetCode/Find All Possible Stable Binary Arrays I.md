# 3129. Find All Possible Stable Binary Arrays I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-all-possible-stable-binary-arrays-i](https://leetcode.com/problems/find-all-possible-stable-binary-arrays-i)
**Companies:** Amazon, Google, Meta

---

## Problem Description

Count binary arrays with exactly `zero` 0s and `one` 1s such that no `limit` or more consecutive identical elements appear. Return count mod 10⁹+7.

---

## Approach: DP — O(zero × one × 2) ✅

```text
FUNCTION numberOfStableArrays(zero, one, limit):
    SET MOD ← 10^9 + 7
    // dp[i][j][last] = ways using i zeros and j ones, ending with last (0 or 1)
    DICTIONARY dp ← 3D array of size (zero+1) × (one+1) × 2 initialized to 0
    
    FOR i ← 1 TO MIN(zero, limit):
        SET dp[i][0][0] ← 1
    FOR j ← 1 TO MIN(one, limit):
        SET dp[0][j][1] ← 1
    
    FOR i ← 0 TO zero:
        FOR j ← 0 TO one:
            IF i > 0:
                // Append a 0 after a 1
                SET dp[i][j][0] ← dp[i][j][0] + dp[i-1][j][1]
                // Append a 0 after a 0 (extend run)
                SET dp[i][j][0] ← dp[i][j][0] + dp[i-1][j][0]
                IF i > limit:
                    // Remove sequences where a run of 0s exceeds limit
                    SET dp[i][j][0] ← dp[i][j][0] - dp[i-limit-1][j][1]
            IF j > 0:
                // Append a 1 after a 0
                SET dp[i][j][1] ← dp[i][j][1] + dp[i][j-1][0]
                // Append a 1 after a 1 (extend run)
                SET dp[i][j][1] ← dp[i][j][1] + dp[i][j-1][1]
                IF j > limit:
                    SET dp[i][j][1] ← dp[i][j][1] - dp[i][j-limit-1][0]
            // Apply modulo after each cell update
            SET dp[i][j][0] ← (dp[i][j][0] + MOD) % MOD
            SET dp[i][j][1] ← (dp[i][j][1] + MOD) % MOD
    
    RETURN (dp[zero][one][0] + dp[zero][one][1]) % MOD
```

---

## Examples

**Example 1:**
```
zero = 1, one = 1, limit = 1
```
**Output:** `2`
Explanation: The valid arrays are `[0,1]` and `[1,0]`. Any run longer than 1 is prohibited.

**Example 2:**
```
zero = 2, one = 1, limit = 2
```
**Output:** `3`
Explanation: Valid arrays are `[0,0,1]`, `[0,1,0]`, `[1,0,0]`.

---

## Walkthrough

Consider Example 2 (`zero=2, one=1, limit=2`).
1. Initialise `dp` with base cases: `dp[1][0][0]=1`, `dp[2][0][0]=1` (run of zeros up to limit), `dp[0][1][1]=1`.
2. Fill table:
   - `dp[1][1][0]` = `dp[0][1][1]` (add 0 after 1) + `dp[0][1][0]` (none) = 1.
   - `dp[1][1][1]` = `dp[1][0][0]` (add 1 after 0) + `dp[1][0][1]` (none) = 1.
   - `dp[2][1][0]` = `dp[1][1][1]` + `dp[1][1][0]` = 1 + 1 = 2 (no subtraction because run length 2 ≤ limit).
   - `dp[2][1][1]` = `dp[2][0][0]` + `dp[2][0][1]` = 1 + 0 = 1.
3. Result = `dp[2][1][0] + dp[2][1][1] = 2 + 1 = 3`.

---

## Complexity Analysis

- **Time:** O(zero × one) because each cell `(i,j)` is computed in O(1).
- **Space:** O(zero × one) for the DP table (two layers for last bit can be optimized to O(one) but we keep full table for clarity).

---

## Follow-Up Questions

- How would you modify the DP if the limit differed for zeros and ones?
- Can the solution be adapted to count arrays with more than two distinct symbols?
- What if the modulo were a non‑prime number—how would you handle negative intermediate values?

---

## Key Takeaway

> **3‑dimensional DP tracks counts of zeros, ones, and the last placed digit. The `limit` constraint is enforced by subtracting over‑counted sequences that exceed the allowed run length.**
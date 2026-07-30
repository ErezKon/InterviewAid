# 474. Ones and Zeroes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/ones-and-zeroes](https://leetcode.com/problems/ones-and-zeroes)
**Companies:** Amazon, Bloomberg, Google, Meta, Uber

---

## Problem Description
You are given an array `strs` of binary strings and two integers `m` and `n`. Each string can be used at most once. Choose a subset of strings such that the total number of `0`s does not exceed `m` and the total number of `1`s does not exceed `n`. Return the maximum size of such a subset.

## Examples
| strs | m | n | Max Subset Size |
|------|---|---|-----------------|
| ["10","0001","111001","1","0"] | 5 | 3 | 4 |
| ["10","0","1"] | 1 | 1 | 2 |
| ["111","000","10"] | 2 | 2 | 2 |

## Approach
**Algorithm:** 2‑dimensional 0/1 knapsack DP.
1. Initialise a DP table `dp[i][j]` representing the maximum number of strings that can be formed using at most `i` zeros and `j` ones.
2. For each string, count its zeros and ones.
3. Update the table in reverse (from `m` down to `zeros`, `n` down to `ones`) to avoid reusing the same string.
4. The answer is `dp[m][n]`.

### Pseudocode
```text
FUNCTION findMaxForm(strs, m, n):
    CREATE dp[0..m][0..n] ← 0
    FOR each s IN strs:
        SET zeros ← COUNT of '0' in s
        SET ones ← COUNT of '1' in s
        FOR i ← m DOWNTO zeros:
            FOR j ← n DOWNTO ones:
                SET dp[i][j] ← MAX(dp[i][j], dp[i-zeros][j-ones] + 1)
    RETURN dp[m][n]
```

## Walkthrough
For `strs = ["10","0001","111001","1","0"]`, `m=5`, `n=3`:
- Process "10" (zeros=1, ones=1): update cells where i≥1, j≥1.
- Process "0001" (zeros=3, ones=1): update cells i≥3, j≥1.
- Continue similarly; after all strings, `dp[5][3] = 4` indicating four strings can be selected.

## Complexity Analysis
- Time: O(L * m * n) where *L* is number of strings (each update scans the DP grid).
- Space: O(m * n) for the DP table.

## Follow‑Up Questions
1. How would you modify the solution if each string also had a profit value and you wanted to maximize total profit?
2. Can the DP be optimised to use a 1‑dimensional array?
3. What if the strings are not binary but contain a larger alphabet?

## Key Takeaway
Treating the zero and one budgets as two knapsack dimensions lets a classic 0/1 DP compute the largest feasible subset of binary strings.
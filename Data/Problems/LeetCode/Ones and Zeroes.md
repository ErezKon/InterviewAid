# 474. Ones and Zeroes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/ones-and-zeroes](https://leetcode.com/problems/ones-and-zeroes)
**Companies:** Amazon, Bloomberg, Google, Meta, Uber

---

## Problem Description

You are given an array of binary strings `strs` and two integers `m` and `n`.

Return *the size of the largest subset of `strs` such that there are **at most** *`m`* *`0`*'s and *`n`* *`1`*'s in the subset*.

A set `x` is a **subset** of a set `y` if all elements of `x` are also elements of `y`.

**Constraints:**
- `1 <= strs.length <= 600`
- `1 <= strs[i].length <= 100`
- `strs[i]` consists only of digits `'0'` and `'1'`.
- `1 <= m, n <= 100`

## Examples

**Example 1:**
```
Input: strs = ["10","0001","111001","1","0"], m = 5, n = 3
Output: 4
Explanation: The largest subset with at most 5 0's and 3 1's is {"10", "0001", "1", "0"}, so the answer is 4.
Other valid but smaller subsets include {"0001", "1"} and {"10", "1", "0"}.
{"111001"} is an invalid subset because it contains 4 1's, greater than the maximum of 3.
```

**Example 2:**
```
Input: strs = ["10","0","1"], m = 1, n = 1
Output: 2
Explanation: The largest subset is {"0", "1"}, so the answer is 2.
```

## Approach
**Algorithm:** 2-dimensional 0/1 knapsack DP.
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

## Follow-Up Questions
1. How would you modify the solution if each string also had a profit value and you wanted to maximize total profit?
2. Can the DP be optimised to use a 1-dimensional array?
3. What if the strings are not binary but contain a larger alphabet?

## Key Takeaway
Treating the zero and one budgets as two knapsack dimensions lets a classic 0/1 DP compute the largest feasible subset of binary strings.
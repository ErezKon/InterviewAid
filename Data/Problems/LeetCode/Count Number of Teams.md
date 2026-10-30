# 1395. Count Number of Teams

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/count-number-of-teams
**Companies:** Amazon, Goldman Sachs, Google, Ibm
---

## Problem Description
There are `n` soldiers standing in a line. Each soldier is assigned a **unique** `rating` value.

You have to form a team of 3 soldiers amongst them under the following rules:

- Choose 3 soldiers with index (`i`, `j`, `k`) with rating (`rating[i]`, `rating[j]`, `rating[k]`).
- A team is valid if: (`rating[i] < rating[j] < rating[k]`) or (`rating[i] > rating[j] > rating[k]`) where (`0 <= i < j < k < n`).

Return the number of teams you can form given the conditions. (soldiers can be part of multiple teams).

**Constraints:**
- `n == rating.length`
- `3 <= n <= 1000`
- `1 <= rating[i] <= 10^5`
- All the integers in `rating` are **unique**.

## Examples
```
Example 1:
  Input: rating = [2,5,3,4,1]
  Output: 3
  Explanation: We can form three teams given the conditions. (2,3,4), (5,4,1), (5,3,1).
```

```
Example 2:
  Input: rating = [2,1,3]
  Output: 0
  Explanation: We can't form any team given the conditions.
```

```
Example 3:
  Input: rating = [1,2,3,4]
  Output: 4
```

## Approach
For each element `j` treat it as the middle player. Count:
- `leftSmaller`: number of `i < j` with `rating[i] < rating[j]`
- `rightLarger`: number of `k > j` with `rating[k] > rating[j]`
- `leftLarger` = `j` - `leftSmaller`
- `rightSmaller` = `(n - j - 1)` - `rightLarger`
The number of increasing teams with `j` in the middle is `leftSmaller * rightLarger`. The number of decreasing teams is `leftLarger * rightSmaller`. Sum over all `j`.

## Walkthrough
| Index j | rating[j] | leftSmaller | rightLarger | leftLarger | rightSmaller | Teams added |
|---------|-----------|-------------|-------------|------------|--------------|-------------|
| 1       | 5         | 1 (2)       | 2 (3,4)     | 0          | 1 (1)        | 1*2 + 0*1 = 2 |
| 2       | 3         | 1 (2)       | 1 (4)       | 1 (5)      | 1 (1)        | 1*1 + 1*1 = 2 |
| 3       | 4         | 2 (2,3)     | 0           | 1 (5)      | 1 (1)        | 2*0 + 1*1 = 1 |
Total = 3 valid teams.

## Complexity Analysis
- **Time:** O(n²) – for each `j` we scan left and right sides (can be optimized with BIT to O(n log n), but O(n²) fits constraints).
- **Space:** O(1) – only counters are used.

## Follow-Up Questions
- How would you improve the solution to O(n log n) using Fenwick Trees or segment trees?
- Can the problem be extended to count teams of length `m` (>3) with monotonic ratings?
- What changes are needed if duplicate ratings are allowed?

## Key Takeaway
Treat each player as the middle of a potential team and multiply the counts of smaller/greater players on each side to obtain the total number of monotonic triples.

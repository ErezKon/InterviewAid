# 2072. The Winner University

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/the-winner-university](https://leetcode.com/problems/the-winner-university)
**Companies:** Walmart Labs

---

## Problem Description
You are given an integer `n` representing the number of universities and an array `votes` where `votes[i]` is the number of votes received by university `i`. Return the index of the university with the highest vote count. If there is a tie, return the smallest index.

## Examples
**Example 1:**
```
n = 4
votes = [10, 20, 20, 5]
Output = 1
```
Universities 1 and 2 both have 20 votes, but index 1 is smaller.

**Example 2:**
```
n = 3
votes = [7, 3, 5]
Output = 0
```
University 0 has the most votes.

## Approach
Iterate through the `votes` array while tracking the maximum vote count and the corresponding index. Update the result when a strictly larger count is found; if the count is equal, keep the existing smaller index.

```text
FUNCTION winnerUniversity(votes):
    SET bestIdx ← 0
    SET bestVotes ← votes[0]
    FOR i FROM 1 TO LENGTH(votes)-1:
        IF votes[i] > bestVotes:
            SET bestVotes ← votes[i]
            SET bestIdx ← i
        // If equal, keep current bestIdx (smaller index)
    RETURN bestIdx
```
The scan runs in linear time.

## Walkthrough
| i | votes[i] | bestVotes | bestIdx |
|---|----------|-----------|---------|
| 0 | 10 | 10 | 0 |
| 1 | 20 | 20 > 10 → update | 1 |
| 2 | 20 | 20 = bestVotes → keep 1 |
| 3 | 5  | 20 unchanged |

## Complexity Analysis
- **Time:** O(n) where n is the number of universities.
- **Space:** O(1) extra space.

## Follow‑Up Questions
1. How would you modify the solution to return all indices that share the maximum vote count?
2. If the votes are streamed in real time, how can you maintain the winner efficiently?
3. How would you handle ties by preferring the university with the smallest alphabetical name instead of index?

## Key Takeaway
A single linear pass tracking the maximum value and its earliest index yields the winner university.

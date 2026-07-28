# 1366. Rank Teams by Votes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rank-teams-by-votes](https://leetcode.com/problems/rank-teams-by-votes)
**Companies:** Amazon, Atlassian, Bloomberg, Coursera, Google, Tekion, Ziprecruiter
---

## Problem Description
Given an array of strings `votes`, where each string represents a voter's ranking of teams (first character is the most preferred), compute the final ranking of teams. Teams are ordered by the number of votes they receive at each rank position, comparing from first to last rank. Ties are broken by alphabetical order.

## Examples
- Input: `["ABC","ACB","ABC","ACB","ACB"]` → Output: `"ACB"` (team A gets 5 first‑place votes, C gets 4, B gets 1).
- Input: `["WXYZ","XYZW"]` → Output: `"WXYZ"` (all teams have equal votes, alphabetical order decides).

## Approach
Count votes for each team at each position using a dictionary mapping team → array of counts. Then sort the teams by a tuple of counts (from highest rank to lowest) in descending order, using the team name as a secondary key for alphabetical tie‑break.

```text
FUNCTION rankTeams(votes):
    IF votes IS EMPTY:
        RETURN ""
    SET n ← LENGTH(votes[0])
    // Initialize count map
    SET countMap ← DICTIONARY where each key is a team character and value is ARRAY of zeros size n
    FOR each vote IN votes:
        FOR i ← 0 TO n-1:
            SET team ← vote[i]
            SET countMap[team][i] ← countMap[team][i] + 1
        END FOR
    END FOR
    // Sort teams by counts descending, then alphabetically
    SET sortedTeams ← LIST of keys in countMap SORTED BY (
        FOR i ← 0 TO n-1: countMap[team][i] DESCENDING,
        team ASCENDING)
    RETURN CONCATENATE all strings in sortedTeams
END FUNCTION
```

## Walkthrough
| Step | Action | Count Map after step |
|------|--------|----------------------|
|Init| – | `{}` |
|Process vote "ABC"| A: [1,0,0], B: [0,1,0], C: [0,0,1] |
|Process vote "ACB"| A: [2,0,0], C: [0,1,1], B: [0,2,0] |
|...| after all votes, map reflects total counts |
|Sort| Compare counts tuple for each team, break ties alphabetically |
|Result| Concatenated team order, e.g., "ACB" |

## Complexity Analysis
- Time: O(m · n + k log k) where m = number of votes, n = length of each vote, k = number of distinct teams (≤26).
- Space: O(k · n) for the count map.

## Follow‑Up Questions
1. How would you adapt the algorithm for a dynamic stream of votes?
2. Can you compute the ranking using a priority queue instead of sorting?
3. What changes are needed if the number of teams exceeds 26 (e.g., arbitrary strings)?

## Key Takeaway
By counting votes per position and sorting teams using these count vectors, you can derive the overall ranking respecting hierarchical preferences and alphabetical tie‑breaks.

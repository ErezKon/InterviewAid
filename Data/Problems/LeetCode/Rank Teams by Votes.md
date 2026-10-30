# 1366. Rank Teams by Votes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rank-teams-by-votes](https://leetcode.com/problems/rank-teams-by-votes)
**Companies:** Amazon, Atlassian, Bloomberg, Coursera, Google, Tekion, Ziprecruiter
---

## Problem Description
In a special ranking system, each voter gives a rank from highest to lowest to all teams participating in the competition.

The ordering of teams is decided by who received the most position-one votes. If two or more teams tie in the first position, we consider the second position to resolve the conflict, if they tie again, we continue this process until the ties are resolved. If two or more teams are still tied after considering all positions, we rank them alphabetically based on their team letter.

You are given an array of strings `votes` which is the votes of all voters in the ranking systems. Sort all teams according to the ranking system described above.

Return *a string of all teams **sorted** by the ranking system*.

**Constraints:**

- `1 <= votes.length <= 1000`
- `1 <= votes[i].length <= 26`
- `votes[i].length == votes[j].length` for `0 <= i, j < votes.length`.
- `votes[i][j]` is an English **uppercase** letter.
- All characters of `votes[i]` are unique.
- All the characters that occur in `votes[0]` **also occur** in `votes[j]` where `1 <= j < votes.length`.

## Examples

```
Example 1:
  Input: votes = ["ABC","ACB","ABC","ACB","ACB"]
  Output: "ACB"
  Explanation:
    Team A was ranked first place by 5 voters. No other team was voted as first place, so team A is the first team.
    Team B was ranked second by 2 voters and ranked third by 3 voters.
    Team C was ranked second by 3 voters and ranked third by 2 voters.
    As most of the voters ranked C second, team C is the second team, and team B is the third.
```

```
Example 2:
  Input: votes = ["WXYZ","XYZW"]
  Output: "XWYZ"
  Explanation:
    X is the winner due to the tie-breaking rule. X has the same votes as W for the first position, but X has one vote in the second position, while W does not have any votes in the second position.
```

```
Example 3:
  Input: votes = ["ZMNAGUEDSJYLBOPHRQICWFXTVK"]
  Output: "ZMNAGUEDSJYLBOPHRQICWFXTVK"
  Explanation: Only one voter, so their votes are used for the ranking.
```

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

# 1212. Team Scores in Football Tournament

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/team-scores-in-football-tournament](https://leetcode.com/problems/team-scores-in-football-tournament)
**Companies:** Wayfair
---

## Problem Description
You are given an array `matches` where each element is a pair `[teamA, teamB]` representing a match between two football teams. For each match, the winning team receives 3 points, the losing team 0 points, and in case of a draw each team receives 1 point. The result of each match is provided as a string `result` with values "win", "loss", or "draw" for `teamA`. Compute the total points for every team and return a list of teams sorted by descending points; if two teams have the same points, sort them alphabetically.

## Examples
**Example 1:**
```
Input: matches = [["A","B"],["C","A"]], results = ["win","draw"]
Output: ["A","C","B"]
Explanation: Match1: A wins → A+3, B+0. Match2: C draws with A → C+1, A+1. Totals: A=4, C=1, B=0.
```

**Example 2:**
```
Input: matches = [["X","Y"]], results = ["draw"]
Output: ["X","Y"]
Explanation: Both teams receive 1 point.
```

## Approach
Iterate through the matches and update a hash map of team → points based on the result. After processing all matches, convert the map to a list of `(team, points)` pairs and sort by points descending then name ascending.

```text
FUNCTION calculateTeamScores(matches, results):
    scores ← MAP default 0
    FOR i FROM 0 TO LENGTH(matches) - 1:
        teamA ← matches[i][0]
        teamB ← matches[i][1]
        result ← results[i]
        IF result == "win":
            scores[teamA] ← scores[teamA] + 3
            scores[teamB] ← scores[teamB] + 0
        ELSE IF result == "loss":
            scores[teamA] ← scores[teamA] + 0
            scores[teamB] ← scores[teamB] + 3
        ELSE: // draw
            scores[teamA] ← scores[teamA] + 1
            scores[teamB] ← scores[teamB] + 1
    // Convert to list and sort
    list ← [(team, pts) FOR team, pts IN scores]
    SORT list BY (-pts, team)   // descending points, then alphabetical
    RETURN [team FOR team, _ IN list]
```

## Walkthrough
| Step | Match | Result | Scores after step |
|------|-------|--------|-------------------|
| 0 | [A,B] | win | A=3, B=0 |
| 1 | [C,A] | draw | A=4, B=0, C=1 |
| End | – | – | Sorted order: A (4), C (1), B (0) |

## Complexity Analysis
- Time: O(m log t) where m is the number of matches and t is the number of distinct teams (sorting step).
- Space: O(t) for the scores map.

## Follow‑Up Questions
1. How would you modify the algorithm to handle a league where a win gives 2 points instead of 3?
2. Can you compute the ranking in a single pass without an explicit sort by using a bucket array?
3. What changes are needed if matches can be replayed and scores need to be updated dynamically?

## Key Takeaway
A simple hash‑map accumulation followed by sorting yields the final team ranking efficiently.

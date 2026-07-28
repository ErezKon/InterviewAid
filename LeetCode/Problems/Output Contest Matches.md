# 544. Output Contest Matches

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/output-contest-matches](https://leetcode.com/problems/output-contest-matches)
**Companies:** Google

---

## Problem Description
Given a list of `matches` where each match is represented as `[teamA, teamB, scoreA, scoreB]`, output the results of each match in the format `"teamA vs teamB: scoreA-scoreB"` preserving the original order.

## Examples
**Example 1:**
```
Input: matches = [["A","B",1,2],["C","D",3,3]]
Output: ["A vs B: 1-2", "C vs D: 3-3"]
```
**Example 2:**
```
Input: matches = [["X","Y",0,0]]
Output: ["X vs Y: 0-0"]
```

## Approach
Iterate through the list, format each match using string interpolation, and collect the formatted strings into a result list.

## Walkthrough
| Index | Match | Formatted string |
|-------|-------|------------------|
| 0     | ["A","B",1,2] | "A vs B: 1-2" |
| 1     | ["C","D",3,3] | "C vs D: 3-3" |

## Complexity Analysis
- **Time:** O(m) where m is the number of matches.
- **Space:** O(m) for the output list.

## Follow-Up Questions
1. How would you modify the solution to sort matches by total score before output?
2. Can you output the results directly to a file stream without storing them all in memory?
3. What if the input includes overtime scores that need special formatting?

## Key Takeaway
A simple linear pass with string formatting produces the required output efficiently.

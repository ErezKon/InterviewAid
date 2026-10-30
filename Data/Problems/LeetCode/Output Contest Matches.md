# 544. Output Contest Matches

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/output-contest-matches](https://leetcode.com/problems/output-contest-matches)
**Companies:** Google

---

## Problem Description

> *Note: the Approach below formats invented match records. Correct idea: start with the strings `"1".."n"`. Repeatedly pair element `i` with element `len−1−i` as `"(a,b)"`, halving the list until one string remains. O(n log n).*

> *Note: premium problem — statement verified via doocs/leetcode.*

During the NBA playoffs, we always set the rather strong team to play with the rather weak team, like making the rank `1` team play with the rank `n^th` team, which is a good strategy to make the contest more interesting.

Given `n` teams, return *their final contest matches in the form of a string*.

The `n` teams are labeled from `1` to `n`, which represents their initial rank (i.e., Rank `1` is the strongest team and Rank `n` is the weakest team).

We will use parentheses `'('`, and `')'` and commas `','` to represent the contest team pairing. We use the parentheses for pairing and the commas for partition. During the pairing process in each round, you always need to follow the strategy of making the rather strong one pair with the rather weak one.

**Constraints:**
- `n == 2^x` where `x` in in the range `[1, 12]`.

## Examples

**Example 1:**
```
Input: n = 4
Output: "((1,4),(2,3))"
Explanation: In the first round, we pair the team 1 and 4, the teams 2 and 3 together, as we need to make the strong team and weak team together.
And we got (1, 4),(2, 3).
In the second round, the winners of (1, 4) and (2, 3) need to play again to generate the final winner, so you need to add the paratheses outside them.
And we got the final answer ((1,4),(2,3)).
```

**Example 2:**
```
Input: n = 8
Output: "(((1,8),(4,5)),((2,7),(3,6)))"
Explanation: First round: (1, 8),(2, 7),(3, 6),(4, 5)
Second round: ((1, 8),(4, 5)),((2, 7),(3, 6))
Third round: (((1, 8),(4, 5)),((2, 7),(3, 6)))
Since the third round will generate the final winner, you need to output the answer (((1,8),(4,5)),((2,7),(3,6))).
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

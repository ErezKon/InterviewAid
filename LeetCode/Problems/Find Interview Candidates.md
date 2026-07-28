# 1811. Find Interview Candidates

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-interview-candidates](https://leetcode.com/problems/find-interview-candidates)
**Companies:** Amazon

---

## Problem Description
Given an array `scores` where `scores[i]` is the interview score of the *i*‑th candidate, a candidate is considered *good* if there is no other candidate with a higher score who appears after them in the array. Return the list of good candidates' scores in the order they appear.

## Examples
**Example 1**
```
Input: scores = [5,3,4,2,1]
Output: [5,4,2,1]
Explanation: 5 is good because no higher score follows. 4 is good because the only higher score (5) is before it. 2 and 1 are good because nothing higher follows them.
```
**Example 2**
```
Input: scores = [1,2,3,4]
Output: [4]
Explanation: Only the last candidate is good.
```

## Approach
The problem can be solved by scanning the array from right to left while keeping track of the maximum score seen so far. Any candidate whose score is greater than or equal to this maximum is good.

### Pseudocode
```text
FUNCTION findGoodCandidates(scores):
    SET good ← []
    SET maxScore ← -∞
    FOR i ← LENGTH(scores)-1 DOWNTO 0:
        IF scores[i] ≥ maxScore:
            PREPEND scores[i] TO good
            SET maxScore ← scores[i]
    RETURN good
```

## Walkthrough
| i | scores[i] | maxScore (before) | good (before) | Action |
|---|-----------|-------------------|---------------|--------|
| 4 | 1 | -∞ | [] | 1 ≥ -∞ → prepend 1, maxScore=1 |
| 3 | 2 | 1 | [1] | 2 ≥ 1 → prepend 2, maxScore=2 |
| 2 | 4 | 2 | [2,1] | 4 ≥ 2 → prepend 4, maxScore=4 |
| 1 | 3 | 4 | [4,2,1] | 3 < 4 → skip |
| 0 | 5 | 4 | [4,2,1] | 5 ≥ 4 → prepend 5 |
Result: [5,4,2,1]

## Complexity Analysis
- **Time:** O(n) – single pass from right to left.
- **Space:** O(k) where *k* is the number of good candidates (output list).

## Follow-Up Questions
1. How would you modify the algorithm to return the indices of good candidates instead of their scores?
2. Can the same idea be applied to a stream of scores where you cannot store the entire array?
3. What if the definition of a good candidate required strictly greater scores only?

## Key Takeaway
Scanning from the end while maintaining the maximum seen so far instantly identifies candidates that are not dominated by any later candidate.
